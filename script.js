// Animación del texto al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    
    setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transition = 'opacity 0.8s ease';
    }, 100);
    
    // Observar la sección about
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        observer.observe(aboutContent);
    }
});

// Animación de elementos cuando son visibles
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Funcionalidad del carrusel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const cards = document.querySelectorAll('.certificate-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    const isMobile = window.innerWidth <= 768;
    const cardWidth = isMobile ? 280 : 340; // Ajustamos el ancho según el dispositivo
    
    const updateCarousel = () => {
        const cardsToShow = isMobile ? 1 : Math.floor(carousel.offsetWidth / cardWidth);
        const maxIndex = cards.length - cardsToShow;
        
        // Centramos la carta en móviles
        if (isMobile) {
            const offset = (carousel.offsetWidth - cardWidth) / 2;
            carousel.scrollTo({
                left: (currentIndex * cardWidth) - offset,
                behavior: 'smooth'
            });
        } else {
            carousel.scrollTo({
                left: currentIndex * cardWidth,
                behavior: 'smooth'
            });
        }
        
        // Actualizamos estado de los botones
        prevButton.style.opacity = currentIndex <= 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex <= 0 ? 'not-allowed' : 'pointer';
        
        nextButton.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextButton.style.cursor = currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
    };
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const cardsToShow = isMobile ? 1 : Math.floor(carousel.offsetWidth / cardWidth);
        const maxIndex = cards.length - cardsToShow;
        
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Actualizar al redimensionar
    window.addEventListener('resize', () => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Recargamos la página si cambia entre móvil y desktop
        }
        updateCarousel();
    });
    
    // Inicializar carrusel
    updateCarousel();
    
    // Observador para animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
});

// Agregar al final del archivo
document.addEventListener('DOMContentLoaded', () => {
    const scrollButton = document.getElementById('scrollToTop');

    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll suave al inicio
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Agregar al archivo existente
document.addEventListener('DOMContentLoaded', () => {
    // Scroll suave para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Agregar al final del archivo
let currentImageIndex = 0;
const certificateImages = [];

// Función para recopilar todas las imágenes de certificados
function collectCertificateImages() {
    const images = document.querySelectorAll('.certificate-image img');
    certificateImages.length = 0; // Limpiar array
    images.forEach(img => {
        certificateImages.push({
            src: img.src,
            alt: img.alt
        });
    });
}

// Función para abrir el visualizador
function openImageViewer(src, alt) {
    const viewer = document.getElementById('imageViewer');
    const viewerImg = document.getElementById('viewerImage');
    const caption = document.querySelector('.viewer-caption');
    
    collectCertificateImages();
    currentImageIndex = certificateImages.findIndex(img => img.src === src);
    
    viewerImg.src = src;
    viewerImg.alt = alt;
    caption.textContent = alt;
    viewer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el visualizador
function closeImageViewer() {
    const viewer = document.getElementById('imageViewer');
    viewer.classList.remove('active');
    document.body.style.overflow = '';
}

// Función para navegar entre imágenes
function navigateImage(direction) {
    currentImageIndex = (currentImageIndex + direction + certificateImages.length) % certificateImages.length;
    const newImage = certificateImages[currentImageIndex];
    const viewerImg = document.getElementById('viewerImage');
    const caption = document.querySelector('.viewer-caption');
    
    viewerImg.src = newImage.src;
    viewerImg.alt = newImage.alt;
    caption.textContent = newImage.alt;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('imageViewer');
    const closeBtn = document.querySelector('.close-viewer');
    const prevBtn = document.querySelector('.prev-image');
    const nextBtn = document.querySelector('.next-image');
    
    closeBtn.addEventListener('click', closeImageViewer);
    prevBtn.addEventListener('click', () => navigateImage(-1));
    nextBtn.addEventListener('click', () => navigateImage(1));
    
    // Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.classList.contains('active')) {
            closeImageViewer();
        }
        // Navegación con flechas
        if (viewer.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigateImage(-1);
            if (e.key === 'ArrowRight') navigateImage(1);
        }
    });
    
    // Cerrar al hacer clic fuera de la imagen
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) {
            closeImageViewer();
        }
    });
});

// Antispam
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si hay mensaje en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const mensaje = urlParams.get('mensaje');
    
    if (mensaje) {
        let alertMessage = '';
        switch(mensaje) {
            case 'enviado':
                alertMessage = '¡Mensaje enviado con éxito!';
                break;
            case 'error':
                alertMessage = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
                break;
            case 'spam':
                alertMessage = 'Por favor, espera un momento antes de enviar otro mensaje.';
                break;
            case 'incompleto':
                alertMessage = 'Por favor, completa todos los campos.';
                break;
            case 'email_invalido':
                alertMessage = 'Por favor, ingresa un email válido.';
                break;
        }
        
        if (alertMessage) {
            alert(alertMessage);
            // Limpiar el mensaje de la URL
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }
    }
});
