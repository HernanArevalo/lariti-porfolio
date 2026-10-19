export default function Marquee({ words }: { words: string[] }) {
  return (
    <div className="mq">
      <div className="mq-t">{[...words, ...words].map((w, i) => <span key={i}>{w}</span>)}</div>
    </div>
  );
}
