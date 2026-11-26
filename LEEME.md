# Web del piso turístico

Réplica en HTML, CSS y JavaScript del diseño de casaluisagalleira.com (hecha con Amenitiz). No usa frameworks, ni librerías, ni paso de compilación: lo que hay en la carpeta es lo que se sube al servidor.

Este documento explica cómo está montada, cómo hacer los cambios más habituales y qué queda pendiente.

---

## 1. Estructura de la carpeta

```
web-piso-turistico/
├── index.html                      Portada
├── el-piso.html                    Descripción, ficha con carrusel, servicios y normas
├── como-llegar.html                Mapa y cómo llegar
├── que-ver-cerca.html              "Ver más" de Lugares a visitar cerca del piso: 10 sitios con foto y mapa
├── que-ver-turismo.html            "Ver más" de Turismo en Ourense: 10 sitios con foto y mapa
├── que-ver.html                    Qué ver: zonas "Lugares a visitar cerca del piso" y "Turismo en Ourense"
├── donde-comer.html                Dónde comer (copiada de Casa Luisa)
├── restaurantes-centro.html        "Más restaurantes" de Restaurantes centro Ourense: 10 de la zona de vinos con foto y mapa
├── restaurantes.html               "Más restaurantes" (menú y precio especial): 21 restaurantes con foto y mapa
├── termas.html                     Termas (copiada de Casa Luisa)
├── termas-mas.html                 "Ver más" de Termas: las 7 termas con foto y mapa
├── galeria-termas-outariz.html     Galería de las termas de Outariz
├── entorno.html                    Entorno: alrededores del piso con un "Descubrir" a cada apartado (copia de la de Casa Luisa)
├── galeria.html                    Galería de fotos
├── contacto.html                   Datos, formulario y mapa
├── senderismo-y-bicicleta.html     ┐
├── rutas-de-senderismo.html        │ (ya no se usa: redirige a senderismo-y-bicicleta.html; se puede borrar)
├── galeria-conociendo-ramiras.html│
├── galeria-os-fabas.html          │
├── galeria-valdueiro.html         │
├── galeria-porto-ramiras.html     │
├── galeria-peneda-da-moura.html   │
├── galeria-boutireira-a-fragoso.html
├── ruta-nautica-castrelo.html     │ (galería de la ruta náutica)
├── galeria-catamaran-ribeira-sacra.html
├── galeria-catamaran-belesar.html │
├── galeria-playa-fluvial-belesar.html  Playa fluvial nº 14: copia de la galería de Belesar con "Volver a playas fluviales"
├── playas-fluviales-mapas.html    │ (las 3 playas fluviales)
├── playa-a-pontenova.html
├── fervenza-pozo-caido.html
├── pozas-de-mallon.html           │
├── villas-y-ferias-mas.html       │ (las 7 villas: Ourense … Barral)
├── galeria-ourense.html            Galería de Ourense (Villas y ferias): Puente Romano, As Burgas y feria
├── galeria-allariz.html
├── galeria-ribadavia.html         │
├── (y 10 páginas más de fervenzas y pozas: fervenza-rio-gorgua, pozas-de-melon, fervenza-auga-caida, seimeira-de-vilagocende, fervenza-do-toxa, fervenza-rio-dorelle, fervenzas-rio-firveda, pozo-da-seima, fervenza-portela-do-homem, fervenza-a-cidadella)
├── rutas-a-caballo.html            │ Desplegable "Rutas": mismo contenido
├── rutas-nauticas.html             │ que la web original. "Rutas en quad"
├── rutas-en-catamaran.html         │ no tiene página: enlaza a nasepi.com
├── rutas-en-playas-fluviales.html  │
├── villas-y-ferias.html            │
├── escapadas.html                  ┘
├── rutas-en-coche.html             (las 7 rutas en coche de 1 día; "Ver más" de escapadas)
├── galeria-coche-*.html            (6 galerías de las rutas en coche)
├── viajes-2-dias.html              (los 3 viajes de 2 días; "Ver más" de la 2ª sección de escapadas)
├── galeria-viaje-*.html            (3 galerías de los viajes de 2 días)
├── aviso-legal.html                ┐ Textos legales (plantillas): se enlazan
├── terminos-condiciones.html       │ desde el pie y desde el formulario.
├── politica-privacidad.html        │ Términos y condiciones: reserva, pago,
├── politica-cookies.html           ┘ cancelación, fianza, entrada y salida
├── css/styles.css                  Todos los estilos
├── js/config.js                    Datos del piso y menú
├── js/main.js                      Cabecera, pie, aviso de cookies y comportamiento
├── img/                            Imágenes de relleno (.svg) y favicon.svg
├── fonts/                          Aquí va la tipografía de títulos (ver 3.6)
├── robots.txt, sitemap.xml         Para los buscadores (falta poner el dominio)
├── descargar-fotos.py              Baja las fotos de las rutas al proyecto
└── LEEME.md                        Este documento
```

---

## 2. Cómo funciona

### 2.1 Esqueleto de cada página

Todas las páginas tienen el mismo esqueleto:

```html
<body>
  <div id="cabecera"></div>      <!-- la rellena main.js -->
  <noscript> ...menú básico... </noscript>
  <main> ...contenido propio de la página... </main>
  <div id="pie"></div>           <!-- lo rellena main.js -->
  <script src="js/config.js"></script>
  <script src="js/main.js"></script>
</body>
```

La cabecera y el pie **no están escritos en cada HTML**: los genera `main.js` a partir de `config.js`. Así el menú, el logo, el teléfono, etc. se cambian en un solo sitio. El orden de los dos `<script>` importa: `config.js` tiene que ir primero.

El bloque `<noscript>` es un menú sencillo que solo ve quien tenga JavaScript desactivado. Es lo único del menú que está repetido en cada HTML.

La portada lleva `<body class="home">` para que la foto de cabecera empiece debajo del menú fijo; el resto de páginas no.

### 2.2 `js/config.js`: los datos

Contiene un único objeto, `SITIO`:

