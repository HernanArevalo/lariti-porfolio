'use client';
import type { MediaItem, Section } from '../lib/types';
import { css } from '../lib/css';
import Media, { Play } from './Media';
import Carousel from './Carousel';
import { useLightbox } from './Lightbox';

export default function Showcase({ id, title, intro, items }: Section) {
  const open = useLightbox();
  return (
    <section className="s" id={id}>
      <h2>{title}</h2>
      <p className="in">{intro}</p>
      <div>
        {items.map((it, i) => {
          const photo = it.type === 'photo';
          const media = it.media && it.media.length ? it.media : [{}];
          const list: MediaItem[] = media.map((m, j) => ({
            ...m,
            type: it.type,
            hue: m.hue ?? (it.hue + j * 41) % 360,
            caption: `${it.brand}, ${it.title}` + (media.length > 1 ? ` (${j + 1} de ${media.length})` : ''),
          }));
          return (
            <div className="row rv" key={i}>
              {list.length > 1 ? (
                <Carousel list={list} photo={photo} />
              ) : (
                <div className={'md g' + (photo ? ' ph' : '')} style={css({ '--h': list[0].hue })} role="button" tabIndex={0} aria-label={`Ampliar ${it.title}`} onClick={() => open(list, 0)} onKeyDown={(e) => e.key === 'Enter' && open(list, 0)}>
                  <Media item={list[0]} />
                  <Play item={list[0]} />
                </div>
              )}
              <div className="tx">
                <div className="b">{it.brand}</div>
                <h3>{it.title}</h3>
                <p>{it.description}</p>
                <div className="tg">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
