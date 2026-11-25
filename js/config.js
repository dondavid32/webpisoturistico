/* ==========================================================================
   DATOS DEL PISO — cambia aquí y se actualiza en todas las páginas
   (cabecera, pie, mapa, WhatsApp, botones de reserva y formulario).
   ========================================================================== */
const SITIO = {
  nombre: "Apartamento Nabrarir",     // línea grande del logo (se ve en mayúsculas)
  subtitulo: "",                      // línea pequeña del logo, debajo del nombre. Vacío = no aparece
  direccion1: "Rúa San Pedro 1, 2º",
  direccion2: "32005 Ourense",
  telefono: "+34 669 04 66 49",       // teléfono principal: pie, botones "Llámanos" y textos legales
  email: "nabor@ecografia.eu",        // e-mail principal: pie, formulario y textos legales

  // Todos los teléfonos y e-mails, en el orden en que salen en la página de contacto (uno por línea)
  telefonos: ["+34 669 04 66 49", "+34 604 24 96 66", "+34 675 63 12 75", "+34 609 83 00 50"],
  emails: ["cristina.vacacionalourense@gmail.com", "nasepi@nasepi.com", "gutierrezcabreradiana@gmail.com", "nabor@ecografia.eu"],
  whatsapp: "",                       // solo números con prefijo, p. ej. "34600000000". Vacío = sin botón

  // Número de registro de la vivienda de uso turístico (p. ej. "VUT-OR-000000").
  // Sale en el pie, en las normas de "El piso" y en el aviso legal. Vacío = no se muestra.
  registro: "",

  // Titular de la web: salen en el aviso legal y en la política de privacidad.
  titular: "[Nombre y apellidos o razón social del titular]",
  nif: "[NIF / CIF]",

  // Enlace del motor de reservas (Amenitiz, Booking, Airbnb...).
  // Vacío = los botones "Reservar" y "Buscar" llevan a la página de contacto.
  urlReservas: "",

  // Texto que busca Google Maps (dirección completa o nombre del alojamiento)
  mapa: "Rúa San Pedro 1, 32005 Ourense",     // lo que busca Google Maps: sin el piso, para que encuentre el portal

  // Vídeos de YouTube (solo el ID, lo que va después de "v="). Vacío = se ve la foto.
  videoPortada: "6bYc_XwLxQg",                // vídeo de fondo en la portada
  videoPiso: "oVJ9ZQ8KDVk",                      // vídeo de la sección central de la home

  // Redes sociales: enlace de cada perfil. Vacío = no se muestra el icono.
  // PENDIENTE: Instagram y Facebook llevan "#" (no van a ningún sitio) hasta tener los perfiles.
  instagram: "#",
  facebook: "#",
  youtube: "https://www.youtube.com/@ApartamentosNabrarir",

  // Envío del formulario de contacto: URL de un servicio tipo Formspree
  // (https://formspree.io/f/xxxx) o de tu propio backend. Vacío = abre el
  // programa de correo del visitante con el mensaje ya escrito.
  urlFormulario: "",

  // Casilla "No soy un robot" (Google reCAPTCHA v2) del formulario de contacto.
  // Esta es la CLAVE DE PRUEBA de Google: siempre deja pasar y muestra un aviso rojo.
  // Antes de publicar, cambiarla por la "clave del sitio" propia (google.com/recaptcha/admin).
  // Vacío = no aparece la casilla.
  recaptcha: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",

  // Menú principal. "hijos" crea un desplegable; sin "url" el elemento solo abre el desplegable.
  // Si "url" empieza por http (otra web), el enlace se abre en una pestaña nueva.
  menu: [
    { texto: "El piso", url: "el-piso.html" },
    { texto: "Cómo llegar", url: "como-llegar.html" },
    { texto: "Entorno", url: "entorno.html", hijos: [
      { texto: "Qué ver", url: "que-ver.html" },
      { texto: "Dónde comer", url: "donde-comer.html" },
      { texto: "Termas", url: "termas.html" }
    ] },
    { texto: "Rutas", hijos: [
      { texto: "Rutas en quad", url: "https://www.nasepi.com/" },   // web externa de quads: se abre en otra pestaña
      { texto: "Senderismo y bicicleta", url: "senderismo-y-bicicleta.html" },
      { texto: "Rutas a caballo", url: "rutas-a-caballo.html" },
      { texto: "Rutas náuticas y rafting", url: "rutas-nauticas.html" },
      { texto: "Rutas en catamarán", url: "rutas-en-catamaran.html" },
      { texto: "Rutas en playas fluviales", url: "rutas-en-playas-fluviales.html" },
      { texto: "Villas y ferias", url: "villas-y-ferias.html" },
      { texto: "Escapadas", url: "escapadas.html" }
    ] },
    { texto: "Galería", url: "galeria.html" },
    { texto: "Contacto", url: "contacto.html" }
  ]
};
