'use client';
import { useState } from 'react';
import type { TravelData } from '../lib/types';
import { css } from '../lib/css';
import Media, { Play } from './Media';
import { useLightbox } from './Lightbox';

export default function Travel({ title, intro, categories, items }: TravelData) {
  const open = useLightbox();
  const [c, setC] = useState('Todo');
  const list = items.map((v) => ({ ...v, caption: `${v.destination}, ${v.title}` }));
  const shown = list.map((v, i) => ({ v, i })).filter(({ v }) => c === 'Todo' || v.category === c);
  const shownList = shown.map((s) => s.v);

  return (
    <section className="s" id="viajes">
      <h2>{title}</h2>
      <p className="in">{intro}</p>
      <div className="fl">
        {['Todo', ...categories].map((k) => (
          <button key={k} className={'fb' + (c === k ? ' on' : '')} onClick={() => setC(k)}>{k}</button>
        ))}
      </div>
      <div className="vg">
        {shown.map(({ v, i }, k) => (
          <article key={c + i} className="vc" tabIndex={0} style={{ animationDelay: k * 0.06 + 's' }} onClick={() => open(shownList, k)} onKeyDown={(e) => e.key === 'Enter' && open(shownList, k)}>
            <div className={'vm g' + (v.type === 'photo' ? ' ph' : '')} style={css({ '--h': v.hue })}>
              <span className="vt">{v.category}</span>
              <Media item={v} />
              <Play item={v} />
            </div>
            <div className="b">{v.destination}</div>
            <h3>{v.title}</h3>
            <p>{v.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
