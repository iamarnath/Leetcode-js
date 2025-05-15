// Mock API data
const allImagesApi = [
    { link: 'https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g', id: 1, title: 'Image 1', tags: ['nature', 'bird'] },
    { link: 'https://fastly.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68', id: 2, title: 'Image 2', tags: ['nature'] },
    { link: 'https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I', id: 3, title: 'Image 3', tags: ['animal', 'wildlife'] },
    { link: 'https://example.com/image4.jpg', id: 4, title: 'Image 4', tags: ['landscape', 'mountain'] },
    { link: 'https://example.com/image5.jpg', id: 5, title: 'Image 5', tags: ['bird', 'wildlife'] },
];

// Mock API function to get image details
async function getImageByIdAPI(id) {
    // In a real app, this would be a fetch call
    const mockData = {
        1: { id: 1, title: 'Image 1', toTake: "2023-05-15", content: "Beautiful nature scene with a bird" },
        2: { id: 2, title: 'Image 2', toTake: "2023-06-20", content: "Forest landscape" },
        3: { id: 3, title: 'Image 3', toTake: "2023-07-10", content: "Wild animal in its habitat" },
        4: { id: 4, title: 'Image 4', toTake: "2023-08-05", content: "Mountain view at sunset" },
        5: { id: 5, title: 'Image 5', toTake: "2023-09-12", content: "Rare bird species" },
    };
    return mockData[id];
}

// DOM elements
const gallery = document.getElementById('gallery');
const tagFiltersContainer = document.getElementById('tag-filters');
const modal = document.getElementById('image-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDate = document.getElementById('modal-date');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close');

// State
let selectedTags = [];

// Initialize the app
function init() {
    renderTagFilters();
    renderGallery();
    setupEventListeners();
}

// Get all unique tags from images
function getAllTags() {
    const allTags = new Set();
    allImagesApi.forEach(image => {
        image.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags);
}

// Render tag filter checkboxes
function renderTagFilters() {
    const tags = getAllTags();
    
    tags.forEach(tag => {
        const container = document.createElement('div');
        container.className = 'filter-tag';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `tag-${tag}`;
        checkbox.value = tag;
        
        const label = document.createElement('label');
        label.htmlFor = `tag-${tag}`;
        label.textContent = tag;
        
        container.appendChild(checkbox);
        container.appendChild(label);
        tagFiltersContainer.appendChild(container);
    });
}

// Filter images based on selected tags
function filterImages() {
    if (selectedTags.length === 0) {
        return allImagesApi;
    }
    
    return allImagesApi.filter(image => {
        return selectedTags.every(tag => image.tags.includes(tag));
    });
}

// Render gallery images
function renderGallery() {
    gallery.innerHTML = '';
    const filteredImages = filterImages();
    
    filteredImages.forEach(image => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'image-container';
        imgContainer.dataset.id = image.id;
        
        const img = document.createElement('img');
        img.src = image.link;
        img.alt = image.title;
        
        imgContainer.appendChild(img);
        gallery.appendChild(imgContainer);
    });
}

// Format date to MM/DD/YY
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${day}/${year}`;
}

// Show modal with image details
async function showImageDetails(imageId) {
    const imageDetails = await getImageByIdAPI(imageId);
    
    modalTitle.textContent = imageDetails.title;
    modalImage.src = allImagesApi.find(img => img.id === imageId).link;
    modalDate.textContent = `Date: ${formatDate(imageDetails.toTake)}`;
    modalContent.textContent = imageDetails.content;
    
    modal.style.display = 'flex';
}

// Setup event listeners
function setupEventListeners() {
    // Tag filter change event using event delegation
    tagFiltersContainer.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            const tag = e.target.value;
            
            if (e.target.checked) {
                selectedTags.push(tag);
            } else {
                selectedTags = selectedTags.filter(t => t !== tag);
            }
            
            renderGallery();
        }
    });
    
    // Image click event using event delegation
    gallery.addEventListener('click', (e) => {
        // Find the closest image container
        const imageContainer = e.target.closest('.image-container');
        if (imageContainer) {
            const imageId = parseInt(imageContainer.dataset.id);
            showImageDetails(imageId);
        }
    });
    
    // Close modal events
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize the app
init();