| Campo | Para qué sirve |
|---|---|
| `nombre`, `subtitulo` | Las dos líneas del logo (cabecera y pie). `subtitulo` está vacío, así que solo se ve el nombre |
| `direccion1`, `direccion2` | Pie, página de contacto, tarjeta del mapa y textos legales |
| `telefono`, `email` | Teléfono y e-mail principales: pie, botones "Llámanos", formulario y textos legales |
| `telefonos`, `emails` | Todos los teléfonos y e-mails, en el orden en que salen en la página de contacto |
| `whatsapp` | Botón verde flotante. Vacío = no aparece |
| `registro` | Número de registro de la vivienda turística. Sale en el pie, en las normas de `el-piso.html` y en el aviso legal. Vacío = no sale en el pie y en las otras dos se queda el texto de relleno |
| `titular`, `nif`, `domicilioFiscal` | Titular de la web: NABRARIR S.L., su CIF y su domicilio fiscal (Mateo de Prado, nº 12, Ourense). Salen en el aviso legal, en la política de privacidad y en el formulario de contacto |
| `urlReservas` | Enlace del motor de reservas. Vacío = "Reservar" lleva a contacto |
| `mapa` | Texto que busca Google Maps (dirección o nombre del alojamiento) |
| `videoPortada`, `videoPiso` | ID de YouTube del vídeo de fondo de la portada y del vídeo central. Vacío = se ve la foto |
| `instagram`, `facebook`, `youtube` | Enlace de cada red: iconos a color del pie. Vacío = no aparece ese icono. YouTube enlaza a youtube.com/@ApartamentosNabrarir; Instagram y Facebook llevan `#` (sin enlace) hasta tener los perfiles |
| `urlFormulario` | A dónde se envía el formulario. Vacío = abre el correo del visitante |
| `recaptcha` | Clave del sitio de Google reCAPTCHA (casilla "No soy un robot" del formulario). Ahora es la clave de prueba de Google. Vacío = no aparece |
| `menu` | Menú principal (ver 3.2) |

### 2.3 `js/main.js`: el comportamiento

Hace estas cosas, en este orden:

1. **Cabecera**: logo, menú de escritorio con desplegables, botón Reservar y versión móvil (icono de calendario, hamburguesa y menú a pantalla completa). Marca en dorado la página actual.
2. **Pie**: datos de contacto, número de registro, logo, redes, enlaces del menú (en lugar de "Rutas", que no tiene página propia, sale la primera ruta del desplegable, "Rutas en quad", que lleva a la web de quads nasepi.com) y enlaces legales (aviso legal, privacidad, cookies y "Configurar cookies"). También el botón de WhatsApp.
3. **Atributos `data-`**: rellena con los datos de `config.js` los elementos del HTML que los llevan:

   | Atributo | Efecto |
   |---|---|
   | `data-sitio="nombre"` | Escribe dentro el valor de `SITIO.nombre` (vale cualquier campo) |
   | `data-reserva` | Convierte el enlace en botón de reserva (`urlReservas` o contacto) |
   | `data-tel` | Pone el `href="tel:..."` con el teléfono principal |
   | `data-telefonos`, `data-emails` | Escriben dentro la lista de teléfonos o e-mails, uno por línea y pulsables |
   | `data-registro` | Si hay `registro` en `config.js`, sustituye el texto por "Número de registro...: X" |
   | `data-mapa` | Mete dentro el mapa de Google (cuando se aceptan las cookies) |
   | `data-mapa-ruta` | Enlace "cómo llegar" de Google Maps hasta la dirección |
   | `data-video-portada`, `data-video-piso` | Insertan el vídeo de YouTube si hay ID en `config.js` |
   | `data-cookies` | Convierte el enlace en "volver a mostrar el aviso de cookies" |

4. **Mapa, vídeos y aviso de cookies**: Google Maps y YouTube pueden instalar cookies, así que **no se cargan hasta que el visitante acepta**. La primera vez aparece abajo un aviso con "Aceptar" y "Rechazar"; la elección se guarda en el navegador (`localStorage`, clave `cookies`). Mientras no se acepta, en el sitio del mapa o del vídeo hay un hueco con un botón "Ver mapa" / "Ver vídeo" que carga solo ese. El vídeo de fondo de la portada, sin aceptar, deja la foto.
   - Los vídeos escritos a mano en un HTML (los de las rutas) llevan la dirección en `data-src` en vez de `src`: `<iframe data-src="https://www.youtube-nocookie.com/embed/ID">`. Si añades un vídeo nuevo, ponlo igual.
5. **Buscador de fechas** (portada): por defecto pone hoy y dentro de dos días, y no deja elegir una salida anterior a la entrada. Al pulsar "Buscar":
   - con `urlReservas`: abre ese enlace añadiendo `?checkin=AAAA-MM-DD&checkout=AAAA-MM-DD&adults=N`;
   - sin `urlReservas`: va a `contacto.html` y deja el mensaje ya escrito con las fechas.
6. **Carrusel** (`.carrusel`, en `el-piso.html`): pasa las fotos cada 5 segundos, con puntos y flechas. Se adapta solo al número de `<img>` que haya.
7. **Fotos ampliables** (`.galeria` y `.tira`): al pulsar una foto se abre en grande, con flechas, teclado y Escape.
8. **Tiras de fotos** (`.tira-marco`, en las páginas de rutas): fila de fotos que se desliza con las flechas o con el dedo.
9. **Formulario de contacto**: con `urlFormulario` envía los datos por `POST` en JSON; sin él, abre el programa de correo del visitante con el mensaje preparado. Lleva un campo oculto (`web`) como trampa anti-spam. Si hay `recaptcha`, carga la casilla "No soy un robot" de Google en el hueco `data-captcha` y no deja enviar sin marcarla; la respuesta se envía como `g-recaptcha-response`.
10. **Animación al hacer scroll**: los elementos con la clase `aparece` entran con un fundido cuando llegan a la pantalla.

### 2.4 `css/styles.css`: los estilos

Los colores y tipografías están como variables al principio del archivo. La paleta es "granate y oro", elegida por David para que no se parezca tanto a Casa Luisa (antes era azul marino y azul claro). Todos los colores de la web salen de aquí: cambiando estas líneas cambia la web entera.

```css
:root {
  --azul: #3b2430;      /* granate oscuro: cabecera, pie, textos (el nombre se quedó de la paleta antigua) */
  --celeste: #b08848;   /* dorado viejo: botones, iconos, detalles */
  --gris: #f7f3ec;      /* fondo claro: ficha del alojamiento, tarjetas */
  --suave: #ece4d8;     /* fondo mientras cargan fotos y mapas */
  --linea: #d9ccb8;     /* bordes y separadores finos */
  --menu: #4d3040;      /* fondo de los desplegables del menú */
  --velo: #3b2430;      /* oscurece la foto o el vídeo de la portada */
  --alto-nav: 142px;    /* alto de la cabecera */
}
```

Hay dos saltos de tamaño: por debajo de **1200 px** se reduce el menú, y por debajo de **860 px** se pasa a la versión móvil (menú hamburguesa, todo en una columna).

Bloques que se pueden reutilizar en cualquier página:

