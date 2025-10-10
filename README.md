# TechNova - Innovation Hub

Sitio web profesional de tecnología desarrollado con HTML5, CSS3 y JavaScript vanilla.

## 🚀 Características

- **Diseño Responsivo**: Adaptable a todos los dispositivos (móviles, tablets, desktop)
- **Logo SVG Personalizado**: Logo vectorial escalable integrado en toda la página
- **Animaciones Modernas**: Efectos de scroll, contadores animados, y transiciones suaves
- **Interactividad JavaScript**: Formularios funcionales, navegación dinámica, notificaciones
- **Optimizado para SEO**: Estructura semántica HTML5 y meta tags
- **Alto Rendimiento**: CSS y JS optimizados para carga rápida

## 📁 Estructura del Proyecto

```
paginaFabi/
│
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos CSS
├── js/
│   └── script.js       # JavaScript interactivo
├── images/
│   └── logo.svg        # Logo personalizado
├── netlify.toml        # Configuración de Netlify
└── README.md           # Documentación
```

## 🎨 Secciones del Sitio

1. **Hero**: Sección principal con título animado y estadísticas
2. **Servicios**: 6 servicios tecnológicos destacados
3. **Productos**: Catálogo de productos con precios
4. **Nosotros**: Información de la empresa y stack tecnológico
5. **Testimonios**: Reseñas de clientes
6. **Contacto**: Formulario funcional de contacto
7. **Footer**: Enlaces, redes sociales y newsletter

## 🛠️ Tecnologías Utilizadas

- HTML5 (Estructura semántica)
- CSS3 (Flexbox, Grid, Animaciones, Variables CSS)
- JavaScript ES6+ (Vanilla JS, sin frameworks)
- SVG (Logo vectorial)

## 🌐 Despliegue en Netlify

### Opción 1: Despliegue mediante Git

1. Inicializa un repositorio Git:
```bash
git init
git add .
git commit -m "Initial commit - TechNova website"
```

2. Sube el código a GitHub:
```bash
git remote add origin https://github.com/tu-usuario/technova-site.git
git push -u origin main
```

3. Ve a [Netlify](https://app.netlify.com/)
4. Haz clic en "Add new site" > "Import an existing project"
5. Conecta tu repositorio de GitHub
6. Netlify detectará automáticamente la configuración del `netlify.toml`
7. Haz clic en "Deploy site"

### Opción 2: Despliegue mediante Drag & Drop

1. Ve a [Netlify](https://app.netlify.com/)
2. En la sección "Sites", arrastra toda la carpeta del proyecto
3. Netlify desplegará automáticamente el sitio
4. Recibirás un URL como: `https://nombre-aleatorio.netlify.app`

### Opción 3: Despliegue mediante Netlify CLI

1. Instala Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Inicia sesión en Netlify:
```bash
netlify login
```

3. Despliega el sitio:
```bash
netlify deploy --prod
```

4. Sigue las instrucciones en pantalla

## 🎯 Características de JavaScript

- **Navegación Responsiva**: Menú hamburguesa para móviles
- **Scroll Smooth**: Navegación suave entre secciones
- **Contadores Animados**: Estadísticas que se animan al hacer scroll
- **Intersection Observer**: Animaciones al entrar elementos en viewport
- **Formulario de Contacto**: Validación y feedback visual
- **Sistema de Notificaciones**: Alertas elegantes para acciones del usuario
- **Botón Back to Top**: Volver arriba con animación
- **Efecto Parallax**: En la sección hero
- **Navegación Activa**: Resalta la sección actual en el menú

## 📱 Responsive Design

El sitio está optimizado para:
- Mobile (< 480px)
- Tablet (480px - 768px)
- Desktop (> 768px)

## 🎨 Logo SVG

El logo "TechNova" es completamente vectorial y escalable, diseñado con:
- Icono de chip/circuito tecnológico
- Gradiente moderno (violeta a púrpura)
- Conexiones de circuito animables
- Tipografía profesional

El logo se utiliza en:
- Header/Navegación
- Footer
- Como favicon (puede agregarse)

## ⚡ Optimizaciones

- Variables CSS para fácil personalización de colores y espaciado
- Lazy loading para imágenes
- Debouncing en eventos de scroll
- Animaciones con GPU acceleration (transform, opacity)
- Cache headers configurados en Netlify
- Minificación recomendada para producción

## 🔧 Personalización

Para personalizar colores, edita las variables CSS en `css/styles.css`:

```css
:root {
    --primary: #667eea;
    --secondary: #764ba2;
    --accent: #f093fb;
    /* ... más variables */
}
```

## 📄 Licencia

Este proyecto fue creado para fines educativos por Maria Claudia Fabian no usar sin consentimiento adecuado.