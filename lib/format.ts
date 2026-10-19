export function fmt(n: number): string {
  if (n >= 1e6) return (Math.round(n / 1e5) / 10 + '').replace('.', ',') + ' M';
  if (n >= 1e4) return (Math.round(n / 100) / 10 + '').replace('.', ',') + ' K';
  return n.toLocaleString('es-AR');
}