| Clase | Qué es |
|---|---|
| `.bloque` + `.bloque__dentro` | Bloque de texto centrado. `.titulo` + `.separador` para el título con las dos rayas |
| `.btn` | Botón dorado. `.btn--borde` y `.btn--redondo` son variantes |
| `.portada` | Foto grande de cabecera. `.portada--corta` para la de contacto |
| `.columnas` + `.col-imagen` | Dos fotos con texto encima y marco blanco |
| `.tercios` + `.tercio` | Tres columnas: foto, texto sobre granate, foto |
| `.franja` | Franja de foto con efecto parallax y un botón en el centro |
| `.dos` | Texto a un lado y foto al otro. `.dos--invertido` cambia el orden |
| `.video` | Vídeo de YouTube centrado en 16:9 |
| `.tira-marco` + `.tira` | Tira de fotos deslizable |
| `.fotos` | Fila de 2 o 3 fotos (`style="--n:2"`) |
| `.galeria` | Galería en columnas con fotos ampliables |
| `.ficha` + `.carrusel` | Ficha del alojamiento con carrusel |
| `.servicios` + `.servicio` | Rejilla de iconos con texto |
| `.mapa` + `.mapa__tarjeta` | Mapa con la tarjeta de dirección encima. `.mapa--alto` para el de contacto |
| `.formulario` | Formulario de contacto |
| `.legal` | Página de texto legal (títulos numerados y texto a la izquierda) |
| `.cookies`, `.bloqueado` | Aviso de cookies y hueco del mapa o vídeo sin aceptar (los crea `main.js`) |
| `.sin-js` | Menú básico sin JavaScript |

---

## 3. Cómo hacer los cambios habituales

### 3.1 Cambiar nombre, teléfono, dirección, redes, registro...
Solo en `js/config.js`. Se actualiza en todas las páginas.

Excepción: el nombre que sale en la pestaña del navegador y al compartir un enlace (`<title>`, `og:title`, `og:site_name`) está escrito en cada HTML ("Apartamento Nabrarir"). Si cambia, se sustituye de una vez con "Buscar y reemplazar en la carpeta" del editor (en VS Code, Ctrl+Mayús+H), solo en archivos `*.html`.

El nombre se escribe en `config.js` con mayúscula inicial ("Apartamento Nabrarir") porque también sale dentro de frases; en el logo se ve en mayúsculas por CSS. El tamaño del logo baja con el ancho de la pantalla y, si el nombre no cabe en una línea junto al menú, se parte en dos.

### 3.2 Cambiar el menú
En `SITIO.menu`, dentro de `config.js`:

```js
{ texto: "Galería", url: "galeria.html" },              // enlace normal
{ texto: "Entorno", url: "entorno.html", hijos: [ ... ] }, // enlace con desplegable
{ texto: "Rutas", hijos: [ ... ] }                         // sin url: solo abre el desplegable
```

Orden actual de Rutas: Rutas en quad, Senderismo y bicicleta, Termas (la misma página que en Entorno; en Rutas el enlace es `termas.html?desde=rutas`, y así arriba se marca en color solo el apartado desde el que se entró: Rutas o Entorno), Rutas en catamarán, Rutas náuticas y rafting, Rutas en playas fluviales, Rutas a caballo, Pesca, Villas y ferias y Escapadas. Para añadir o quitar una ruta basta con añadir o quitar su línea en `hijos`. Una opción sin `url` sale en el menú como texto, sin enlace. Si la `url` de una opción es otra web (empieza por `http`), se abre en una pestaña nueva; así está "Rutas en quad", que lleva a https://www.nasepi.com/. Si quieres que el cambio llegue también al menú sin JavaScript, cambia el bloque `<noscript>` de cada página (buscar y reemplazar en la carpeta) y `sitemap.xml`.

### 3.3 Añadir una página nueva
1. Copia una página parecida (por ejemplo `rutas-a-caballo.html`) con otro nombre.
2. Cambia el `<title>`, la `<meta name="description">`, las dos líneas `og:title` y `og:description`, y el contenido de `<main>`.
3. Añádela al menú en `config.js` y a `sitemap.xml`.

### 3.4 Cambiar las fotos
- Guarda la foto en `img/` y cambia la ruta en el HTML: `img/portada.svg` → `img/portada.jpg`.
- Las fotos de fondo van en el atributo `style="background-image:url('img/...')"` de la sección; las demás, en `<img src="...">`.
- **Carrusel del piso**: añade o quita líneas `<img>` dentro de `<div class="carrusel">`.
- **Galería**: añade o quita líneas `<button><img src="..." alt="..."></button>` dentro de `<section class="galeria">`. Las fotos del piso están en `img/galeria/` (copias reducidas a 1600 px de las originales de `img/fotospisodentro/`, que no se suben a la web si no se quiere). Se ven todas iguales en una cuadrícula de 4 columnas (2 en móvil) y al pulsar se abre la foto entera.
- Pon siempre un `alt` que describa la foto.

### 3.5 Poner los vídeos
Copia el ID del vídeo de YouTube (lo que va después de `v=` en la dirección) en `videoPortada` o `videoPiso` de `config.js`. Si el piso no tiene vídeo, borra en `index.html` la sección marcada con el comentario `VÍDEO`.

### 3.6 Cambiar colores o tipografía
- Colores: variables de `:root` en `styles.css`.
- Tipografía de títulos: la original usa **Existence Light** (gratuita). Deja el archivo como `fonts/Existence-Light.otf` y se usa sola. Mientras no esté, se ve Poiret One (y en la consola del navegador sale un aviso 404 de ese archivo, que no afecta a nada).
- El fondo de los desplegables del menú es la variable `--menu`. El icono de la pestaña (`img/favicon.svg`) lleva el granate escrito a mano (`#3b2430`): si cambias la paleta, cámbialo también ahí.

### 3.7 Cambiar los textos legales o el aviso de cookies
- Los cuatro textos están en `aviso-legal.html`, `terminos-condiciones.html`, `politica-privacidad.html` y `politica-cookies.html`. El punto 3 del aviso legal enlaza a los términos y a la privacidad. Los datos del titular salen de `config.js`.
- El texto del aviso de cookies y de los huecos "Ver mapa" / "Ver vídeo" está en `main.js`, apartado "Mapa, vídeos y aviso de cookies".
- Si se añade otro servicio de terceros (analítica, un widget de reservas, etc.), hay que añadirlo a la política de cookies y cargarlo solo tras aceptar.

### 3.8 Probar en local
Abre `index.html` con doble clic o, mejor, desde la carpeta:

```
python -m http.server
```

y entra en http://localhost:8000

Para volver a ver el aviso de cookies, pulsa "Configurar cookies" en el pie.

---

## 4. Cambios pendientes

### 4.1 Imprescindibles antes de publicar

