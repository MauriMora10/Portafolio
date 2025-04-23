/**
 * Sistema de validación de formulario y notificaciones toast
 * 
 * Este script maneja:
 * - Validación de campos del formulario de contacto
 * - Sistema de notificaciones toast
 * - Manejo de eventos del formulario
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Configuración del sistema de notificaciones
    // =============================================

    /**
     * Crea el contenedor de notificaciones toast si no existe
     * El contenedor se añade al final del body
     */
    if (!document.querySelector('.toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    /**
     * Muestra una notificación toast
     * @param {string} type - Tipo de notificación ('success', 'error', 'warning', 'info')
     * @param {string} title - Título de la notificación
     * @param {string} message - Mensaje de la notificación
     * @param {number} duration - Duración en milisegundos (0 = no se cierra automáticamente)
     */
    function showToast(type, title, message, duration = 3000) {
        // Mapeo de iconos según el tipo de notificación
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };

        // Crear elemento toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        // Estructura HTML del toast
        toast.innerHTML = `
            <i class="fas ${icons[type]}"></i>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Añadir toast al contenedor
        const toastContainer = document.querySelector('.toast-container');
        toastContainer.appendChild(toast);

        // Manejar cierre manual
        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', () => {
            closeToast(toast);
        });

        // Cierre automático si se especifica duración
        if (duration > 0) {
            setTimeout(() => closeToast(toast), duration);
        }
    }

    /**
     * Cierra una notificación toast con animación
     * @param {HTMLElement} toast - Elemento toast a cerrar
     */
    function closeToast(toast) {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }

    // =============================================
    // Configuración del formulario
    // =============================================

    // Obtener elementos del formulario
    const formulario = document.getElementById('formulario-contacto');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');

    // Expresiones regulares para validación
    const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexMensaje = /^[\s\S]{10,500}$/;

    // Función para mostrar mensajes de error
    function mostrarError(input, mensaje) {
        const errorElement = document.getElementById(`${input.id}-error`);
        input.classList.add('error');
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }

    // Función para limpiar mensajes de error
    function limpiarError(input) {
        const errorElement = document.getElementById(`${input.id}-error`);
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    // Validación en tiempo real
    nombreInput.addEventListener('input', () => {
        if (!regexNombre.test(nombreInput.value)) {
            mostrarError(nombreInput, 'El nombre debe tener entre 2 y 50 caracteres y solo puede contener letras y espacios');
        } else {
            limpiarError(nombreInput);
        }
    });

    emailInput.addEventListener('input', () => {
        if (!regexEmail.test(emailInput.value)) {
            mostrarError(emailInput, 'Por favor, ingresa un correo electrónico válido');
        } else {
            limpiarError(emailInput);
        }
    });

    mensajeInput.addEventListener('input', () => {
        if (!regexMensaje.test(mensajeInput.value)) {
            mostrarError(mensajeInput, 'El mensaje debe tener entre 10 y 500 caracteres');
        } else {
            limpiarError(mensajeInput);
        }
    });

    // Validación al enviar el formulario
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        let esValido = true;

        // Validar nombre
        if (!regexNombre.test(nombreInput.value)) {
            mostrarError(nombreInput, 'El nombre debe tener entre 2 y 50 caracteres y solo puede contener letras y espacios');
            esValido = false;
        }

        // Validar email
        if (!regexEmail.test(emailInput.value)) {
            mostrarError(emailInput, 'Por favor, ingresa un correo electrónico válido');
            esValido = false;
        }

        // Validar mensaje
        if (!regexMensaje.test(mensajeInput.value)) {
            mostrarError(mensajeInput, 'El mensaje debe tener entre 10 y 500 caracteres');
            esValido = false;
        }

        if (esValido) {
            // Aquí iría el código para enviar el formulario
            showToast('success', 'Éxito', 'Mensaje enviado correctamente');
            formulario.reset();
        }
    });
}); 