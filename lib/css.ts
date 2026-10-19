import type { CSSProperties } from 'react';

/** Permite usar variables CSS (--h, --d...) dentro de style={{}} sin errores de tipos. */
export const css = (o: Record<string, string | number | undefined>) => o as CSSProperties;
