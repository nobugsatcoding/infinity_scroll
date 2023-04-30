const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;   
const apiKey = 'O0ymkSpQroRih4KiLcr3EEOa3bnxyXYYdD_heglGSJI';
// const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 10;
        console.log(ready);
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

//Helper function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for links & Photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    // run function for each object in photosArray
    photosArray.forEach((photo) => {
        // create link to splash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttribute(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create <img> for photos
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event listener cheking when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        // console.log(photosArray)
        displayPhotos();
    } catch (error) {
        imageContainer.innerHTML = `<p> Error </p>`;
        console.log(error);
        
    }
}

// Check if scrolling near bottom of page and load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= window.document.body.offsetHeight - 1000 && ready) {
        getPhotos()
        ready = false;
    };
})

// On Load
getPhotos();