- [x] **Nombre del piso**: "Apartamento Nabrarir", puesto en `js/config.js` y en los títulos y etiquetas `og:` de las 17 páginas. La cabecera y el pie se ajustaron para que quepa el nombre.
- [x] **Dirección**: Rúa San Pedro 1, 2º, 32005 Ourense, puesta en `js/config.js`. El mapa busca "Rúa San Pedro 1, 32005 Ourense" (campo `mapa`) y marca el sitio correcto. La tarjeta de dirección va, como en la web original, en azul claro abajo a la derecha y medio fuera del mapa, para no tapar el centro (marcador y aviso de Google "Mantén pulsada la tecla Ctrl…").
- [x] **Teléfonos y e-mails**: principales +34 669 04 66 49 y nabor@ecografia.eu; en contacto salen los 4 teléfonos y los 4 e-mails.
- [ ] **Resto de datos en `js/config.js`**: WhatsApp, enlaces de Instagram y Facebook (ahora `#`) y `registro`. (Titular, CIF y domicilio fiscal ya están puestos.)
- [ ] **Textos entre corchetes `[ ]`**: son los huecos por rellenar. Están en `index.html`, `el-piso.html`, `aviso-legal.html`, `terminos-condiciones.html` (pago, cancelación, importe de la fianza, fumar y fiestas) y `politica-privacidad.html`. Búscalos con el editor (`[`).
- [ ] **El piso** (`el-piso.html`): el carrusel lleva primero la fachada (`img/portada-contacto.jpg`, captura de Street View, la misma de Contacto) y después salón, cocina, dormitorio y baño de `img/galeria/`. Las normas son las de Casa Luisa, con "Ramiras" cambiado por "el piso de San Pedro", maquetadas para leerse mejor: arriba dos recuadros con la hora de entrada (16:00) y de salida (11:00 como máximo), y debajo una tarjeta por apartado con viñetas (estilos `.horario` y `.normas` en `css/styles.css`). Se quitó el apartado "Grupos para eventos especiales". Servicios (9, en 3 filas de 3): Wifi, Calefacción, Televisión / Cocina equipada, Lavadora, Secadora / Aire acondicionado, Ropa de cama y toallas, Ducha. Cómo llegar tiene, debajo de taxi y autobús, el parking de la Alameda (Telpark) con enlace a Google Maps.
- [ ] **Portada** (`index.html`): en Bienvenidos van la dirección (Rúa San Pedro 1, 2º, 32005 Ourense) y "A 2 minutos a pie de la Catedral y la Praza Maior, y con autobús urbano (parada junto a Correos) y aparcamiento muy cerca". En Tipos de alojamiento, Vacacional lleva la foto del Puente Romano y Estancia fija la de la Praza do Ferro (las dos de Wikimedia Commons, con su crédito abajo a la derecha: no quitarlo), y Estancia fija dice "Descuentos en estancias de un fin de semana al mes, de tu casa rural." (texto de David). Debajo de Contacto va el vídeo de YouTube `oVJ9ZQ8KDVk` (se pone en `js/config.js`, `videoPiso`). La franja "Descubre el piso" lleva la foto del salón. En Alrededores, la foto de la izquierda es la Rúa de San Miguel en el casco viejo y la de la derecha el Puente Romano desde el Paseo del Miño (las dos de Wikimedia Commons, con su crédito abajo a la derecha). El botón de abajo dice "Descubre el piso y sus alrededores" y lleva a `entorno.html`.
- [ ] **Fotos reales**: la galería ya tiene las 8 fotos del piso. El resto de `img/` son de relleno y llevan escrito qué foto va en cada sitio (portada, franjas, tipos de alojamiento, alrededores, piso, entorno, galería).
- [ ] **Reservas**: decidir con qué se reserva (Amenitiz, Booking, Airbnb, solo contacto) y poner el enlace en `urlReservas`. Si el motor usa otros nombres de parámetros para las fechas, se cambian en `main.js`, en el apartado "Buscador de fechas".
- [ ] **Formulario**: tal como está abre el correo del visitante. Para que envíe de verdad hay que dar de alta un servicio como Formspree, o hacer un backend propio, y poner la dirección en `urlFormulario` (y añadir ese servicio al punto 5 de la política de privacidad).
- [ ] **reCAPTCHA ("No soy un robot")**: ya está puesto en el formulario, pero con la clave de prueba de Google (sale un aviso rojo y deja pasar siempre). Para que proteja de verdad: dar de alta el dominio en google.com/recaptcha/admin (tipo "reCAPTCHA v2, casilla No soy un robot"), poner la *clave del sitio* en `recaptcha` de `config.js` y la *clave secreta* en el servicio de envío (Formspree o backend propio), que es quien comprueba la respuesta. Con el formulario abriendo el correo del visitante, la casilla solo es visual. Revisar con la asesoría si debe ir detrás del aviso de cookies.
- [ ] **Revisar los textos legales**: las tres páginas están hechas como plantilla general. Antes de publicar las tiene que revisar el titular o su asesoría (plazos de conservación, condiciones de reserva y cancelación, proveedores).
- [x] **Textos legales**: aviso legal, política de privacidad y política de cookies creados y enlazados desde el pie y desde el formulario.
- [x] **Cookies**: el mapa de Google y los vídeos de YouTube ya no se cargan hasta que el visitante acepta (aviso con Aceptar / Rechazar y "Configurar cookies" en el pie).
- [x] **Número de registro**: ya sale de `config.js` (campo `registro`). Solo falta escribirlo.

### 4.2 Páginas de rutas

