/* ══════════════════════════════════════════════════════════════
   main.js — Lógica e interactividad de la página
   Autor: Joseph De La Rans
   Descripción: SPA con navegación por secciones, generación
   dinámica de contenido y estructuras de datos (Array, Map, Set)
══════════════════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────
   DATOS — colecciones JS (Array, Map, Set)
────────────────────────────────────────────── */

// En la versio anterior esta tabla se generaba por medio de html, ahora se da uso de un array para almacenar cada dato
const personas = [
    { id: 1, nombre: "Joseph De La Rans", ciudad: "Baranoa",        lugar: "Baranoa",        rol: "Ingeniero",              estado: "Activo"    },
    { id: 2, nombre: "Oscar Llanos",      ciudad: "Barranquilla",   lugar: "Baranoa",        rol: "Jugador de LoL",         estado: "Activo"    },
    { id: 3, nombre: "Nelson Sierra",     ciudad: "Soledad",        lugar: "Por ahí",        rol: "Jugador de Brawl Stars", estado: "Activo"    },
    { id: 4, nombre: "David Navarro",     ciudad: "Galapa",         lugar: "Mundo Feliz xd", rol: "Tecnico en la vida",     estado: "Inactivo"  },
];

// Seccion map que me inserta las opciones del navbar, uso una key al comienzo y despues de la coma está el valor que se muestra en la interfaz
const secciones = new Map([
    ["inicio",     "Inicio"],
    ["tabla",      "Tabla"],
    ["mapa",       "Mapa"],
    ["contacto",   "Contacto"],
    ["multimedia", "Multimedia"],
    ["perfil",     "Perfil"],
]);

// Set: tecnologías del perfil 
const tecnologias = new Set([
    "HTML", "CSS", "JavaScript", "React",
    "Kotlin", "Python", "Git", "Android"
]);

// Array de servicios para la sección Inicio
const servicios = [
    { titulo: "Desarrollo Web",  desc: "Interfaces con HTML, CSS y JS."    },
    { titulo: "Apps Android",    desc: "Aplicaciones usando Kotlin." },
    { titulo: "Automatización",  desc: "Scripts y bots con Python."                 },
];

// Array de opciones que se mostrarán en la pestaña de contacto, en el select de "asunto"
const opcionesAsunto = ["Consulta general", "Soporte técnico", "Presupuesto"];


/* ──────────────────────────────────────────────
   UTILIDAD: crea y devuelve un div de sección
   oculto, listo para recibir contenido
────────────────────────────────────────────── */
function crearSeccion(id) {
    const div = document.createElement("div"); //Pa no tener que estar tirando divs en el html
    div.id = "sec-" + id;
    // La sección empieza oculta
    div.hidden = true;
    return div;
}


/* ──────────────────────────────────────────────
   NAVEGACIÓN — acá se muestra la sección elegida
   y se ocultan las demás 
────────────────────────────────────────────── */
function mostrarSeccion(id) {
    // Ocultar todas las secciones con un for…of sobre el Map
    for (const [key] of secciones) {
        const sec = document.getElementById("sec-" + key);
        if (sec) sec.hidden = true;
    }

    // Mostrar solo la sección seleccionada
    const target = document.getElementById("sec-" + id);
    if (target) target.hidden = false;

    // Marcar el enlace activo en el nav
    document.querySelectorAll("nav a").forEach(a => {
        if (a.dataset.section === id) {
            a.style.fontWeight = "bold";
        } else {
            a.style.fontWeight = "normal";
        }
    });
}


/* ──────────────────────────────────────────────
   RENDER: barra de navegación
   Recorre el Map para crear los enlaces
────────────────────────────────────────────── */
function renderNav() {
    const nav = document.getElementById("navbar");

    let primero = true;

    // for  sobre el Map definidi anteriormente: [key, label]
    for (const [key, label] of secciones) {
        // Separador entre enlaces (excepto antes del primero)
        if (!primero) {
            nav.appendChild(document.createTextNode(" | "));
        }

        const a = document.createElement("a");
        a.href = "#";
        a.textContent = label;
        a.dataset.section = key;

        // Al hacer clic, mostrar la sección correspondiente
        a.addEventListener("click", (e) => {
            e.preventDefault();
            mostrarSeccion(key);
        });

        nav.appendChild(a);
        primero = false;
    }
}


