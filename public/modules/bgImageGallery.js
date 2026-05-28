console.log("Image Gallery module loaded");

async function initialise_backgroundImages(){
    console.log("initliasing background images");
    backgroundImageURLS = await retrieveImageUrls() 
    generate_AttributionElem();
    randomBackgroundImage()
    updateImageAttribution();
    startBackgroundImageRotation();
};


function generate_AttributionElem(){

    let elem = document.createElement("div");
    elem.id = "bgImageArtist";
    elem.className = "pill_bgImageAttribution";
    elem.dataset.link = "#"
    
    let para = document.createElement("p");
    para.innerText = ``;

    elem.addEventListener("click", (event) => {
        let link = elem.dataset.link;
        console.log("link: ", link);
        window.open(`https://www.google.com/search?tbm=isch&q=${link}`, '_blank')
    });


    elem.appendChild(para);
    document.body.appendChild(elem);


}


function randomBackgroundImage() {
    const randomIndex = Math.floor(Math.random() * backgroundImageURLS.length);
    document.documentElement.style.setProperty('--bg_image', `url(${backgroundImageURLS[randomIndex]})`);
    updateImageAttribution();
}

function refreshBackgroundImage() {
    const string = getComputedStyle(document.documentElement).getPropertyValue('--bg_image');
    const currentURL = string.match(/url\(["']?([^"']*)["']?\)/);
    let array = backgroundImageURLS;
    let currentIndex = -1;
    if (currentURL) {
        currentIndex = array.indexOf(currentURL[1]);
        if( currentIndex === array.length - 1){currentIndex = -1;}
    }
    document.documentElement.style.setProperty('--bg_image', `url(${backgroundImageURLS[currentIndex + 1]})`);
    updateImageAttribution()
    // preload the next image
    let nextIndex = currentIndex + 2;
    if (nextIndex >= array.length) { nextIndex = nextIndex - array.length; }
    const img = new Image();
    img.src = backgroundImageURLS[nextIndex];
}

function updateImageAttribution(){
    let string = document.documentElement.style.getPropertyValue('--bg_image'); 
    let nameArray = string.split("/").pop().split("_");
    let firstName = nameArray[0].charAt(0).toUpperCase()+nameArray[0].slice(1); 
    let lastName = nameArray[1].charAt(0).toUpperCase()+nameArray[1].slice(1);;

    let elem = document.getElementById("bgImageArtist");
    elem.dataset.link = `${firstName} ${lastName}`;
    elem.children[0].innerText = `IMAGE: ${firstName} ${lastName}`;
}


// a function that calls refreshBackgroundImage() evenry 30 min
    function startBackgroundImageRotation() {
    console.log("starting background image rotation");
    setInterval(refreshBackgroundImage, 5000); 
}