- [ ] **Descargar las fotos**: ahora se cargan desde el servidor de imágenes de la web original (Cloudinary de Amenitiz) y dependen de que esa cuenta siga activa. Para tenerlas dentro del proyecto, ejecuta una vez `python descargar-fotos.py` desde esta carpeta: las baja a `img/rutas/` (48 fotos) y cambia los enlaces en los HTML.
- [ ] **Referencias a Ramiras**: los textos están copiados tal cual y hablan desde la casa rural. `escapadas.html` dice "alrededor de Ramiras" y "Ramiras a Ourense", y las distancias de `villas-y-ferias.html` están medidas desde allí. Hay que ajustarlo si el piso está en otro sitio.
- [x] **Enlaces a documentos de Google**: comprobado el 16/11/2026 que los 8 enlaces (6 documentos, la tabla de precios y la carpeta de Drive) responden sin pedir contraseña. Ojo: son los documentos de Casa Luisa (la tabla se titula "Tabla de precios quad Luisa Galleira 2024" y varios hablan de Ramiras).
- [x] En `rutas-en-playas-fluviales.html` la lista saltaba del 1 al 3: corregido a 1 y 2.
- [ ] **Pesca** (`pesca.html`): última opción de Rutas y último bloque de Entorno (foto `img/pesca/portadazonaentorno.jpeg`, botón "Descubrir"). Cada ruta de pesca lleva su título (enlace a su galería), una foto de la zona y el mapa del recorrido con "Abrir en Google Maps" y "Ver la ruta en Wikiloc". Las fotos de cada ruta van en su carpeta dentro de `img/pesca/`, con el nombre de la ruta. De momento hay una: **Untes - A Cuqueira**, que enlaza a `galeria-pesca-untes-a-cuqueira.html` con 6 fotos de su ruta en Wikiloc (cuenta de Nabor Díaz Rodríguez; Wikiloc solo deja verlas a 700 px de ancho), en `img/pesca/Untes - A Cuqueira/`. La foto de la página es `untes-03.jpg`. El mapa va de la salida a la llegada de la ruta en Wikiloc, a pie. La ruta tiene 8 fotos en Wikiloc: se quitaron las dos primeras (río con lluvia y la caña tapando el centro) para que la galería quede en 2 filas de 3.
  - Después van 5 rutas más, cada una con su galería (`galeria-pesca-*.html`) hecha con el contenido de su carpeta de `img/pesca/`. Las fotos de la galería son copias reducidas a 1600 px con nombre limpio (`cados-01.jpg`...); los originales siguen en la carpeta. Los vídeos se ven desde la propia web (etiqueta `<video>`, sin cookies) y salen directamente de la carpeta. Los mapas son el trayecto en coche desde la Rúa San Pedro.
    - **Bande: Río Cados** (carpeta `Ourense - Ramiras`): 6 fotos (una es un fotograma del vídeo 2) y 3 vídeos. Mapa a Cados, Bande.
    - **Campobecerros: Castrelo do Val**: 6 fotos (una es un fotograma de `campobecerros2.mp4`) y 3 vídeos. Mapa a Campobecerros, con un enlace más al río Camba (Laza), como pedía `info.txt`.
    - **Carballiño: Ponte Medieval da Veiga**: 3 fotos en la galería; la cuarta (`carballino-portada.jpg`) es la foto de la página de pesca. Mapa a Ponte Veiga, O Carballiño.
    - **Entrimo: Playa Fluvial Río Pacín**: 6 fotos (se quitó `rio pacin 5`, casi igual que la 2) y 2 vídeos. Mapa a la playa fluvial de Pacín (As Perdices).
    - **Olelas: Pocas de Malhom** (Pozas de Mallón): 6 fotos (`malhom1`, `2`, `5`, `6` y dos fotogramas de `malhomvideo1.mp4`) y 1 vídeo. Mapa a las Pozas de Mallón.
    - Las fotos y el vídeo repetidos entre las carpetas de Pacín y Malhom (`malhom3`, `malhom4` y `malhomvideo2.mp4`, iguales a `rio pacin 6`, `3` y `9`) solo salen en la galería de Río Pacín.
