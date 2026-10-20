'use client';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { MediaItem } from '../lib/types';
import { css } from '../lib/css';

type OpenFn = (list: MediaItem[], i?: number) => void;
const Ctx = createContext<OpenFn>(() => {});
export const useLightbox = () => useContext(Ctx);

// open(lista, indice): abre la pieza en grande y permite pasar a las otras de la lista
export default function LightboxProvider({ children }: { children: ReactNode }) {
  const [st, setSt] = useState<{ list: MediaItem[]; i: number } | null>(null);
  const open = useCallback<OpenFn>((list, i = 0) => setSt({ list, i }), []);
  const close = useCallback(() => setSt(null), []);
  const go = useCallback((d: number) => setSt((s) => (s ? { ...s, i: (s.i + d + s.list.length) % s.list.length } : s)), []);

  useEffect(() => {
    if (!st) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    addEventListener('keydown', k);
    return () => removeEventListener('keydown', k);
  }, [st, close, go]);

  const it = st ? st.list[st.i] : null;
  const rt = it ? it.aspect || (it.type === 'video' ? 9 / 16 : 4 / 5) : 1;
  const muxPlayer = it?.type === 'video' && it.src?.includes('player.mux.com/');

  return (
    <Ctx.Provider value={open}>
      {children}
      <div id="lb" className={st ? 'on' : ''} role="dialog" aria-modal="true" aria-label="Vista ampliada" onClick={(e) => e.target === e.currentTarget && close()}>
        {it && (
          <>
            <button aria-label="Cerrar" onClick={close}>×</button>
            <div className="box g" style={css({ '--h': it.hue, aspectRatio: rt, height: 'auto', width: `min(92vw,${(82 * rt).toFixed(2)}svh,${it.aspect ? 1100 : Math.round(760 * rt)}px)` })}>
              {it.src && muxPlayer ? (
                <iframe
                  className="mi"
                  src={`${it.src}${it.src.includes('?') ? '&' : '?'}autoplay=true`}
                  title={it.caption || 'Reproductor de video'}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : it.src ? (
                it.type === 'video' ? (
                  <video className="mi" src={it.src} poster={it.poster || undefined} controls autoPlay loop playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="mi" src={it.src} alt={it.caption || ''} />
                )
              ) : it.type === 'video' ? (
                <><span className="pl" /><div className="bar"><i /></div></>
              ) : null}
              {!it.src && it.caption && <div className="cap">{it.caption}</div>}
            </div>
          </>
        )}
      </div>
    </Ctx.Provider>
  );
}
