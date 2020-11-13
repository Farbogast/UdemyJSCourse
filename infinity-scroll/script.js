const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded= 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey= "ZUB7nLkzagI4nHSVmWqnpr7QyZx3KRmiJ9AGvC-3BOM";
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//check all img loaded
function imgLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
        console.log('ready =', ready)
    }
};

// Helper Function to Set Attributes on DOM Elements 
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key])
    }
};

// Create elements for links & photos
function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log('total images', totalImages)
    //Run for each
    photosArray.forEach((photo) =>{
    // Create <a>
    const item= document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
        target: '_blank',
});
//Create Image
const img= document.createElement('img');

setAttributes(img, {
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description,
});
// Event listeners check img load
img.addEventListener('load', imgLoaded)
//Put img inside a, then put both inside Img container
item.appendChild(img)
imageContainer.appendChild(item)
});
};

// Function Get photos 

async function getPhotos(){
    try{
        const response = await fetch(apiUrl)
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //catch error here
    }
};

// Check scroll
window.addEventListener('scroll', () => {
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready=false;
        getPhotos();
    }
});

// On load
getPhotos();