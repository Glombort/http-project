var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd<10) {
    dd='0'+dd
}

if (mm<10) {
    mm='0'+mm
}

today =yyyy+'-'+mm+'-'+dd;

document.getElementById("date-picker").setAttribute("max", today);

//Set variables for the api key and base url used in all fetches to the news api
const newsAPIKEY = "0339a12944af485e80cd4cdbb6541d75"
const baseNewsURL = "https://newsapi.org/v2/"

function getImage() {
    let URL = `${baseNewsURL}top-headlines?country=us&apiKey=${newsAPIKEY}` //Will change this when search implemented
    
    return fetch(URL)
    .then(response => response.json())
    .then(response => response.articles[0])//Will also change this to searched articles
    .then(response => response.urlToImage)
    .then(imageURL => {
        //Items to put to output area, just adding the image for now
        const articleImage = document.createElement('img')
        articleImage.src = imageURL;
        //Will add alt when using searched film
    //Probably needs a class as well
        //Returns image element containing the articles image.
        return articleImage
    })
    .catch(console.error)
}

/*
Output area
*/
const output = document.querySelector('output')
const form = document.querySelector('form')
form.addEventListener('submit', function(event){userOutput(event)});

function userOutput(event) {
    //Lets JS control form
    event.preventDefault();
    
    //Adding items to <output>
    getImage().then(image => output.append(image))
}