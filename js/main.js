/* Cabecera, pie y comportamiento común a todas las páginas. */
(function () {
  const S = SITIO;
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const urlReserva = S.urlReservas || "contacto.html";
  const destinoReserva = S.urlReservas ? ' target="_blank" rel="noopener"' : "";
  const paginaActual = location.pathname.split("/").pop() || "index.html";

  /* ---------- Cabecera ---------- */
  const logo = `<a class="logo" href="index.html" aria-label="${esc(S.nombre)} - inicio">
      <span class="logo__nombre">${esc(S.nombre)}</span>${S.subtitulo ? `<span class="logo__sub">${esc(S.subtitulo)}</span>` : ""}</a>`;

  // Enlace del menú: las direcciones a otras webs (http...) se abren en una pestaña nueva
  // Sin "url" (p. ej. "Pesca" mientras no tenga página) sale como texto, sin enlace
  const enlace = (m, extra = "") => !m.url ? `<span class="sin-enlace"${extra}>${esc(m.texto)}</span>` : `<a href="${m.url}"${/^https?:/.test(m.url) ? ' target="_blank" rel="noopener"' : ""}${extra}>${esc(m.texto)}</a>`;

  // Apartado del menú que se marca en color. Si la página está en dos apartados (Termas: Entorno y Rutas),
  // manda el enlace con el que se llegó: "termas.html?desde=rutas" marca Rutas; "termas.html" marca Entorno
  const sinConsulta = (u) => (u || "").split(/[?#]/)[0];
  const esActual = (h) => sinConsulta(h.url) === paginaActual;
  const padres = S.menu.filter((m) => esActual(m) || (m.hijos || []).some(esActual));
  const marcado = padres.length < 2 ? padres[0]
    : padres.find((m) => (m.hijos || []).some((h) => esActual(h) && location.search && h.url.endsWith(location.search)))
      || padres.find((m) => (m.hijos || []).some((h) => esActual(h) && !h.url.includes("?")))
      || padres[0];

  const menu = `<ul class="menu">${S.menu.map((m) => {
    const hijos = m.hijos || [];
    const activo = m === marcado ? ' class="activo"' : "";
    const sub = hijos.length ? `<ul class="submenu">${hijos.map((h) => `<li>${enlace(h)}</li>`).join("")}</ul>` : "";
    // Sin "url" el elemento solo abre su desplegable (como "Rutas")
    const titulo = m.url ? enlace(m, activo) : `<span${activo} tabindex="0">${esc(m.texto)}</span>`;
    return `<li>${titulo}${sub}</li>`;
  }).join("")}</ul>`;

  const cabecera = document.getElementById("cabecera");
  if (cabecera) {
    cabecera.innerHTML = `
    <nav class="nav" aria-label="Principal">
      <a class="nav__movil nav__movil--reserva" href="${urlReserva}"${destinoReserva} aria-label="Reservar">
        <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4M7 14h2M11 14h2M15 14h2M7 17h2M11 17h2"/></svg>
      </a>
      ${logo}
      <div class="nav__derecha">
        <a class="btn" href="${urlReserva}"${destinoReserva}>Reservar</a>
        ${menu}
      </div>
      <div class="nav__movil">
        <button class="hamburguesa" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
      </div>
    </nav>
    <div class="menu-movil">${menu}<a class="btn" href="${urlReserva}"${destinoReserva}>Reservar</a></div>`;

    const boton = cabecera.querySelector(".hamburguesa");
    boton.addEventListener("click", () => {
      const abierto = document.body.classList.toggle("menu-abierto");
      boton.setAttribute("aria-expanded", abierto);
    });
    cabecera.querySelectorAll(".menu-movil a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("menu-abierto")));
  }

  /* ---------- Pie ---------- */
  // Iconos de redes a color, como en la web original (cada uno con su color de marca)
  const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const iconos = {
    instagram: svg(`<defs><linearGradient id="ig-degradado" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="#feda75"/><stop offset=".35" stop-color="#fa7e1e"/><stop offset=".6" stop-color="#d62976"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs>
      <g fill="none" stroke="url(#ig-degradado)" stroke-width="2.2"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.3"/></g>
      <circle cx="17.4" cy="6.6" r="1.3" fill="url(#ig-degradado)"/>`),
    // Facebook y YouTube con la "f" y el triángulo recortados (se ve el fondo a través)
    facebook: svg('<path fill="#3b5998" fill-rule="evenodd" d="M4.5 2h15A2.5 2.5 0 0 1 22 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-15A2.5 2.5 0 0 1 4.5 2z M15.7 22v-7.7h2.6l.4-3h-3V9.4c0-.9.3-1.5 1.5-1.5h1.6V5.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.3H10v3h2.6V22z"/>'),
    youtube: svg('<path fill="#e52d27" fill-rule="evenodd" d="M6 4.5h12a4.5 4.5 0 0 1 4.5 4.5v6a4.5 4.5 0 0 1-4.5 4.5H6A4.5 4.5 0 0 1 1.5 15V9A4.5 4.5 0 0 1 6 4.5z M10 8.7v6.6l5.7-3.3z"/>')
  };
  const nombresRedes = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube" };
  const redes = ["instagram", "facebook", "youtube"].filter((r) => S[r])
    .map((r) => `<a href="${S[r]}" target="_blank" rel="noopener" aria-label="${nombresRedes[r]}" title="${nombresRedes[r]}">${iconos[r]}</a>`).join("");

  const pie = document.getElementById("pie");
  if (pie) {
    pie.innerHTML = `
    <footer class="pie">
      <div class="pie__dentro">
        <div class="pie__col">
          <p><strong>${esc(S.nombre)}</strong></p>
          <p>${esc(S.direccion1)}</p>
          <p>${esc(S.direccion2)}</p>
          <p>Teléfono: <a href="tel:${S.telefono.replace(/\s/g, "")}" style="display:inline">${esc(S.telefono)}</a></p>
          <a href="mailto:${S.email}">${esc(S.email)}</a>
          ${S.registro ? `<p>N.º de registro: ${esc(S.registro)}</p>` : ""}
        </div>
        <div class="pie__col pie__centro">
          ${logo}
          <div class="pie__redes">${redes}</div>
          <p class="pie__copy">© ${new Date().getFullYear()} ${esc(S.footerCreditos)}</p>
        </div>
        <div class="pie__col pie__dcha">
          <p><strong>Menú</strong></p>
          ${S.menu.filter((m) => m.url || (m.hijos && m.hijos.length)).map((m) => (m.url ? m : m.hijos[0])).map((m) => enlace(m)).join("")}
        </div>
      </div>
      <p class="pie__legal">
        <a href="aviso-legal.html">Aviso legal</a>
        <a href="terminos-condiciones.html">Términos y condiciones</a>
        <a href="politica-privacidad.html">Política de privacidad</a>
        <a href="politica-cookies.html">Política de cookies</a>
        <a href="#" data-cookies>Configurar cookies</a>
      </p>
    </footer>
    ${S.whatsapp ? `<a class="whatsapp" href="https://wa.me/${S.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.500 20.500l1.300-4.300A8.500 8.500 0 1 1 8 19.400z"/><path d="M9 8.500c0 3.500 3 6.500 6.500 6.500l1-1.500-2-1-1 .8c-1-.5-1.800-1.300-2.300-2.300l.8-1-1-2z" fill="#fff" stroke="none"/></svg></a>` : ""}`;
  }

  /* ---------- Textos y enlaces que salen de config.js ---------- */
  document.querySelectorAll("[data-sitio]").forEach((el) => { el.textContent = S[el.dataset.sitio] || ""; });
  document.querySelectorAll("[data-reserva]").forEach((a) => {
    a.href = urlReserva;
    if (S.urlReservas) { a.target = "_blank"; a.rel = "noopener"; }
  });
  document.querySelectorAll("[data-tel]").forEach((a) => { a.href = "tel:" + S.telefono.replace(/\s/g, ""); });

  // Listas de teléfonos y e-mails de la página de contacto, uno por línea y pulsables
  const lista = (datos, enlace) => (datos || []).map((d) => `<a href="${enlace(d)}">${esc(d)}</a>`).join("<br>");
  document.querySelectorAll("[data-telefonos]").forEach((el) => { el.innerHTML = lista(S.telefonos || [S.telefono], (t) => "tel:" + t.replace(/\s/g, "")); });
  document.querySelectorAll("[data-emails]").forEach((el) => { el.innerHTML = lista(S.emails || [S.email], (e) => "mailto:" + e); });
  document.querySelectorAll("[data-mapa-ruta]").forEach((a) => {
    a.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(S.mapa);
    a.target = "_blank"; a.rel = "noopener";
  });
  // Número de registro: si está en config.js sustituye al texto de relleno
  document.querySelectorAll("[data-registro]").forEach((el) => {
    if (S.registro) el.textContent = "Número de registro de vivienda de uso turístico: " + S.registro;
  });

  /* ---------- Mapa, vídeos y aviso de cookies ----------
     Google Maps y YouTube son contenido de terceros que puede instalar cookies,
     así que no se cargan hasta que el visitante pulsa "Aceptar" en el aviso, o
     "Ver mapa" / "Ver vídeo" en el hueco que ocupa cada uno. La elección se guarda
     en el navegador (localStorage, clave "cookies": "si" o "no"). */
  const YOUTUBE = "https://www.youtube-nocookie.com/embed/";
  const eleccion = () => { try { return localStorage.getItem("cookies"); } catch (e) { return null; } };
  const terceros = []; // una función por cada mapa o vídeo pendiente de cargar
  const pendiente = (cargar) => {
    let hecho = false;
    const una = () => { if (!hecho) { hecho = true; cargar(); } };
    terceros.push(una);
    return una;
  };
  // Hueco con botón que ocupa el sitio del mapa o del vídeo mientras no se acepta
  const hueco = (caja, texto, boton, cargar) => {
    const h = document.createElement("div");
    h.className = "bloqueado";
    h.innerHTML = `<p>${texto}</p><button class="btn" type="button">${boton}</button><a href="politica-cookies.html">Política de cookies</a>`;
    caja.prepend(h);
    h.querySelector("button").addEventListener("click", pendiente(() => { h.remove(); cargar(); }));
  };

  document.querySelectorAll("[data-mapa]").forEach((el) =>
    hueco(el, "El mapa se carga desde Google Maps.", "Ver mapa", () => el.insertAdjacentHTML("afterbegin",
      `<iframe title="Mapa" loading="lazy" src="https://maps.google.com/maps?q=${encodeURIComponent(S.mapa)}&z=15&output=embed"></iframe>`)));

  // Vídeo de fondo de la portada (si hay ID en config.js): sin aceptar se queda la foto
  const portada = document.querySelector("[data-video-portada]");
  if (portada && S.videoPortada) {
    const v = S.videoPortada;
    pendiente(() => portada.insertAdjacentHTML("afterbegin",
      `<iframe title="Vídeo de portada" allow="autoplay; encrypted-media" src="${YOUTUBE}${v}?autoplay=1&mute=1&loop=1&playlist=${v}&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1"></iframe>`));
  }
  // Vídeo central de la portada (si hay ID en config.js)
  const video = document.querySelector("[data-video-piso]");
  if (video && S.videoPiso) {
    hueco(video, "El vídeo se carga desde YouTube.", "Ver vídeo", () => {
      video.innerHTML = `<iframe title="Vídeo del piso" allowfullscreen src="${YOUTUBE}${S.videoPiso}?rel=0&modestbranding=1"></iframe>`;
    });
  }
  // Vídeos escritos en el HTML (páginas de rutas): llevan la dirección en data-src
  document.querySelectorAll("iframe[data-src]").forEach((f) => {
    f.hidden = true;
    const esWikiloc = f.dataset.src.includes("wikiloc.com");
    const esMapa = esWikiloc || f.dataset.src.includes("maps.google");
    hueco(f.parentElement, esMapa ? `El mapa se carga desde ${esWikiloc ? "Wikiloc" : "Google Maps"}.` : `El vídeo se carga desde ${f.dataset.src.includes("drive.google") ? "Google Drive" : f.dataset.src.includes("facebook.com") ? "Facebook" : "YouTube"}.`, esMapa ? "Ver mapa" : "Ver vídeo", () => { f.src = f.dataset.src; f.hidden = false; });
  });

  const avisoCookies = () => {
    if (document.querySelector(".cookies")) return;
    const antes = eleccion();
    const c = document.createElement("div");
    c.className = "cookies";
    c.setAttribute("role", "dialog");
    c.setAttribute("aria-label", "Aviso de cookies");
    const estado = antes === "si" ? " <strong>Ahora mismo los tienes aceptados.</strong>" : antes === "no" ? " <strong>Ahora mismo los tienes rechazados.</strong>" : "";
    c.innerHTML = `<p>Esta web no usa cookies propias. Los mapas y vídeos (Google Maps, YouTube, Google Drive, Facebook y Wikiloc) son contenidos de terceros que pueden instalar cookies: solo se cargan si los aceptas.${estado} <a href="politica-cookies.html">Más información</a></p>
      <div><button class="btn btn--borde" type="button" data-valor="no">Rechazar</button><button class="btn" type="button" data-valor="si">Aceptar</button></div>`;
    document.body.appendChild(c);
    c.addEventListener("click", (e) => {
      const valor = e.target.dataset.valor;
      if (!valor) return;
      try { localStorage.setItem("cookies", valor); } catch (err) { /* sin almacenamiento: vale solo para esta página */ }
      c.remove();
      if (valor === "si") terceros.forEach((f) => f());
      else if (antes === "si") location.reload(); // retira lo que ya estaba cargado
    });
  };
  if (eleccion() === "si") terceros.forEach((f) => f());
  else if (eleccion() !== "no") avisoCookies();
  // Enlace "Configurar cookies" del pie: vuelve a mostrar el aviso
  document.querySelectorAll("[data-cookies]").forEach((a) =>
    a.addEventListener("click", (e) => { e.preventDefault(); avisoCookies(); }));

  /* ---------- Buscador de fechas ---------- */
  const reserva = document.querySelector(".reserva");
  if (reserva) {
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const iso = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const entrada = reserva.querySelector("#entrada"), salida = reserva.querySelector("#salida");
    const hoy = new Date(), pasado = new Date(); pasado.setDate(hoy.getDate() + 2);
    entrada.value = iso(hoy); entrada.min = iso(hoy); salida.value = iso(pasado);
    const pinta = (input) => {
      const [, m, d] = input.value.split("-");
      input.parentElement.querySelector(".reserva__valor").innerHTML = `${+d} <small>/ ${meses[+m - 1]}</small>`;
    };
    const ajusta = () => {
      const min = new Date(entrada.value + "T00:00"); min.setDate(min.getDate() + 1);
      salida.min = iso(min);
      if (salida.value <= entrada.value) salida.value = iso(min);
      pinta(entrada); pinta(salida);
    };
    [entrada, salida].forEach((i) => {
      i.addEventListener("change", () => { if (i.value) ajusta(); });
      i.addEventListener("click", () => { try { i.showPicker(); } catch (e) { /* navegador sin showPicker */ } });
    });
    ajusta();
    reserva.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const adultos = reserva.querySelector("#adultos").value;
      if (S.urlReservas) {
        // Ajusta los nombres de los parámetros a los de tu motor de reservas
        const sep = S.urlReservas.includes("?") ? "&" : "?";
        window.open(`${S.urlReservas}${sep}checkin=${entrada.value}&checkout=${salida.value}&adults=${adultos}`, "_blank");
      } else {
        try { sessionStorage.setItem("consulta", JSON.stringify({ entrada: entrada.value, salida: salida.value, adultos })); } catch (e) { /* sin almacenamiento */ }
        location.href = "contacto.html";
      }
    });
  }

  /* ---------- Carrusel de la ficha ---------- */
  document.querySelectorAll(".carrusel").forEach((c) => {
    const fotos = [...c.querySelectorAll("img")];
    if (fotos.length < 2) { fotos[0] && fotos[0].classList.add("visible"); return; }
    const puntos = document.createElement("div"); puntos.className = "carrusel__puntos";
    let actual = 0, temporizador;
    const ir = (n) => {
      actual = (n + fotos.length) % fotos.length;
      fotos.forEach((f, i) => f.classList.toggle("visible", i === actual));
      [...puntos.children].forEach((p, i) => p.classList.toggle("visible", i === actual));
    };
    const auto = () => { clearInterval(temporizador); temporizador = setInterval(() => ir(actual + 1), 5000); };
    fotos.forEach((_, i) => {
      const p = document.createElement("button"); p.setAttribute("aria-label", "Foto " + (i + 1));
      p.addEventListener("click", () => { ir(i); auto(); }); puntos.appendChild(p);
    });
    c.appendChild(puntos);
    [["ant", "‹", -1], ["sig", "›", 1]].forEach(([cls, txt, paso]) => {
      const b = document.createElement("button"); b.className = "carrusel__flecha carrusel__flecha--" + cls;
      b.textContent = txt; b.setAttribute("aria-label", paso < 0 ? "Anterior" : "Siguiente");
      b.addEventListener("click", () => { ir(actual + paso); auto(); }); c.appendChild(b);
    });
    ir(0); auto();
  });

  /* ---------- Fotos ampliables: galería y tiras de fotos ---------- */
  const grupos = document.querySelectorAll(".galeria, .tira");
  if (grupos.length) {
    const visor = document.createElement("div"); visor.className = "visor";
    visor.innerHTML = '<button class="visor__cerrar" aria-label="Cerrar">×</button><button class="visor__ant" aria-label="Anterior">‹</button><img alt=""><button class="visor__sig" aria-label="Siguiente">›</button>';
    document.body.appendChild(visor);
    const grande = visor.querySelector("img"); let fotos = [], actual = 0;
    const ver = (n) => { actual = (n + fotos.length) % fotos.length; grande.src = fotos[actual].src; grande.alt = fotos[actual].alt; visor.classList.add("abierto"); };
    const cerrar = () => visor.classList.remove("abierto");
    grupos.forEach((g) => {
      const lista = [...g.querySelectorAll("img")];
      lista.forEach((f, i) => f.parentElement.addEventListener("click", () => { fotos = lista; ver(i); }));
    });
    visor.querySelector(".visor__cerrar").addEventListener("click", cerrar);
    visor.querySelector(".visor__ant").addEventListener("click", () => ver(actual - 1));
    visor.querySelector(".visor__sig").addEventListener("click", () => ver(actual + 1));
    visor.addEventListener("click", (e) => { if (e.target === visor) cerrar(); });
    document.addEventListener("keydown", (e) => {
      if (!visor.classList.contains("abierto")) return;
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowLeft") ver(actual - 1);
      if (e.key === "ArrowRight") ver(actual + 1);
    });
  }

  /* ---------- Flechas de las tiras de fotos ---------- */
  document.querySelectorAll(".tira-marco").forEach((marco) => {
    const tira = marco.querySelector(".tira");
    // Carrusel continuo: cada flecha mueve una foto y nunca se acaba. Al llegar a un extremo,
    // la foto del otro extremo se cambia de sitio (sin que se note) para poder seguir avanzando.
    const paso = () => { const f = tira.children; return f.length > 1 ? f[1].offsetLeft - f[0].offsetLeft : tira.clientWidth; };
    const finScroll = () => new Promise((listo) => {
      let espera;
      const fin = () => { tira.removeEventListener("scroll", alMover); listo(); };
      const alMover = () => { clearTimeout(espera); espera = setTimeout(fin, 120); };
      tira.addEventListener("scroll", alMover);
      espera = setTimeout(fin, 700);
    });
    let ocupado = false;
    const mover = async (dir) => {
      if (ocupado || tira.children.length < 2) return;
      ocupado = true;
      const p = paso();
      tira.style.scrollSnapType = "none";
      if (dir > 0 && tira.scrollLeft >= tira.scrollWidth - tira.clientWidth - 2) {
        tira.appendChild(tira.firstElementChild); tira.scrollLeft -= p;   // la primera pasa al final
      } else if (dir < 0 && tira.scrollLeft <= 2) {
        tira.prepend(tira.lastElementChild); tira.scrollLeft += p;        // la última pasa al principio
      }
      tira.scrollBy({ left: dir * p, behavior: "smooth" });
      await finScroll();
      tira.style.scrollSnapType = "";
      ocupado = false;
    };
    marco.querySelectorAll("[data-mover]").forEach((b) => b.addEventListener("click", () => mover(+b.dataset.mover)));
  });

  /* ---------- Formulario de contacto ---------- */
  const form = document.querySelector(".formulario");
  if (form) {
    const aviso = form.querySelector(".formulario__aviso");
    try {
      const c = JSON.parse(sessionStorage.getItem("consulta") || "null");
      if (c) {
        form.mensaje.value = `Hola, me gustaría consultar disponibilidad del ${c.entrada.split("-").reverse().join("/")} al ${c.salida.split("-").reverse().join("/")} para ${c.adultos} adulto(s).`;
        sessionStorage.removeItem("consulta");
      }
    } catch (e) { /* sin almacenamiento */ }
    const avisar = (t) => { aviso.textContent = t; aviso.classList.add("visible"); };

    // Casilla "No soy un robot" (Google reCAPTCHA v2), solo si hay clave en config.js
    const cajaCaptcha = form.querySelector("[data-captcha]");
    let captcha = null;          // id del widget, cuando ya está pintado
    let captchaFallo = false;    // si Google no carga, no se bloquea el envío
    if (cajaCaptcha && S.recaptcha) {
      window.alCargarCaptcha = () => { captcha = grecaptcha.render(cajaCaptcha, { sitekey: S.recaptcha }); };
      const sc = document.createElement("script");
      sc.src = "https://www.google.com/recaptcha/api.js?onload=alCargarCaptcha&render=explicit&hl=es";
      sc.async = true;
      sc.onerror = () => { captchaFallo = true; cajaCaptcha.remove(); };
      document.head.appendChild(sc);
    } else if (cajaCaptcha) {
      cajaCaptcha.remove();
    }
    const reiniciarCaptcha = () => { if (captcha !== null) grecaptcha.reset(captcha); };

    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      if (form.web.value) return; // campo trampa anti-spam
      const d = { nombre: form.nombre.value, telefono: form.telefono.value, email: form.email.value, mensaje: form.mensaje.value };
      if (S.recaptcha && !captchaFallo) {
        const token = captcha !== null ? grecaptcha.getResponse(captcha) : "";
        if (!token) { avisar("Marca la casilla «No soy un robot» antes de enviar."); return; }
        d["g-recaptcha-response"] = token; // el servicio de envío lo comprueba con la clave secreta
      }
      if (S.urlFormulario) {
        try {
          const r = await fetch(S.urlFormulario, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
          if (!r.ok) throw new Error(r.status);
          form.reset(); reiniciarCaptcha(); avisar("Mensaje enviado. Te responderemos lo antes posible.");
        } catch (e) { avisar("No se pudo enviar el mensaje. Escríbenos a " + S.email + " o llámanos al " + S.telefono + "."); }
      } else {
        const cuerpo = `${d.mensaje}\n\n${d.nombre}\nTel.: ${d.telefono}\nE-mail: ${d.email}`;
        location.href = `mailto:${S.email}?subject=${encodeURIComponent("Consulta desde la web")}&body=${encodeURIComponent(cuerpo)}`;
        reiniciarCaptcha();
        avisar("Se abrirá tu programa de correo con el mensaje preparado. Si no se abre, escríbenos a " + S.email + ".");
      }
    });
  }

  /* ---------- Aparición al hacer scroll ---------- */
  const animados = document.querySelectorAll(".aparece");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entradas) => entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visto"); obs.unobserve(e.target); }
    }), { threshold: 0.12 });
    animados.forEach((el) => obs.observe(el));
  } else { animados.forEach((el) => el.classList.add("visto")); }
})();
