document.addEventListener('DOMContentLoaded', () => {
    const carouselSlide = document.querySelector('.carousel-slide');
    const prevBtn = document.querySelector('#prevBtn');
    const nextBtn = document.querySelector('#nextBtn');
    const indicatorsContainer = document.querySelector('.indicators');
    
    let currentIndex = 0;
    let carouselItems = [];
    let intervalId;

    // Fetch JSON data
    async function fetchData() {
        try {
            // Replace with your JSON file path or API endpoint
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    // Initialize carousel
    async function initCarousel() {
        const data = await fetchData();
        if (data.length === 0) {
            carouselSlide.innerHTML = '<div class="carousel-item"><p>No data available</p></div>';
            return;
        }

        carouselItems = data;
        renderCarousel();
        createIndicators();
        startAutoSlide();
    }

    // Render carousel items
    function renderCarousel() {
        carouselSlide.innerHTML = '';
        
        carouselItems.forEach((item, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.title || `Slide ${index + 1}`;
            
            const caption = document.createElement('div');
            caption.className = 'carousel-caption';
            caption.innerHTML = `<h3>${item.title || ''}</h3><p>${item.description || ''}</p>`;
            
            carouselItem.appendChild(img);
            carouselItem.appendChild(caption);
            carouselSlide.appendChild(carouselItem);
        });
        
        updateCarousel();
    }

    // Create navigation indicators
    function createIndicators() {
        indicatorsContainer.innerHTML = '';
        
        carouselItems.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
    }

    // Update carousel position
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(${-currentIndex * 100}%)`;
        
        // Update active indicator
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        updateCarousel();
        resetAutoSlide();
    }

    // Previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        updateCarousel();
        resetAutoSlide();
    }

    // Auto slide
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
        clearInterval(intervalId);
        startAutoSlide();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Pause on hover
    carouselSlide.addEventListener('mouseenter', () => clearInterval(intervalId));
    carouselSlide.addEventListener('mouseleave', startAutoSlide);

    // Initialize
    initCarousel();
});