- [ ] **Senderismo y bicicleta** (`senderismo-y-bicicleta.html`; antes era `rutas-de-senderismo.html`, a la que llevaba el botón "Más rutas", y ahora su contenido es la propia página de senderismo y bicicleta. Las galerías vuelven aquí con "Volver a senderismo y bicicleta"). Contiene: 3 rutas (Conociendo Ramiras, Os Fabas y Valdueiro), cada una con 2 fotos de `img/rutas-senderismo/`. La primera foto es el mapa del documento de la ruta (captura de Google Maps, lleva su marca); la segunda, de su carpeta de Drive (Ramiras y Os Fabas) o de Wikiloc (Valdueiro). "Conociendo Ramiras" ya enlaza a su galería (`galeria-conociendo-ramiras.html`, 42 fotos de su carpeta de Drive (se quitaron las 4 de Casa Luisa a Galleira: ramiras-01, 09, 26 y 27, cuyos archivos ya no se usan) en `img/rutas-senderismo/conociendo-ramiras/`, cada una con el nombre del sitio debajo). "Os Fabas" enlaza a `galeria-os-fabas.html`: 2 fotos (`img/rutas-senderismo/os-fabas/`; la tercera de la carpeta, 20200719_121017.jpg, es la misma que 2.0 y no se puso) y sus 2 vídeos, que se ven desde Google Drive tras aceptar cookies (los archivos tienen que seguir compartidos con cualquiera que tenga el enlace). Después van "Porto Ramiras", "Peneda da Moura" y "Boutireira a Fragoso", cada una con 2 fotos (`porto-1/2`, `peneda-1/2`, `boutireira-1/2` en `img/rutas-senderismo/`; la 1 es el mapa de su documento, la 2 de su carpeta de Drive o, en Peneda da Moura, de Wikiloc). "Porto Ramiras" enlaza a `galeria-porto-ramiras.html`: vista cenital y 8 fotos de su ruta en Wikiloc (porto-02, 03 y 09 ya no se usan), 15 fotos de su carpeta de Drive (`img/rutas-senderismo/porto-ramiras/`) y 4 vídeos de Drive. "Peneda da Moura" enlaza a `galeria-peneda-da-moura.html`: vista cenital y 5 fotos de su ruta en Wikiloc (`img/rutas-senderismo/peneda-da-moura/`) más 12 fotos de su carpeta de Drive (peneda-11 a peneda-22; peneda-06, 08, 09 y 10 ya no se usan). "Boutireira a Fragoso" enlaza a `galeria-boutireira-a-fragoso.html`: las 12 fotos de su carpeta de Drive (`img/rutas-senderismo/boutireira-fragoso/`) y sus 2 vídeos de Drive. Las 6 rutas ya tienen galería. Al final va "Castros Trelle-Trellerma" (ruta en bici), sin galería: título sin enlace, un vídeo de Drive y una foto (`img/rutas-senderismo/castros-trelle.jpg`). Debajo, como en senderismo y bicicleta, el botón "Más rutas" con la foto grande al lado (el botón abre una carpeta de Google Drive en otra pestaña) (sus títulos llevan `#`, con un comentario `PENDIENTE` encima). "Valdueiro" enlaza a `galeria-valdueiro.html`: las 5 fotos de la ruta en Wikiloc y una sexta, la vista cenital con el recorrido sacada del mapa de esa ruta en Wikiloc, para completar las dos filas (la ortofoto es del PNOA, licencia CC-BY 4.0: por eso lleva el crédito "Ortofoto PNOA, scne.es" en el texto de la foto; no lo quites) (`img/rutas-senderismo/valdueiro/`). Las fotos de Wikiloc son de la cuenta de Nabor Díaz Rodríguez.
- [ ] **Ruta náutica** (`ruta-nautica-castrelo.html`): el botón "Más información" de `rutas-nauticas.html` lleva aquí. Título "Ruta Náutica en “Encoro de Castrelo de Miño”", mapa de Google Maps (vista satélite, recorrido desde el embalse; se carga tras aceptar cookies, con un enlace debajo para abrirlo en Google Maps), 6 fotos de la carpeta de Drive de la ruta (`img/rutas-nauticas/castrelo/`; castrelo-02, 05, 08 y 10 ya no se usan) y 15 vídeos de Drive (los de "2-Ruta Nautica: PIRAGUISMO" y los 5 de "1-ECO BARCO"). Para quitar una foto o un vídeo, borra su línea. Si el último vídeo queda solo en su fila, ocupa el ancho de dos.
- [ ] **Rutas en catamarán** (`rutas-en-catamaran.html`): tiene ahora lo que antes era `rutas-en-catamaran-mapas.html` (esa página solo redirige aquí y se puede borrar). Ya no está la lista con las distancias ni el carrusel de 4 fotos de antes. 5 rutas, cada una con su título, una foto y, debajo, un mapa de Google Maps más pequeño que el de la ruta náutica (se carga tras aceptar cookies) con un enlace "Abrir en Google Maps". Al final, el vídeo de YouTube de las rutas en catamarán. Fotos en `img/rutas-catamaran/` (sil, belesar, arnoya, laias y cortegada, sacadas de Drive; la de Arnoya es pequeña, 640 × 480, porque así está en Drive). Solo las dos primeras rutas tienen galería: "Ribeira Sacra y Cañon do Rio Sil" → `galeria-catamaran-ribeira-sacra.html` (6 fotos en `img/rutas-catamaran/ribeira-sacra/`, la última es el mapa de Wikiloc de Nabor Díaz, y 11 vídeos de Drive) y "Belesar-Chantada-Lugo" → `galeria-catamaran-belesar.html` (3 fotos en `img/rutas-catamaran/belesar/`; belesar-03 y 05 ya no se usan; 2 vídeos de Facebook uno al lado del otro y el vídeo de Drive debajo a doble ancho). Las dos galerías vuelven con "Volver a rutas en catamarán". En la carpeta de Ribeira Sacra no se pusieron las fotos repetidas (las de noviembre son copias de las de octubre), un vídeo repetido (VID_20241026_160814) ni una foto movida (1730029020574.jpg). Las otras tres rutas no tienen galería: su título no lleva enlace.
- [ ] **Playas fluviales** (`playas-fluviales-mapas.html`): el botón "Saber más" de `rutas-en-playas-fluviales.html` lleva aquí (antes abría un Google Doc). Están los 13 títulos (primero A Pontenova, Pozo Caído y Mallón), cada uno con su foto principal debajo; cada uno lleva a su página con la foto (`img/playas-fluviales/`), el mapa (Google Maps; en Pozas de Mallón, el de Wikiloc; se cargan tras aceptar cookies) y debajo los enlaces "Abrir en Google Maps" y "Más información y foto" a la web de donde salió la foto. OJO: casi todas las fotos son de otras webs (galiciamaxica.eu, surbia.es, descubrecadadia.com, paxinasgalegas.es, metropolitano.gal; varias llevan su marca de agua) y la de A Pontenova es de un usuario de Google Maps; antes de publicar conviene pedir permiso o cambiarlas por fotos propias. La ubicación de cada mapa se buscó por el nombre en Google Maps (Fírbeda, Pozo da Seima y Portela do Homem salen del mapa que enlaza su web): conviene revisarlas. En `rutas-en-playas-fluviales.html`, junto a la foto, sale la lista de las 13 (sin enlaces, en dos columnas que acaban a la misma altura) y el botón "Saber más". La página de A Pontenova tiene además, debajo del mapa, una galería con 12 fotos (`img/playas-fluviales/pontenova/`; la 12 es de galiciamaxica.eu) y 5 vídeos de su carpeta de Drive.
- [ ] **Villas y ferias** (`villas-y-ferias-mas.html`): el botón "Ver más" de `villas-y-ferias.html` lleva aquí (antes abría un Google Doc). 4 villas con 2 fotos cada una (como las rutas de senderismo). Ourense: Ponte Romano y As Burgas, y su título enlaza a `galeria-ourense.html` (9 fotos en `img/villas/ourense/`, en filas de 3: Puente Romano, As Burgas y feria del Campo da Feira; las 6 primeras de Wikimedia Commons y las 3 de la feria sin licencia libre: La Región, Turismo de Ourense y Wanderboat, con su crédito en el pie); Celanova: fachada del monasterio y mercado navideño en el claustro. Las cuatro son de Wikimedia Commons (`img/villas/`) y llevan debajo el crédito que pide su licencia: no quitarlo. Allariz enlaza a `galeria-allariz.html` (20 fotos de su carpeta de Drive en `img/villas/allariz/` y la 21 de Wikimedia Commons, con su crédito en el pie; las principales son la 14 y la 18) y Ribadavia a `galeria-ribadavia.html` (14 fotos de su carpeta de Drive, la foto de Navidad de El Correo Gallego en Facebook y el vídeo de Drive; principales la 6 y la 13). Después van Cartelle, Villavidal y Barral: Castrelo de Miño. Fotos principales de las 3 últimas: Cartelle (santuario das Marabillas, Commons, y la feria de Cartelle de mercadillos.org), Villavidal (vista del pueblo, Commons, y un puesto de una feria de Ourense, Commons, porque no hay fotos libres de la feria de Vilavidal) y Barral (Barral desde el otro lado del embalse y pulpeiras de Ribadavia, ambas de Commons). Cada villa lleva su crédito debajo. **Ojo:** la foto `cartelle-feira.jpg` es de mercadillos.org (sin licencia libre, parece una captura de Street View); lo seguro es cambiarla por una foto propia o pedir permiso. En `villas-y-ferias.html`, encima de "Ver más", sale la lista de las 7 (solo el título, sin enlaces). Si algún día hace falta una ruta en Maps, que salga desde San Pedro, no desde Ramirás. Los enlaces "Ver … en Google Maps" de debajo de las fotos tampoco llevan punto de partida. En `villas-y-ferias-mas.html` solo los títulos de Ourense, Allariz y Ribadavia son enlace; Celanova, Cartelle, Villavidal y Barral son texto. PENDIENTE: galería de Ourense (su título enlaza a `#`).
- [ ] **Rutas en coche de 1 día** (`rutas-en-coche.html`): el botón "Ver más" de la primera sección de `escapadas.html` lleva aquí (antes abría un Google Doc). 7 rutas, cada una con su título (solo texto), una caja "Foto (próximamente)" y debajo el mapa de la ruta con el enlace "Abrir en Google Maps". Castrelo por Allariz, Rías Baixas e Isla da Toxa-Combarro usan los enlaces tal cual los pasó David. Los de Islas Cíes y Bayona, A Guarda, Cangas-Bueu-Aguete e Illa de Arousa-Pazo Baión pasaban por Casa Luisa (Ramirás); se ha cambiado ese punto por Rúa San Pedro (Ourense) como salida. Cinco títulos enlazan a su galería (fotos en `img/escapadas/<ruta>/`, sacadas de las carpetas de Drive de David): `galeria-coche-islas-cies.html` (12 fotos y 3 vídeos; principal: la cala de las Cíes), `galeria-coche-a-guarda.html` (11 fotos, sin la 10, la 12 ni la copia de la 1; principal la 2), `galeria-coche-cangas.html` (9 fotos, sin la segunda de la carpeta, "1-Cangas Cabo D,home"; principal la 7), `galeria-coche-arousa.html` (fotos 6, 7 y 8 y vídeos 1, 5 y 9, sin la foto 3 ni el vídeo 2; la principal es un fotograma del vídeo 5) y `galeria-coche-toxa-combarro.html` (12 fotos, sin la 13 ni la última, que es la misma foto que la 11; principal la 9). Castrelo por Allariz y Rías Baixas no tienen galería (su título es solo texto); su foto principal es de Wikimedia Commons (`img/escapadas/castrelo-allariz.jpg`, el embalse de Castrelo, y `img/escapadas/rias-baixas.jpg`, la playa de Rodas en las Cíes) y lleva debajo el crédito que pide la licencia: no quitarlo. La página está dividida en "Rutas Galicia" (las 7 anteriores) y "Rutas Portugal": Valença do Minho, Ruta por o Xeres y Chaves y Vidago, con foto, mapa y "Abrir en Google Maps" saliendo desde Rúa San Pedro (los enlaces que pasó David salían de Ramirás). Solo Ruta por o Xeres tiene galería (`galeria-coche-xeres.html`, los 10 vídeos de su carpeta de Drive, que no tiene fotos; su foto principal es un fotograma de uno de esos vídeos). Las de Valença (`img/escapadas/valenca.jpg`) y Chaves (`img/escapadas/chaves.jpg`) son de Wikimedia Commons, con su crédito debajo. Quitadas después a petición de David: la foto de la comida junto al mar de Arousa y la de las terrazas junto a los hórreos de Combarro.
- [ ] **Viajes de 2 días** (`viajes-2-dias.html`): el segundo "Ver más" de `escapadas.html` lleva aquí (antes abría un Google Doc) y la lista de esa sección incluye ya "3. Cacabelos (Ponferrada)". Tres viajes con foto y mapa saliendo desde Rúa San Pedro (los enlaces de David salían de Ramirás): Costa da Morte (San Pedro, Fisterra, Muros), Costa Cantábrica de Lugo (San Pedro, Ribadeo, Castropol) y Cacabelos (San Pedro, O Barco, Cacabelos). Fotos en `img/viajes/`: las de Costa da Morte (Virxe da Barca, Muxía) y la costa de Lugo (As Catedrais) son de turismo.gal, la web de Turismo de Galicia, no tienen licencia libre: lo seguro es pedir permiso o cambiarlas por fotos propias. La de Cacabelos es de la carpeta de Drive de David. Cada título enlaza a su galería (fotos en `img/viajes/<viaje>/`): `galeria-viaje-costa-da-morte.html` (14 fotos y 17 vídeos de la carpeta de Drive y 4 fotos de turismo.gal), `galeria-viaje-costa-cantabrica.html` (4 fotos y 3 vídeos de Drive, la de As Catedrais de turismo.gal y una de Castropol de Wikimedia Commons, de carlos corzo con licencia CC BY-SA 3.0, `castropol.jpg`) y `galeria-viaje-cacabelos.html` (las 6 fotos de su carpeta). Las fotos de turismo.gal empiezan por `tg-` y llevan "(foto: turismo.gal)" en el pie. El enlace de "rías altas" de turismo.gal que pasó David da "página no encontrada"; la foto de As Catedrais sale de la página de la Mariña Lucense.
- [ ] **Cómo llegar** (`como-llegar.html`): rellenado. Tiempos de tren del AVE/Avant más rápido (omio, trenes.com, Rail Monsters) y tiempos en coche de Google Maps desde Rúa San Pedro 1 (el de Santiago es por la AP-53, de peaje). Alquiler de coche y taxis con los datos que dio David. El bus urbano (Avanza, red nueva desde septiembre de 2025, que el Concello sigue cambiando): parada Alameda, en la Rúa do Progreso junto a Correos, líneas 1, 2, 3, 4, 7, 8, 10, 11 y 16 y búhos 14A y 14B (según la lista de La Región de la red de 2025); conviene revisarlo de vez en cuando. La franja de abajo es una foto de la catedral (`img/franja-catedral.jpg`) de Wikimedia Commons, de Eladio Anxo Fernández Manso (Rozavales), licencia CC BY 2.0: el crédito tiene que verse.
- [ ] **Entorno**: ahora son tres páginas separadas: `que-ver.html` (en blanco de momento), `donde-comer.html` y `termas.html`. En el menú, "Entorno" lleva a `entorno.html` y además tiene el desplegable (Qué ver, Dónde comer, Termas). Dónde comer y Termas copian la web de Casa Luisa: mismos textos, fotos (enlazadas desde Cloudinary, como las demás páginas copiadas), vídeo de YouTube y botones "Más restaurantes" (carpeta de Google Drive) y "Ver más", que lleva a `termas-mas.html`: las 7 termas, cada una con su foto y su mapa. Solo Outariz tiene galería (`galeria-termas-outariz.html`, 8 fotos de la carpeta de Drive y una de Wikimedia Commons, `ou-09.jpg`, de José Antonio Gil Martínez con licencia CC BY 2.0, en `img/termas/outariz/`); el resto de títulos van sin enlace. Fotos principales en `img/termas/`: la de Outariz es de Drive; Prexigueiro, Cortegada, Baños de Molgas, Arnoia y Laias son de Wikimedia Commons con licencia libre (CC BY-SA, el crédito tiene que verse); la de Río Caldo es de turismo.gal y no tiene licencia libre: lo seguro es pedir permiso o cambiarla. Outariz, Prexigueiros, Cortegada y Baños de Molgas: mapa del sitio, sin punto de partida, como en los enlaces de David. Arnoia, Laias y Río Caldo: los enlaces de David salían de Ramirás, así que salen desde Rúa San Pedro.  Los restaurantes son los de Casa Luisa, de la zona de Ramirás, Allariz y Ribadavia: conviene cambiarlos por sitios cerca del piso. El botón "Descubre [ciudad] y sus alrededores" de la portada lleva a `que-ver.html`.
- [ ] **Página Entorno** (`entorno.html`): copia de la de Casa Luisa, "Alrededores del piso", con lo de Casa Luisa cambiado por el piso de San Pedro. Nueve filas de foto y botón "Descubrir" que llevan a nuestras páginas: Dónde comer, Senderismo y bicicleta, Rutas a caballo, Rutas en quad (nasepi.com, en otra pestaña), Rutas náuticas y rafting, Playas fluviales, Termas, Villas y ferias y Escapadas. La foto de Dónde comer es la del bar Acio (`img/restaurantes/centro/acio.jpg`); las demás son las de Casa Luisa, desde Cloudinary.
- [ ] **Qué ver** (`que-ver.html`): dos zonas como las de Dónde comer (dos fotos y tarjeta en el medio). "Lugares a visitar cerca del piso" (Plaza Mayor de spain.info, sin licencia libre, y Catedral de Commons) y "Turismo en Ourense" (Puente Romano y Paseo del Miño, de Commons). Fotos en `img/que-ver/`; los créditos de Commons van debajo, tienen que verse. El "Ver más" de cerca del piso lleva a `que-ver-cerca.html`; el de Turismo en Ourense lleva a `que-ver-turismo.html`.
- [ ] **Lugares a visitar cerca del piso** (`que-ver-cerca.html`): 10 sitios con las fotos y ubicaciones que pasó David (en `img/que-ver/cerca/`, cada una con su crédito debajo). El enlace de Maps que pasó para la Alameda llevaba a la Praza do Concello de Pereiro de Aguiar, así que la Alameda usa el Parque da Alameda de Ourense. La foto de la Praza dos Suaves (Facebook) es pequeña. Sin licencia libre: Praza Maior (spain.info), Praza dos Suaves (Facebook), Santa Eufemia (viajandoconpio.com) y Alameda (ourenseturismo.com).
- [ ] **Turismo en Ourense** (`que-ver-turismo.html`): 10 sitios (títulos de David) con foto y mapa. Fotos en `img/que-ver/turismo/`, con su crédito debajo. De Wikimedia Commons: Claustro de San Francisco, Puente del Milenio, Outariz y Canedo, A Chavasqueira, San Lázaro y Santomé. Sin licencia libre (turismo.ourense.gal, del Concello): Muíño da Veiga, Montealegre, Posío y Paseo Termal; conviene pedir permiso o cambiarlas antes de publicar.
- [ ] **Restaurantes** (`restaurantes.html`): los dos botones "Más restaurantes" (de menú y de precio especial) llevan aquí. Salían de la carpeta de Drive "0-RESTAURANTES cerca de RAMIRAS" (26); David quitó Casa Ana, O Saltón, San Jaime, O Castillo y O Adán y puso primero Tizar, O Muiñeiro, Oira Praia, Os Caracoles y Plaza, con el Balneario de Cortegada de sexto (quedan 21, sin enlace). En `donde-comer.html`, la zona de menú nombra los tres primeros y la de precio especial Os Caracoles, Plaza y el Balneario de Cortegada. Foto principal en `img/restaurantes/`: 14 de las carpetas de Drive y 5 que pasó David (Start 83 de Street View, Casa Ana de una captura, O Amieiral de Tripadvisor, O Muiñeiro de su web y Oira Praia de Páxinas Galegas, que lleva su marca de agua; ninguna tiene licencia libre). Tizar, Outarelo y A Taberna (Páxinas Galegas, con marca de agua), A Feira (Tripadvisor), Asador Roa (conmuchagula.com) y San Jaime (acasadacarminha.es, es el restaurante Miguel González de Castadón) buscadas por internet, sin licencia libre. O Adán: foto de Street View que pasó David. Ya tienen foto los 26. Mapas: todos marcan el sitio, sin punto de partida (los enlaces de los Word salían de Ramirás). Ubicaciones sacadas de los enlaces de los Word cuando los había y, si no, buscando el nombre en Google Maps: O Muiño (Celanova) y O Castillo (Maceda, por el teléfono sale el Castelo de Maceda) conviene confirmarlos. O Saltón (Piñor) marca la calle del enlace del Word, no el restaurante exacto.
- [ ] **Restaurantes centro Ourense**: zona nueva en `donde-comer.html` (encima de los de menú) con fotos de Fuentefría y Demamáluis; su botón lleva a `restaurantes-centro.html`, con 10 restaurantes de la zona de vinos, foto de fachada (en `img/restaurantes/centro/`, de Guía Repsol, Páxinas Galegas, Tripadvisor, restaurantesourense.es, orellas.com, fbgcdn y gastrorank; ninguna con licencia libre) y mapa del sitio. Los horarios no se ponen porque cambian.

