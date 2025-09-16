// "Hello, friend." - El saludo característico de Elliot.
console.log("Hello, friend.");

// Podrías agregar más interactividad aquí en el futuro.
// Por ejemplo, un efecto de texto que se escribe solo o más animaciones "glitch".

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed. The revolution is ready.');

    // Binary code background
    const binaryContainer = document.querySelector('.binary-code');
    if (binaryContainer) {
        let binaryString = '';
        const chars = 5000; // Number of characters to generate
        for (let i = 0; i < chars; i++) {
            binaryString += Math.round(Math.random());
        }
        binaryContainer.innerHTML = binaryString.repeat(10); // Repeat to fill the space
    }

    // Lightbox Gallery
    const galleryItems = document.querySelectorAll('.galeria-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;

    if (galleryItems.length > 0 && lightbox && lightboxImg && closeBtn && prevBtn && nextBtn) {
        
        const showImage = (index) => {
            const item = galleryItems[index];
            lightboxImg.src = item.src;
            if (lightboxCaption) {
                lightboxCaption.innerHTML = item.alt;
            }
            currentIndex = index;
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block';
                showImage(index);
            });
        });

        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
                lightbox.style.display = 'none';
            }
        });

        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(newIndex);
        });

        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const newIndex = (currentIndex + 1) % galleryItems.length;
            showImage(newIndex);
        });
    }

    // Fsociety image glitch effect
    const glitchContainer = document.getElementById('fsociety-glitch-container');

    if (glitchContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    glitchContainer.classList.add('glitch-active');
                } else {
                    glitchContainer.classList.remove('glitch-active');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(glitchContainer);
    }

    // Episode List Toggles (Temporadas Page)
    console.log('Initializing episode toggles...');
    const episodeToggles = document.querySelectorAll('.episode-toggle');
    console.log('Found episode toggles:', episodeToggles.length);

    episodeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            console.log('Toggle clicked!');
            // Permitir que el toggle funcione si el siguiente elemento es un h3 o similar
            let episodeList = toggle.nextElementSibling;
            // Si el siguiente no es la lista, buscar el siguiente .episode-list dentro del mismo contenedor
            if (!episodeList || !episodeList.classList.contains('episode-list')) {
                episodeList = toggle.parentElement.querySelector('.episode-list');
            }
            console.log('Episode list element:', episodeList);
            if (episodeList && episodeList.classList.contains('episode-list')) {
                toggle.classList.toggle('active');
                const icon = toggle.querySelector('.toggle-icon');

                // Comprueba si el maxHeight está establecido para decidir si abrir o cerrar
                if (episodeList.style.maxHeight) {
                    // Si está abierto, lo cerramos
                    episodeList.style.maxHeight = null;
                    if (icon) icon.textContent = '+';
                    episodeList.classList.remove('show');
                } else {
                    // Si está cerrado, lo abrimos calculando su altura real
                    episodeList.style.maxHeight = episodeList.scrollHeight + "px";
                    if (icon) icon.textContent = '-';
                    episodeList.classList.add('show');
                }
            } else {
                console.log('Condition NOT met: episodeList is NOT valid or missing class.', episodeList);
            }
        });
    });
});
