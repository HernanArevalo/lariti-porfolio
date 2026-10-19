'use client';
import { useEffect, useState } from 'react';

interface Props { brand: string; name: string; links: { id: string; label: string }[] }

export default function Nav({ brand, name, links }: Props) {
  const [open, setOpen] = useState(false);
  const [cur, setCur] = useState<string | null>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const f = () => {
      const y = innerHeight * 0.4;
      let c: string | null = null;
      links.forEach((l) => {
        const e = document.getElementById(l.id);
        if (e && e.getBoundingClientRect().top <= y) c = l.id;
      });
      const d = document.documentElement;
      if (innerHeight + scrollY >= d.scrollHeight - 4) c = links[links.length - 1].id;
      setCur(c);
      setW((scrollY / Math.max(d.scrollHeight - innerHeight, 1)) * 100);
    };
    f();
    addEventListener('scroll', f, { passive: true });
    return () => removeEventListener('scroll', f);
  }, [links]);

  return (
    <>
      <div className="pgb" style={{ width: w + '%' }} />
      <nav className={open ? 'open' : ''}>
        <a className="br" href="#" aria-label={`${name}, inicio`}>{brand}</a>
        <div>
          {links.map((l) => (
            <a key={l.id} href={'#' + l.id} className={cur === l.id ? 'on' : ''} aria-current={cur === l.id ? 'true' : undefined} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
        </div>
        <button className="mb" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}><i /><i /></button>
      </nav>
    </>
  );
}
