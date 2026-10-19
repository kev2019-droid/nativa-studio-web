# Nativa Studio — sitio web

Sitio web estático, responsive y listo para editar en Visual Studio Code. Incluye:

- Inicio con hero y el eslogan **“Diseño que nace de nuestras raíces”**.
- Catálogo filtrable con las **21 fotografías reales** entregadas.
- Fichas de proyecto con galería de imágenes.
- Secciones Nosotros y Contacto.
- Formulario que prepara un mensaje para WhatsApp.
- Diseño adaptable para teléfono, tableta y computadora.
- Campos pendientes marcados claramente como **POR DEFINIR**.

El proyecto usa HTML, CSS y JavaScript sin frameworks. No requiere instalar paquetes ni ejecutar una compilación.

## 1. Abrir el proyecto en Visual Studio Code

1. Descomprime el archivo ZIP.
2. Abre Visual Studio Code.
3. Ve a **Archivo → Abrir carpeta**.
4. Selecciona la carpeta `nativa-studio-web`.
5. En el panel izquierdo aparecerán `index.html`, `css`, `js` y `assets`.

## 2. Ejecutar la página

### Opción recomendada: Live Server

1. En Visual Studio Code abre **Extensiones**.
2. Busca `Live Server` e instala la extensión publicada por Ritwick Dey.
3. Abre `index.html`.
4. Haz clic en **Go Live** en la barra inferior o clic derecho → **Open with Live Server**.
5. La página se abrirá en el navegador y se actualizará al guardar cambios.

### Opción sencilla sin extensiones

Abre `index.html` directamente en Chrome, Edge o Firefox. Las funciones principales también trabajan de esta forma.

## 3. Configurar WhatsApp y datos de contacto

Abre `js/config.js`. Encontrarás:

```js
window.NATIVA_CONFIG = {
  whatsappNumber: "",
  whatsappDisplay: "",
  email: "",
  location: "",
  instagramUrl: "",
  facebookUrl: "",
};
```

Completa únicamente datos confirmados:

- `whatsappNumber`: código de país y número, solo dígitos. Formato de referencia: `"503XXXXXXXX"`.
- `whatsappDisplay`: cómo se verá el número en pantalla.
- `email`: correo oficial de Nativa Studio.
- `location`: ubicación que la marca quiera publicar.
- `instagramUrl` y `facebookUrl`: enlaces completos a las cuentas oficiales.

Mientras `whatsappNumber` esté vacío, el formulario no abre ningún chat y muestra una indicación de configuración. Así se evita publicar un contacto inventado.

## 4. Editar textos generales

Abre `index.html` y busca los textos que quieras cambiar. Los pendientes están acompañados por la etiqueta **POR DEFINIR**.

Antes de publicar, confirma como mínimo:

- Historia y filosofía oficial de Nativa Studio.
- Descripción del equipo o taller.
- Ubicación que se desea hacer pública.
- Correo y redes sociales oficiales.
- Nombre comercial, materiales, medidas, acabados y precios de cada proyecto.

No es obligatorio completar precios; puedes eliminar esa fila de la ficha si Nativa Studio trabaja únicamente por cotización.

## 5. Editar el catálogo

Los proyectos están en `js/catalogo.js`. Cada bloque tiene esta forma:

```js
{
  id: "nombre-unico",
  title: "Nombre visible",
  category: "Categoría",
  cover: "assets/images/foto-principal.jpeg",
  images: [
    "assets/images/foto-principal.jpeg",
    "assets/images/foto-secundaria.jpeg",
  ],
  alt: "Descripción breve de la foto",
  description: "Descripción confirmada del proyecto",
}
```

Para agregar un proyecto:

1. Copia sus fotografías en `assets/images`.
2. Usa nombres cortos, en minúsculas y sin espacios, por ejemplo `mesa-centro-01.jpeg`.
3. Duplica uno de los bloques en `js/catalogo.js`.
4. Cambia `id`, `title`, `category`, `cover`, `images`, `alt` y `description`.
5. Guarda el archivo. El filtro de la nueva categoría se crea automáticamente.

Para eliminar un proyecto, borra su bloque completo en `js/catalogo.js`. Si una foto ya no se usa, también puedes borrarla de `assets/images`.

## 6. Cambiar colores, logo y estilo

### Colores

Abre `css/styles.css`. Al inicio están las variables principales:

```css
:root {
  --forest: #173b32;
  --forest-deep: #0d2922;
  --wood: #a66a3f;
  --sand: #e5dac4;
  --ivory: #f8f5ed;
  --ink: #191918;
}
```

Cambiar una variable actualiza el color en todo el sitio.

### Logo

La cabecera usa una marca tipográfica temporal con la letra `N`. Cuando exista el logo final:

1. Guarda el archivo en `assets`, idealmente como SVG o PNG con fondo transparente.
2. En `index.html`, localiza los dos enlaces con la clase `brand`.
3. Sustituye el contenido de cada enlace por una imagen, por ejemplo:

```html
<img src="assets/logo-nativa.svg" alt="Nativa Studio" width="160" />
```

También puedes reemplazar `assets/favicon.svg` por el isotipo oficial.

## 7. Estructura de carpetas

```text
nativa-studio-web/
├── index.html              Página principal
├── README.md               Esta guía
├── assets/
│   ├── favicon.svg         Ícono temporal
│   └── images/             21 fotografías reales
├── css/
│   └── styles.css          Diseño y adaptación responsive
└── js/
    ├── config.js           WhatsApp, correo, ubicación y redes
    ├── catalogo.js         Proyectos y galerías
    └── app.js              Filtros, menú, modal y formulario
```

## 8. Publicar gratis

### GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube todo el contenido de la carpeta `nativa-studio-web`; `index.html` debe quedar en la raíz.
3. En el repositorio abre **Settings → Pages**.
4. En la sección de publicación elige la rama principal y la carpeta raíz.
5. Guarda y espera a que GitHub muestre la dirección pública.

Consulta la [guía oficial de inicio de GitHub Pages](https://docs.github.com/en/pages/quickstart) si la interfaz ha cambiado.

### Netlify, mediante carga manual

1. Crea o inicia sesión en una cuenta de Netlify.
2. Abre el área de despliegue manual.
3. Arrastra la carpeta completa `nativa-studio-web`.
4. Netlify generará una dirección temporal que luego puedes personalizar.

Consulta la [documentación oficial de despliegue manual de Netlify](https://docs.netlify.com/welcome/add-new-site/#deploy-manually).

Antes de publicar, prueba el menú, todos los filtros, las galerías, el formulario y los enlaces en un teléfono y una computadora.

## 9. Buenas prácticas para las fotografías

- Conserva una copia de los originales fuera del proyecto.
- Para nuevas imágenes usa JPEG o WebP y procura que cada archivo pese menos de 1 MB.
- Mantén la misma orientación para las fotos principales del catálogo cuando sea posible.
- Escribe un texto `alt` que describa lo visible; ayuda a accesibilidad y buscadores.
- Publica únicamente fotografías que Nativa Studio tenga autorización para usar.

## 10. Navegadores compatibles

Se recomienda una versión reciente de Chrome, Edge, Firefox o Safari. El detalle de proyectos usa el elemento nativo `dialog`, disponible en navegadores modernos.

---

Proyecto preparado con contenido de contacto, precios y especificaciones sin inventar. Todos los datos que requieren confirmación permanecen señalados como **POR DEFINIR**.
