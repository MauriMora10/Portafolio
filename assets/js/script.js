// Función para mostrar la fecha actual
function mostrarFecha() {
    const fecha = new Date();
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opciones);
    document.querySelector('.fecha').textContent = `Publicado el ${fechaFormateada}`;
}

/**
 * Función para manejar el scroll suave en los enlaces del menú
 * Permite una navegación fluida entre secciones
 */
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/**
 * Función para animar las habilidades al hacer scroll
 * Utiliza IntersectionObserver para detectar cuando los elementos entran en el viewport
 * Aplica animaciones de opacidad y transformación
 */
function animarHabilidades() {
    const habilidades = document.querySelectorAll('.habilidad');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    habilidades.forEach(habilidad => {
        habilidad.style.opacity = '0';
        habilidad.style.transform = 'translateY(20px)';
        habilidad.style.transition = 'all 0.5s ease';
        observer.observe(habilidad);
    });
}

/**
 * Función para animar los proyectos al hacer scroll
 * Similar a animarHabilidades pero con diferentes valores de transformación
 * Crea un efecto de aparición más dramático
 */
function animarProyectos() {
    const proyectos = document.querySelectorAll('.proyecto');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    proyectos.forEach(proyecto => {
        proyecto.style.opacity = '0';
        proyecto.style.transform = 'translateY(50px)';
        proyecto.style.transition = 'all 0.5s ease';
        observer.observe(proyecto);
    });
}

/**
 * Función para agregar efecto de carga en las imágenes
 * Crea una transición suave cuando las imágenes se cargan
 * Mejora la experiencia de usuario durante la carga de la página
 */
function cargarImagenes() {
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s';
    });
}

/**
 * Inicialización de todas las funciones cuando el DOM esté cargado
 * Asegura que todos los elementos estén disponibles antes de ejecutar las funciones
 */
document.addEventListener('DOMContentLoaded', () => {
    mostrarFecha();
    animarHabilidades();
    animarProyectos();
    cargarImagenes();
}); 