/* ──────────────────────────────────────────────
   RENDER: sección de INICIO
   Usa un ciclo while pa los stats y un for para servicios
────────────────────────────────────────────── */
function renderInicio() {
    const sec = crearSeccion("inicio");

    // Encabezado
    const h1 = document.createElement("h1");
    h1.textContent = "Joseph De La Rans";
    sec.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = "Estudiante de Ingeniería · Desarrollador · Colombiano";
    sec.appendChild(p);

    sec.appendChild(document.createElement("hr"));

    // Estadísticas con while
    const statsData = [
        { num: 4,   lbl: "Proyectos"   },
        { num: 6,   lbl: "Tecnologías" },
        { num: 100, lbl: "Panes y cocacola"      },
    ];

    const statsH2 = document.createElement("h2");
    statsH2.textContent = "Estadísticas";
    sec.appendChild(statsH2);

    const ul = document.createElement("ul");
    let i = 0; // índice para el bucle while

    while (i < statsData.length) {
        const li = document.createElement("li");
        li.textContent = `${statsData[i].lbl}: ${statsData[i].num}`;
        ul.appendChild(li);
        i++;
    }
    sec.appendChild(ul);

    sec.appendChild(document.createElement("hr"));

    // Tarjetas de servicios con for sobre array
    const srvH2 = document.createElement("h2");
    srvH2.textContent = "Servicios";
    sec.appendChild(srvH2);

    for (const srv of servicios) {
        const h3 = document.createElement("h3");
        h3.textContent = srv.titulo;

        const desc = document.createElement("p");
        desc.textContent = srv.desc;

        sec.appendChild(h3);
        sec.appendChild(desc);
        sec.appendChild(document.createElement("hr"));
    }

    document.getElementById("app").appendChild(sec);
}