### 4.3 Mejoras recomendables

- [ ] **Logo**: está hecho con texto. Si el piso tiene logo en imagen, se sustituye en `main.js` (constante `logo`).
- [x] **Favicon**: `img/favicon.svg` (una casa blanca sobre el azul de la web), enlazado en todas las páginas. Si hay logo, se cambia ese archivo.
- [ ] **Imagen para compartir en redes**: las etiquetas Open Graph de título y descripción ya están en todas las páginas. Faltan `og:url` y `og:image`, que necesitan el dominio y una foto real (hay un comentario `PENDIENTE` en el `<head>` de cada página con el ejemplo).
- [ ] **Optimizar las fotos**: pasarlas a JPG o WebP con un ancho máximo de unos 1920 px (portada y franjas) y 1200 px (el resto).
- [ ] **SEO**: `robots.txt` y `sitemap.xml` están creados con `TU-DOMINIO` como dirección: hay que cambiarlo por el dominio real y dar de alta la web en Google Search Console.
- [x] **Cabecera sin JavaScript**: cada página lleva un menú básico en `<noscript>` y el contenido ya no se queda invisible sin JavaScript (antes la animación de entrada lo ocultaba).
- [ ] **Tipografías en el propio servidor**: ahora se cargan desde Google Fonts, que recibe la IP del visitante (está avisado en la política de cookies). Lo más limpio es descargar Lato, Inter y Poiret One a `fonts/` y cargarlas con `@font-face`, como Existence Light.
- [ ] **Idiomas**: la web está solo en español.
- [ ] **Publicación**: al ser archivos estáticos sirve cualquier hosting. Falta contratar dominio y hosting y activar HTTPS.

