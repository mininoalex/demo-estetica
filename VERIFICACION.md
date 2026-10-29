# Verificación del prototipo

Fecha: 29 de octubre de 2026.

- `npm.cmd run build`: compilación y TypeScript correctos. Rutas `/` y `/admin` generadas correctamente.
- `npm.cmd test`: 8 pruebas aprobadas. Se cubren superposiciones parciales y completas, turnos contiguos, profesionales independientes, pausas, cierre, días no laborables, fechas pasadas, duración individual, fechas inválidas e intervalos de 15 minutos.
- Respuestas HTTP 200 de `/` y `/admin` en `127.0.0.1:3000`.
- Prueba manual en Brave: reservar limpieza facial a las 14:00, confirmar con nombre ficticio y verificar persistencia en `/admin`.
- Luego de reservar 14:00–15:00, los horarios superpuestos desaparecen; la siguiente disponibilidad de esa profesional comienza a las 15:00.
- Cambio individual de 60 a 90 minutos: la agenda pasa a mostrar 14:00–15:30. El tratamiento general conserva 60 minutos.
- Cancelación confirmada desde el panel: agenda vacía nuevamente. Se eliminaron los datos creados durante la prueba.
- Inspección visual de portada, reserva, reseñas, contacto y panel en escritorio. Inspección de reserva y panel en emulación responsive de 363 px.

Pendiente una auditoría completa de accesibilidad con lector de pantalla, dispositivos físicos y todos los navegadores objetivo. Las imágenes son ilustrativas y los datos comerciales continúan pendientes de confirmación.

## Publicación en Vercel

- Proyecto: `alex-minino/demo-estetica`.
- Dominio estable: https://demo-estetica-neon.vercel.app
- Despliegue inicial verificado: `dpl_AU3hjRF9yWnWNAW66bkQjF7u12XX`, estado READY.
- Instalación de Linux: se corrigió el lockfile que omitía dependencias opcionales y se validó `npm ci --dry-run --os=linux --cpu=x64`. Node.js fijado a 24.x. Compilación remota de Vercel aprobada.
- HTTP 200 anónimo desde el dominio estable para `/`, `/admin`, `/admin/` y `/robots.txt`.
- Verificados 18 recursos de las páginas: CSS, JavaScript y las ocho fotografías utilizadas, todos con HTTP 200.
- Tanto la portada como el panel incluyen metadatos `noindex, nofollow`, aviso visible de demostración y cabecera HTTP `X-Robots-Tag: noindex, nofollow, noarchive`.
- Verificación manual en Brave con emulación móvil de 363 px: portada, carga de fotografía, selección de tratamiento y horario, ingreso de nombre ficticio y confirmación de reserva. El aviso confirma que no se envía a ningún establecimiento.
- La reserva ficticia de 15:00 a 16:00 persistió al abrir `/admin/` en el mismo navegador.
- Consola del dominio Vercel sin errores durante la prueba. Se agregó un icono SVG para evitar la solicitud fallida de favicon del primer alojamiento.
- El acceso público no requiere cuenta Vercel. El panel es intencionalmente público y sus cambios son exclusivos del navegador visitante.
- La conexión GitHub → Vercel requiere conceder permiso a la integración sobre `mininoalex/demo-estetica`; mientras tanto se publica mediante la CLI autenticada.
