# lariti-web

Web de Lari Tissera hecha con Next.js (App Router) y TypeScript. Todo el contenido sale de los JSON de `data/`.

## Correr el proyecto

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck   # revisa los tipos
```

## Cómo cargar contenido

Poné los archivos en `public/media/` y completá `src` (y `poster` para videos) en el JSON.
Si `src` está vacío se ve el placeholder de color. Ejemplo: `"src": "/media/lari-01.jpg"`.

| Archivo | Qué controla |
| --- | --- |
| `data/site.json` | Nombre, navbar, textos, "Sobre mí", redes y estadísticas, contacto |
| `data/cloud.json` | Nube de contenido del inicio (`x`, `y` en %, `w` tamaño, `ratio` alto/ancho, `type`: `photo` o `video`) |
| `data/hero-images.json` | Imágenes horizontales a pantalla completa que pasan detrás del título |
| `data/sections.json` | Secciones UGC, Marcas y Fotografía. Un item con varios `media` se muestra como carrusel |
| `data/travel.json` | Sección Viajes: categorías (filtros) e items |

Para agregar una sección nueva, sumá un objeto a `sections.json` y su `id` en `nav` de `site.json`.
Los videos se reproducen solos, sin sonido y en loop; en la vista ampliada tienen controles.
Recomendado: fotos en `.webp`/`.jpg` livianas y videos `.mp4` cortos (H.264).

Los tipos de los JSON están en `lib/types.ts` y se aplican en `lib/data.ts`. Si agregás campos nuevos a un JSON, sumalos ahí también.