/* ──────────────────────────────────────────────
   RENDER: sección TABLA
   Usa un for + switch para el estado de cada persona
────────────────────────────────────────────── */
function renderTabla() {
    const sec = crearSeccion("tabla");

    const h2 = document.createElement("h2");
    h2.textContent = "Tabla de datos";
    sec.appendChild(h2);

    // Crear tabla
    const table  = document.createElement("table");
    const thead  = document.createElement("thead");
    const tbody  = document.createElement("tbody");

    table.border      = "1";
    table.cellPadding = "6";
    table.cellSpacing = "0";

    // Cabecera de la tabla
    const cols = ["#", "Nombre", "Ciudad", "Lugar de residencia", "Rol", "Estado"];
    const trHead = document.createElement("tr");
    for (const col of cols) {
        const th = document.createElement("th");
        th.textContent = col;
        trHead.appendChild(th);
    }
    thead.appendChild(trHead);
    table.appendChild(thead);

    // Filas de datos con for…of sobre el array de personas
    for (const p of personas) {

        // switch: determina el texto del estado
        let estadoTexto;
        switch (p.estado) {
            case "Activo":
                estadoTexto = "✔ Activo";
                break;
            case "Inactivo":
                estadoTexto = "✘ Inactivo";
                break;
            default:
                estadoTexto = p.estado;
        }

        const tr = document.createElement("tr");
        const celdas = [p.id, p.nombre, p.ciudad, p.lugar, p.rol, estadoTexto];

        for (const valor of celdas) {
            const td = document.createElement("td");
            td.textContent = valor;
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    sec.appendChild(table);
    document.getElementById("app").appendChild(sec);
}


/* ──────────────────────────────────────────────
   RENDER: sección MAPA
────────────────────────────────────────────── */
function renderMapa() {
    const sec = crearSeccion("mapa");

    const h2 = document.createElement("h2");
    h2.textContent = "Elemento externo incrustado";
    sec.appendChild(h2);

    const iframe = document.createElement("iframe");
    iframe.src    = "https://www.openstreetmap.org/export/embed.html?bbox=-74.8119%2C10.9729%2C-74.7719%2C10.9129&layer=mapnik&marker=10.992998%2C-74.791961"; 
    iframe.width  = "600";
    iframe.height = "300";
    iframe.title  = "Mapa OpenStreetMap";
    sec.appendChild(iframe);

    const p = document.createElement("p");
    p.textContent = "Barranquilla, Atlantico (EL pin apunta a la universidad) — OpenStreetMap";
    sec.appendChild(p);

    document.getElementById("app").appendChild(sec);
}


/* ──────────────────────────────────────────────
   RENDER: sección CONTACTO
   Formulario con validación if / else if / else
────────────────────────────────────────────── */
function renderContacto() {
    const sec = crearSeccion("contacto");

    const h2 = document.createElement("h2");
    h2.textContent = "Formulario de contacto";
    sec.appendChild(h2);

    // Campos del formulario definidos como array para generarlos con for
    const campos = [
        { id: "f-nombre", tipo: "text",  label: "Nombre:",   placeholder: "Tu nombre"          },
        { id: "f-correo", tipo: "email", label: "Correo:",   placeholder: "correo@ejemplo.com"  },
        { id: "f-tel",    tipo: "tel",   label: "Teléfono:", placeholder: "+57 300 000 0000"    },
    ];

    // Generar campos con un for 
    for (let i = 0; i < campos.length; i++) {
        const c = campos[i];

        const label = document.createElement("label");
        label.textContent = c.label;
        label.htmlFor = c.id;

        const input = document.createElement("input");
        input.type        = c.tipo;
        input.id          = c.id;
        input.placeholder = c.placeholder;

        sec.appendChild(label);
        sec.appendChild(input);
        sec.appendChild(document.createElement("br"));
        sec.appendChild(document.createElement("br"));
    }

    // Select de asunto generado con for…of
    const labelAsunto = document.createElement("label");
    labelAsunto.textContent = "Asunto: ";
    labelAsunto.htmlFor = "f-asunto";

    const select = document.createElement("select");
    select.id = "f-asunto";

    for (const opcion of opcionesAsunto) {
        const opt = document.createElement("option");
        opt.textContent = opcion;
        select.appendChild(opt);
    }

    sec.appendChild(labelAsunto);
    sec.appendChild(select);
    sec.appendChild(document.createElement("br"));
    sec.appendChild(document.createElement("br"));

    // Textarea de mensaje
    const labelMsg = document.createElement("label");
    labelMsg.textContent = "Mensaje:";
    labelMsg.htmlFor = "f-mensaje";

    const textarea = document.createElement("textarea");
    textarea.id          = "f-mensaje";
    textarea.rows        = 4;
    textarea.cols        = 40;
    textarea.placeholder = "Escribe tu mensaje aquí...";

    sec.appendChild(labelMsg);
    sec.appendChild(document.createElement("br"));
    sec.appendChild(textarea);
    sec.appendChild(document.createElement("br"));
    sec.appendChild(document.createElement("br"));

    // Botón de envío
    const btn = document.createElement("button");
    btn.type        = "button";
    btn.textContent = "Enviar mensaje";
    sec.appendChild(btn);

    // Párrafo para mostrar resultado de validación
    const resultado = document.createElement("p");
    resultado.id = "form-resultado";
    sec.appendChild(resultado);

    document.getElementById("app").appendChild(sec);

    // Validación para que se llene correctamente el formulario de contacto usando if y elses
    btn.addEventListener("click", () => {
        const nombre  = document.getElementById("f-nombre").value.trim();
        const correo  = document.getElementById("f-correo").value.trim();
        const mensaje = document.getElementById("f-mensaje").value.trim();

        if (nombre === "" || correo === "" || mensaje === "") {
            // Campos vacíos
            resultado.textContent = "Por favor completa todos los campos obligatorios.";

        } else if (!correo.includes("@")) {
            // Correo inválido
            resultado.textContent = "⚠ El correo ese está como raro, revisalo ahi de bacán.";

        } else {
            // Todo correcto
            resultado.textContent = `✓ Mensaje enviado, ${nombre}. ¡Nos pillamos después!`;
        }
    });
}


/* ──────────────────────────────────────────────
   RENDER: sección MULTIMEDIA
────────────────────────────────────────────── */
function renderMultimedia() {
    const sec = crearSeccion("multimedia");

    const h2 = document.createElement("h2");
    h2.textContent = "Elemento multimedia";
    sec.appendChild(h2);

    const iframe = document.createElement("iframe");
    iframe.width           = "560";
    iframe.height          = "315";
    iframe.src             = "https://www.youtube.com/embed/m0BFZkPsoWY";
    iframe.title           = "YouTube video player";
    iframe.frameBorder     = "0";
    iframe.allowFullscreen = true;
    sec.appendChild(iframe);

    document.getElementById("app").appendChild(sec);
}


/* ──────────────────────────────────────────────
   RENDER: sección PERFIL
   Usa el Set de tecnologías para generar la lista
────────────────────────────────────────────── */
function renderPerfil() {
    const sec = crearSeccion("perfil");

    const h2 = document.createElement("h2");
    h2.textContent = "Perfil";
    sec.appendChild(h2);

    // Imagen + figura
    const figure = document.createElement("figure");

    const img = document.createElement("img");
    img.src   = "https://imgs.search.brave.com/sGieYMrFz7wXSqqv4HoQ0_B0XwhVSRuNrafL5kaDVY0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaW5kZXBlbmRl/bnQuY28udWsvMjAy/NC8xMi8wOS8xNS9H/ZXR0eUltYWdlcy0x/NTM3NjkwOTk0Lmpw/Zz9xdWFsaXR5PTc1/JndpZHRoPTY0MCZj/cm9wPTM6MixzbWFy/dCZhdXRvPXdlYnA";
    img.alt   = "Foto de perfil";
    img.width = 400;

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = "Joseph De La Rans — Estudiante de Ingeniería";

    figure.appendChild(img);
    figure.appendChild(figcaption);
    sec.appendChild(figure);

    // Descripción
    const p = document.createElement("p");
    p.textContent = "Estudiante de Ingeniería de Sistemas, apasionado por el desarrollo de software.";
    sec.appendChild(p);

    // Cita
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = '"Una vez me comí un pan" — Joseph De La Rans';
    sec.appendChild(blockquote);

    sec.appendChild(document.createElement("hr"));

    // Tecnologías: recorremos el Set con for…of
    const h3 = document.createElement("h3");
    h3.textContent = "Tecnologías";
    sec.appendChild(h3);

    const ul = document.createElement("ul");

    for (const tech of tecnologias) {
        const li = document.createElement("li");
        li.textContent = tech;
        ul.appendChild(li);
    }

    sec.appendChild(ul);
    document.getElementById("app").appendChild(sec);
}


/* ──────────────────────────────────────────────
   INICIALIZACIÓN — punto de entrada
   Se ejecuta cuando el DOM está listo
────────────────────────────────────────────── */
function init() {
    // 1. Generar navegación desde el Map
    renderNav();

    // 2. Renderizar cada sección (el contenido vive en JS, no en HTML)
    renderInicio();
    renderTabla();
    renderMapa();
    renderContacto();
    renderMultimedia();
    renderPerfil();

    // 3. Mostrar la sección de inicio por defecto
    mostrarSeccion("inicio");
}

// Escuchar el evento DOMContentLoaded antes de manipular el DOM
document.addEventListener("DOMContentLoaded", init);