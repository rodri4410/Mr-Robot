// "Hello, friend." - El saludo característico de Elliot.
console.log("Hello, friend.");

// Espera a que el contenido del DOM esté completamente cargado para ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. The revolution is ready.');

    // --- FONDO DE CÓDIGO BINARIO (SI EXISTE) ---
    // Selecciona el contenedor para el fondo de código binario.
    const binaryContainer = document.querySelector('.binary-code');
    // Si el contenedor existe, genera una cadena de caracteres binarios para usar como fondo.
    if (binaryContainer) {
        let binaryString = '';
        const chars = 5000; // Número de caracteres a generar.
        for (let i = 0; i < chars; i++) {
            binaryString += Math.round(Math.random()); // Añade 0 o 1 a la cadena.
        }
        binaryContainer.innerHTML = binaryString.repeat(10); // Repite la cadena para llenar el espacio.
    }

    // --- GALERÍA LIGHTBOX (SI EXISTE) ---
    // Selecciona todos los elementos de la galería y los componentes del lightbox.
    const galleryItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0; // Variable para rastrear el índice de la imagen actual en el lightbox.

    // Verifica que todos los elementos del lightbox y la galería existan antes de añadir los event listeners.
    if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {
        
        // Función para mostrar una imagen específica en el lightbox.
        const showImage = (index) => {
            const item = galleryItems[index];
            lightboxImg.src = item.src; // Establece la fuente de la imagen del lightbox.
            if (lightboxCaption) {
                lightboxCaption.innerHTML = item.alt; // Establece el texto alternativo como caption.
            }
            currentIndex = index; // Actualiza el índice actual.
        };

        // Añade un event listener a cada item de la galería para abrir el lightbox.
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block'; // Muestra el lightbox.
                showImage(index); // Muestra la imagen en la que se hizo clic.
            });
        });

        // Añade un event listener al botón de cerrar.
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none'; // Oculta el lightbox.
        });

        // Cierra el lightbox si se hace clic fuera de la imagen o los botones de navegación.
        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                lightbox.style.display = 'none';
            }
        });

        // Navegación: botón de imagen anterior.
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al fondo del lightbox.
            const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length; // Calcula el nuevo índice.
            showImage(newIndex);
        });

        // Navegación: botón de imagen siguiente.
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que el clic se propague al fondo del lightbox.
            const newIndex = (currentIndex + 1) % galleryItems.length; // Calcula el nuevo índice.
            showImage(newIndex);
        });
    }

    // --- EFECTO GLITCH EN IMAGEN DE FSOCIETY (SI EXISTE) ---
    // Selecciona el contenedor de la imagen que tendrá el efecto glitch.
    const glitchContainer = document.getElementById('fsociety-glitch-container');

    // Utiliza IntersectionObserver para activar el efecto solo cuando la imagen es visible.
    if (glitchContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    glitchContainer.classList.add('glitch-active'); // Añade la clase para activar el glitch.
                } else {
                    glitchContainer.classList.remove('glitch-active'); // La quita cuando no es visible.
                }
            });
        }, { threshold: 0.5 }); // El efecto se activa cuando el 50% del elemento es visible.

        observer.observe(glitchContainer); // Comienza a observar el contenedor.
    }

    // --- ACORDEÓN PARA LISTA DE EPISODIOS ---
    const episodeToggles = document.querySelectorAll('.episode-toggle');

    episodeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const episodeList = toggle.nextElementSibling;
            const icon = toggle.querySelector('.toggle-icon');

            // Verificar si la lista está expandida comparando con el scrollHeight
            if (episodeList.style.maxHeight && episodeList.style.maxHeight !== '0px') {
                // Colapsar
                episodeList.style.maxHeight = '0px';
                icon.textContent = '+';
            } else {
                // Expandir
                episodeList.style.maxHeight = episodeList.scrollHeight + "px";
                icon.textContent = '-';
            }
        });
    });
});
