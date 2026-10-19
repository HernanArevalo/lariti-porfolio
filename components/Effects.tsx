'use client';
import { useEffect } from 'react';

export default function Effects() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.rv').forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return null;
}
