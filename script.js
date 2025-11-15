document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu.querySelectorAll('a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }

    // --- Hero Section Slideshow ---
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    if (heroSlides.length > 0) {
        let currentImageIndex = 0;

        const showNextImage = () => {
            // Remove active class from current slide
            heroSlides[currentImageIndex].classList.remove('active');
            
            // Increment index, looping back to 0 if at the end
            currentImageIndex = (currentImageIndex + 1) % heroSlides.length;

            // Add active class to the new current slide
            heroSlides[currentImageIndex].classList.add('active');
        };

        setInterval(showNextImage, 2500);
    }

    // --- Reviews Slider ---
    const slider = document.querySelector('.reviews-slider');
    if (slider) {
        const slides = Array.from(slider.children);
        const nextButton = document.querySelector('.next-arrow');
        const prevButton = document.querySelector('.prev-arrow');
        const dotsContainer = document.querySelector('.slider-dots-container');

        let currentPage = 0;
        let slidesPerPage = getSlidesPerPage();
        let totalPages = Math.ceil(slides.length / slidesPerPage);

        function getSlidesPerPage() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('button');
                dot.classList.add('slider-dot');
                if (i === currentPage) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to review page ${i + 1}`);
                dot.addEventListener('click', () => {
                    goToPage(i);
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = dotsContainer.querySelectorAll('.slider-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentPage);
            });
        }

        function goToPage(pageIndex) {
            currentPage = pageIndex;
            const offset = currentPage * 100;
            slider.style.transform = `translateX(-${offset}%)`;
            updateDots();
        }

        nextButton.addEventListener('click', () => {
            const nextPage = (currentPage + 1) % totalPages;
            goToPage(nextPage);
        });

        prevButton.addEventListener('click', () => {
            const prevPage = (currentPage - 1 + totalPages) % totalPages;
            goToPage(prevPage);
        });

        window.addEventListener('resize', () => {
            const newSlidesPerPage = getSlidesPerPage();
            if (newSlidesPerPage !== slidesPerPage) {
                slidesPerPage = newSlidesPerPage;
                totalPages = Math.ceil(slides.length / slidesPerPage);
                createDots();
                // Adjust current page if it's now out of bounds
                const newCurrentPage = Math.min(currentPage, totalPages - 1);
                goToPage(newCurrentPage);
            }
        });

        // Initialize Slider
        createDots();
    }
});