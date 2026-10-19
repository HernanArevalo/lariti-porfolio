import type { Site } from '../lib/types';

interface Props { name: string; email: string; contact: Site['contact'] }

export default function Footer({ name, email, contact }: Props) {
  return (
    <footer id="contacto">
      <h2>{contact.title}</h2>
      <p>{contact.text}</p>
      <a className="btn" href={`mailto:${email}`}>{contact.button}</a>
      <small>© {name}</small>
    </footer>
  );
}