### 4.4 Comprobado y por comprobar

Probado el 16/11/2026 en Chrome, a 1366 px y a 390 px de ancho, con las imágenes de relleno y sin conexión a internet. Con el nombre definitivo se repasaron además las 17 páginas a 13 anchos, de 320 a 1920 px, buscando desbordes y solapes en la cabecera:

- [x] El aspecto de las 17 páginas, incluidas `como-llegar.html`, `entorno.html`, `galeria.html` y `contacto.html`. Ninguna se desborda en horizontal ni da errores de JavaScript.
- [x] Los clics: menú móvil, desplegables, carrusel (flechas, puntos y paso automático), fotos ampliables (ratón y teclado), tiras de fotos y buscador de fechas (con y sin `urlReservas`).
- [x] El formulario sin `urlFormulario` (prepara el correo y muestra el aviso).
- [x] El aviso de cookies: aceptar, rechazar, "Ver mapa", "Ver vídeo" y "Configurar cookies".
- [x] `descargar-fotos.py`: el cambio de enlaces, con la descarga simulada (53 enlaces, 48 fotos distintas).

Se corrigieron dos fallos encontrados en la prueba: en el móvil, el mapa de `contacto.html` dejaba un hueco gris debajo de la tarjeta; y la fecha mínima de salida del buscador podía quedar un día corta para visitantes con hora de América.

Queda por probar, porque necesita conexión o datos reales:

- [ ] Que cargan de verdad el mapa de Google y los vídeos de YouTube al aceptar.
- [ ] Que cargan las fotos de las páginas de rutas, y la descarga real con `descargar-fotos.py`.
- [ ] El envío del formulario, una vez configurado `urlFormulario`.
- [ ] La tipografía Poiret One (sin conexión se ve la de reserva).
