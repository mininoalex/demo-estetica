# Body Aesthetics — Estética Integral

Prototipo local en Next.js App Router, React, TypeScript y Tailwind CSS. Composición reconstruida en HTML/CSS a partir de la referencia facilitada. No se usa la captura de la web como fondo.

## Abrir en localhost

Desde PowerShell:

```powershell
cd C:\Users\alex\Desktop\PIA\proyectos\body-aesthetics
npm.cmd install
npm.cmd run dev
```

Abrir http://127.0.0.1:3000 (también http://localhost:3000). Panel: http://127.0.0.1:3000/admin. Si el puerto está ocupado, Next muestra el puerto alternativo en la terminal. `npm.cmd` evita la restricción de scripts de PowerShell sin cambiar las políticas del sistema.

```powershell
npm.cmd test
npm.cmd run typecheck
npm.cmd run build
npm.cmd start
```

Node.js 24 recomendado. Se incluye `package-lock.json`; para reinstalaciones reproducibles usar `npm.cmd ci`.

## Estructura

```text
src/app/                Landing, layout, estilos y ruta /admin
src/components/         Catálogo, reserva, navegación y administración
src/data/business.ts    Solo información comercial confirmada
src/data/demo.ts        Tratamientos, profesionales y horarios ficticios
src/lib/booking.ts      Motor puro de disponibilidad y validaciones
src/lib/store.tsx       Estado React y persistencia local versionada
public/images/          Fotografías individuales; optimización con next/image
tests/booking.test.ts   Reglas de superposición, pausas, fechas y duraciones
```

## Cómo probar

1. Elegir un tratamiento, profesional y un día laborable futuro.
2. Seleccionar un horario, pulsar Siguiente e ingresar un nombre ficticio.
3. Confirmar el turno de demostración y abrir el panel.
4. Cambiar su duración. Si invade otra reserva, una pausa o el cierre, se rechaza.
5. Volver al formulario: las franjas ocupadas ya no aparecen para esa profesional. Otra profesional puede atender en paralelo.
6. En el panel, agregar, editar o eliminar tratamientos y asignar profesionales. No se puede eliminar un tratamiento con reservas asociadas.
7. Cancelar una reserva libera su horario. Recargar conserva los datos en el mismo navegador y origen.

Las duraciones admiten múltiplos de 15 minutos entre 15 y 240. Cada reserva conserva la duración tomada al crearla aunque luego cambie la duración general del tratamiento. Los días, horarios y pausas de las profesionales se configuran en `src/data/demo.ts`. No hay turnos precargados: se generan al probar el formulario.

## Alcance y pendientes

- El almacenamiento es `localStorage`; no hay servidor de reservas, sincronización entre dispositivos ni garantía transaccional ante escrituras simultáneas en varias pestañas. La sincronización entre pestañas es una ayuda visual para la demo.
- El panel es público y sin contraseña de forma intencional. Para producción: autenticación, permisos, base de datos, validación en servidor, bloqueo transaccional, políticas de privacidad y gestión de datos.
- Validar catálogo, duraciones, profesionales, textos institucionales, fotografías, domicilio, horarios, redes y canales oficiales. `business.ts` mantiene esos campos pendientes. No se copian los testimonios, valoraciones ni datos de contacto de la captura.
- Reemplazar las imágenes ilustrativas por fotografías autorizadas del negocio. La portada es una imagen generada con IA, no una profesional ni una clienta real.
- Completar reseñas verificadas, equipo real y mapa al contar con la dirección.
- Pagos, WhatsApp automático y reservas reales están fuera del alcance solicitado.
- Se implementan etiquetas, navegación por teclado, foco visible, enlace para saltar al contenido, contraste de textos, estados accesibles y reducción de movimiento. La conformidad WCAG AA requiere una auditoría manual completa con lectores de pantalla y dispositivos reales.
- Se desactiva la indexación mientras sea un prototipo. No se publicó ni desplegó.

## Imágenes

Fotos de muestra descargadas de Unsplash (identificadores originales):

| Archivo | Foto |
| --- | --- |
| facial.jpg | photo-1570172619644-dfd03ed5d881 |
| body.jpg | photo-1544161515-4ab6ce6db874 |
| laser.jpg | photo-1519415510236-718bdfcd89c8 |
| radio.jpg | photo-1570172619644-dfd03ed5d881 |
| drainage.jpg | photo-1519823551278-64ac92734fb1 |
| modelado.jpg | photo-1540555700478-4be289fbecef |
| studio.jpg | photo-1600334129128-685c5582fd35 |

`hero-rose.webp`: generado con la herramienta integrada image_gen; original en `hero-rose.png`. Prompt: fotografía editorial de belleza, mujer adulta rubia con ojos cerrados y rosa rosa junto al rostro, luz difusa, fondo rosa empolvado y espacio a la izquierda, sin texto ni interfaz. Verificar derechos y adecuación de todas las fotos antes de un lanzamiento comercial.
