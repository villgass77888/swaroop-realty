import React, { useEffect, useRef, useState } from 'react';

// Disable on touch / pointer:coarse devices
const isTouch = typeof window !== 'undefined'
    && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// ── Colour helpers ─────────────────────────────────────────────────────────
function parseBg(str) {
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
}
function getEffectiveBgColor(x, y) {
    const els = document.elementsFromPoint(x, y) || [];
    for (const el of els) {
        const p = parseBg(window.getComputedStyle(el).backgroundColor);
        if (p && p.a >= 0.5) return p;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
}
function luminance({ r, g, b }) {
    const lin = v => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

// Returns how far a point (px,py) is from a rect (0 = inside, >0 = outside distance in px)
function distFromRect(px, py, rect) {
    const dx = Math.max(rect.left - px, 0, px - rect.right);
    const dy = Math.max(rect.top - py, 0, py - rect.bottom);
    return Math.sqrt(dx * dx + dy * dy);
}

// ── Constants ──────────────────────────────────────────────────────────────
const LENS = 175;
const MAGNIFY = 1.65;
const RING_SZ = 44;
const COLLAPSED_SCL = RING_SZ / LENS;
const LERP_T = 0.22;
const LINGER_PX = 80;

const CustomCursor = () => {
    if (isTouch) return null; // No custom cursor on touch devices
    const mouseRef = useRef({ x: -300, y: -300 });
    const ringPosRef = useRef({ x: -300, y: -300 });
    const rafRef = useRef(null);
    const magnifyElRef = useRef(null);
    const isMagnifyRef = useRef(false);

    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const lensRef = useRef(null);
    const lensTextRef = useRef(null);

    const [isDark, setIsDark] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [isMagnify, setIsMagnify] = useState(false);
    const [magnifyText, setMagnifyText] = useState('');
    const [elemWidth, setElemWidth] = useState(400);

    useEffect(() => {
        let frame = 0;
        let isScrolling = false;
        let scrollTimeout = null;
        const lerp = (a, b, t) => a + (b - a) * t;

        const onMove = e => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
        const onDown = () => setIsClick(true);
        const onUp = () => setIsClick(false);
        const onScroll = () => {
            isScrolling = true;
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => { isScrolling = false; }, 150);
        };

        const onOver = e => {
            const mEl = e.target.closest('[data-cursor-magnify]');
            if (mEl) {
                magnifyElRef.current = mEl;
                setMagnifyText(mEl.innerText);
                setElemWidth(mEl.getBoundingClientRect().width);
                isMagnifyRef.current = true;
                setIsMagnify(true);
                return;
            }
            if (e.target.closest('a,button,[role="button"],input,textarea,select,label'))
                setIsHover(true);
        };
        const onOut = e => {
            if (e.target.closest('a,button,[role="button"],input,textarea,select,label'))
                setIsHover(false);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('mouseover', onOver);
        window.addEventListener('mouseout', onOut);
        window.addEventListener('scroll', onScroll, { passive: true });

        const loop = () => {
            const { x, y } = mouseRef.current;

            // Dot — snaps instantly
            if (dotRef.current)
                dotRef.current.style.transform = `translate(${x - 4.5}px,${y - 4.5}px)`;

            // Ring — lerps
            ringPosRef.current.x = lerp(ringPosRef.current.x, x, LERP_T);
            ringPosRef.current.y = lerp(ringPosRef.current.y, y, LERP_T);
            const rx = ringPosRef.current.x;
            const ry = ringPosRef.current.y;

            if (ringRef.current)
                ringRef.current.style.transform = `translate(${rx - RING_SZ / 2}px,${ry - RING_SZ / 2}px)`;

            // Lens — positioned via CSS translate property
            if (lensRef.current)
                lensRef.current.style.translate = `${rx - LENS / 2}px ${ry - LENS / 2}px`;

            // Text offset — same lerped values as container (zero desync)
            if (lensTextRef.current && magnifyElRef.current) {
                const rect = magnifyElRef.current.getBoundingClientRect();
                const relX = rx - rect.left;
                const relY = ry - rect.top;
                lensTextRef.current.style.left = `${LENS / 2 - relX}px`;
                lensTextRef.current.style.top = `${LENS / 2 - relY}px`;
                lensTextRef.current.style.transformOrigin = `${relX}px ${relY}px`;
            }

            if (isMagnifyRef.current && magnifyElRef.current) {
                const rect = magnifyElRef.current.getBoundingClientRect();
                const dist = distFromRect(x, y, rect);
                if (dist > LINGER_PX) {
                    isMagnifyRef.current = false;
                    magnifyElRef.current = null;
                    setIsMagnify(false);
                }
            }

            // ONLY run luminance check every 12 frames and ONLY if not scrolling
            // This prevents massive layout-recalc lag during fast scroll.
            if (++frame % 12 === 0 && !isScrolling)
                setIsDark(luminance(getEffectiveBgColor(x, y)) < 0.35);

            rafRef.current = requestAnimationFrame(loop);
        };
        rafRef.current = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mouseout', onOut);
            window.removeEventListener('scroll', onScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const cc = isDark ? '#ffffff' : '#0A1128';
    const rSz = isHover ? 60 : RING_SZ;
    const base = {
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 99999, borderRadius: '50%',
        willChange: 'transform',
    };

    return (
        <>
            {/* ── Magnifying lens ─────────────────────────────────────────── */}
            <div
                ref={lensRef}
                style={{
                    ...base,
                    width: LENS, height: LENS,
                    overflow: 'hidden',
                    background: '#ffffff',
                    // Border matches cursor color — same as ring/dot
                    border: `2.5px solid ${cc}`,
                    boxShadow: '0 16px 50px rgba(0,0,0,0.2), inset 0 0 28px 10px rgba(255,255,255,0.88)',
                    transform: `scale(${isMagnify ? 1 : COLLAPSED_SCL})`,
                    opacity: isMagnify ? 1 : 0,
                    transition: [
                        'transform 0.45s cubic-bezier(0.16,1,0.3,1)',
                        'opacity   0.3s  ease',
                        'border-color 0.2s ease',
                    ].join(', '),
                    willChange: 'transform, opacity, translate',
                }}
            >
                <div
                    ref={lensTextRef}
                    style={{
                        position: 'absolute',
                        width: `${elemWidth}px`,
                        transform: `scale(${MAGNIFY})`,
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: 'var(--color-text)',
                        fontFamily: 'var(--font-body)',
                        fontWeight: 400,
                        userSelect: 'none',
                        opacity: isMagnify ? 1 : 0,
                        transition: `opacity 0.2s ease ${isMagnify ? '0.2s' : '0s'}`,
                        WebkitFontSmoothing: 'antialiased',
                        textRendering: 'geometricPrecision',
                    }}
                >
                    {magnifyText}
                </div>

                {/* Edge vignette — pure gradient, no blur */}
                <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'radial-gradient(circle, transparent 36%, rgba(255,255,255,0.6) 58%, rgba(255,255,255,0.99) 80%)',
                    pointerEvents: 'none',
                }} />

                {/* Lens glare */}
                <div style={{
                    position: 'absolute', top: '9%', left: '14%',
                    width: '30%', height: '18%',
                    background: 'radial-gradient(ellipse, rgba(255,255,255,0.55) 0%, transparent 72%)',
                    borderRadius: '50%', pointerEvents: 'none',
                }} />
            </div>

            {/* ── Normal cursor ─────────────────────────────────────────── */}
            <div
                ref={ringRef}
                style={{
                    ...base,
                    width: rSz, height: rSz,
                    border: `2.5px solid ${cc}`,
                    backgroundColor: isClick ? cc : 'transparent',
                    opacity: isMagnify ? 0 : (isClick ? 0.85 : 0.55),
                    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.12s ease, border-color 0.2s ease, opacity 0.25s ease',
                }}
            />
            <div
                ref={dotRef}
                style={{
                    ...base,
                    width: isClick ? 5 : 9, height: isClick ? 5 : 9,
                    backgroundColor: cc,
                    opacity: isMagnify ? 0 : 1,
                    transition: 'width 0.12s ease, height 0.12s ease, background-color 0.2s ease, opacity 0.2s ease',
                }}
            />
        </>
    );
};

export default CustomCursor;
