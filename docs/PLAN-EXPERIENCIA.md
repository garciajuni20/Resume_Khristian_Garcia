# Plan: una experiencia que solo puede ser de Khristian

> Estado (15 nov 2026): los puntos 1 a 13 están hechos y publicados. El 14 (Web Analytics) solo falta activarlo en el panel de Cloudflare; Turnstile, Resend y `AUTO_REPLY_FROM` son variables opcionales del proyecto.

Base actual (noviembre 2026): diseño "en tinta" estilo billete (grabados Flux 2 Klein, Bodoni,
guilloché, una tinta por industria), música por página y efectos de sonido sintetizados, URLs
limpias en Cloudflare Pages, accesibilidad 100 en Lighthouse en claro y oscuro.

La idea rectora: **todo lo que se mueve ocurre como ocurre en un billete o en una imprenta.**
La tinta se expande, la plancha imprime, el papel se sostiene contra la luz. Nada de partículas,
brillos de neón, fondos animados ni glassmorphism, que es lo que delata una web hecha por IA.

## Reglas para cada idea

| Regla | Por qué |
|---|---|
| Solo anima lo ocasional: cambio de página, primera aparición de una sección, un gesto deliberado | Lo que se repite decenas de veces (hover de filas, filtros, teclado) animado se siente lento |
| `transform`, `opacity`, `clip-path` y máscaras en CSS o WAAPI; nada de animar `height` o `margin` | Corren en el compositor y no se traban mientras la página carga |
| Entradas con `cubic-bezier(0.23, 1, 0.32, 1)`; salidas más cortas que las entradas | Respuesta inmediata; el sistema responde rápido cuando el usuario ya decidió |
| `prefers-reduced-motion`: sin desplazamientos ni máscaras; quedan solo fundidos breves | Mareo y accesibilidad; ya está aplicado en todo el sitio |
| Cada pieza mantiene Lighthouse accesibilidad 100 y no empeora el LCP móvil | Un reclutador en el teléfono es el caso más común |
| Lo que se genera con IA local (Wan2GP, Flux, ACE-Step) queda horneado en archivos estáticos | Cero costo, cero dependencia en tiempo de ejecución |

## Fase 1: transiciones con identidad

1. **Florecimiento de tinta entre páginas** (hecho en este paso). Una gota de tinta real filmada
   con Wan 2.2; su mancha es una máscara de 26 KB que el navegador hace crecer de forma continua (`scripts/ink-splash.py`).
   El navegador solo mueve la posición de la máscara: sin video ni canvas. No corre en la primera
   carga ni con movimiento reducido.
2. **Elementos compartidos con View Transitions** (React Router 7 trae `<Link viewTransition>`).
   El año en Bodoni y el grabado de un rol viajan desde la "Ruta" hasta su entrada en el registro.
   La fila de un proyecto se convierte en el encabezado de su caso de estudio. Le da continuidad
   espacial: el ojo sigue el mismo objeto de una vista a otra.
3. **Prensa de grabado**: cada grabado se imprime una sola vez al entrar en pantalla, de arriba
   abajo como una plancha (máscara con `animation-timeline: view()`, sin JavaScript).
4. **Hilo de seguridad**: el guilloché bajo las cifras se dibuja con el scroll (trazo SVG con
   animación ligada al scroll), como el hilo metálico de un billete.

## Fase 2: interacciones que se recuerdan

5. **Sostener a contraluz**: mantener presionado (o el puntero quieto) sobre el retrato revela una
   marca de agua con las iniciales y el año, con un foco de luz que sigue al puntero con un resorte
   suave. Es deliberado y raro de activar, así que puede deleitar sin estorbar.
6. **Modo luz UV** (atajo `U`, también un botón discreto en el pie): como al pasar un billete por
   luz ultravioleta, aparecen fibras fluorescentes y las notas ocultas: de dónde sale cada cifra,
   qué herramienta hubo detrás. Convierte las fuentes en un hallazgo, no en letra pequeña.
7. **El pipeline de Alleviate, vivo**: en el caso de estudio, fuentes → Azure Data Factory →
   Snowflake → dbt → Power BI dibujados como tuberías grabadas. Al recorrerlo, una gota de tinta
   avanza por cada etapa y muestra la herramienta y la prueba (85% → 99.5%). Le explica la
   arquitectura a un reclutador técnico en diez segundos.
8. **Sello de "verificado"**: junto a cada cifra, un pequeño sello en relieve que al pasar el
   puntero muestra la nota de origen. Usa el foco del teclado igual que el puntero.

## Fase 3: sonido y presentación

9. **Sonido de tinta** sincronizado con la transición: un toque de papel húmedo muy corto en la
   misma escala pentatónica en Re/Fa que el resto del sistema (ACE-Step para la textura, síntesis
   para el ataque). Solo si el visitante activó el sonido.
10. **Modo presentación** (`/resume?present`): pantalla completa, una sección por "lámina" con la
    transición de tinta entre ellas y la música del CV. Para compartir pantalla en una entrevista
    y contar la carrera en dos minutos.
11. **Video**: la película de Remotion pasa al estilo tinta (papel, Bodoni, grabados) para que no
    parezca de otro sitio, con la misma gota de tinta como transición entre escenas.

## Fase 4: Cloudflare como parte de la experiencia

12. **Vistas previas por página en estilo billete**: una imagen Open Graph propia para `/resume`,
    `/alleviate` y `/flowber`, generada en el build con el grabado y la cifra principal de cada
    página. En LinkedIn cada link se ve distinto y propio.
13. **Formulario con respuesta inmediata**: la Pages Function ya entrega el mensaje; con Resend
    puede mandar al remitente un acuse con el CV en PDF adjunto en su idioma.
14. **Analítica sin cookies** (Cloudflare Web Analytics) para saber qué páginas leen los
    reclutadores y en qué idioma, y decidir con datos qué fase sigue.

## Orden sugerido

Fase 1 completa, luego 7 (pipeline vivo: es lo que más pesa para un rol de Data Engineer), luego
12 (vistas previas: multiplica cada link que mandes), y después el resto según la analítica.

## Lo que no vamos a hacer

Cursores personalizados, partículas, fondos 3D, texto que se escribe solo, contadores animados,
scroll secuestrado y cualquier animación que obligue a esperar para leer. Todo eso hace que una web
parezca plantilla y le cuesta tiempo al reclutador.
