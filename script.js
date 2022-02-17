//DATE-PICKER AUTOMATIC UPDATE

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
const newsAPIKEY = "6cde06a0b08240579bfd3ff55da2decf"
const baseNewsURL = "https://newsapi.org/v2/"

//FETCH THE ARTICLES
const search = document.querySelector(".date-picker")
const input = document.querySelector(".input")

const output = document.querySelector('output')
// const result = document.querySelector(".relevant-news")

//Get the button for the fun for later
const fun = document.querySelector(".fun");

search.addEventListener("submit", retrieveNews)

function retrieveNews(e) {
    
    // result.innerHTML = "" //Clears the page when a new date is submitted.
    e.preventDefault() //To prevent page from reloading automatically when a date is submitted.
    fun.classList.remove("hide")

    let articleHeadline = input.value;
    let url = `${baseNewsURL}everything?q=${articleHeadline}&apiKey=${newsAPIKEY}`

  
  fetch(url)
  .then((response) => {
      return response.json()
    })
  .then((data) => outputArticle(data.articles[0])) //Using the first article found for now, can change to something else later
}




/*
Output Area
*/


function outputArticle(article) {
  //Clearing output for new article
  output.innerHTML = ""
  //Fetching the different data
  const source = article.source.name
  const author = article.author;
  const description = article.description;
  const title = article.title;
  const linkURL = article.url;
  const imageURL = article.urlToImage;
  //Takes first part of linkURL which is the source of the content.
  const sourceURL = `${linkURL.split(".com")[0]}.com`

  //Headline
  const headline = document.createElement('h2');
  headline.textContent = title;
  headline.classList.add("headline", "news-article")

  // Written By
  const writer = document.createElement('h3');
  //If no author in API use the source name
  if (author == null) {
    writer.innerHTML = `Written by - <a href=${sourceURL}>${source}</a>`;
  } else {
    writer.innerHTML = `Written by - ${author}`;
  }
  
  writer.classList.add("news-article")

  //Synopsis
  const synopsis = document.createElement('p')
  synopsis.innerHTML = `${description} <a href=${linkURL}>Read More</a>`
  synopsis.classList.add("news-article")
  
  //Image
  const articleImage = document.createElement('img');
  articleImage.src = imageURL;
  articleImage.alt = `Image for ${title}`
  articleImage.classList.add("article-image", "center", "news-article")

  //Creating sections for each part
  const wordSection = document.createElement('article');
  const imageSection = document.createElement('article');

  wordSection.classList.add("center", "stack-sm")
  imageSection.classList.add("center")
  //Apending to specific sections
  wordSection.append(headline, writer, synopsis);
  imageSection.append(articleImage);
  //Appending sections to overall output area
  output.append(wordSection, imageSection)
}


/*
Secondary API's
*/

//Urls for other APIs, these don't need keys.
const buzzURL = "https://corporatebs-generator.sameerkumar.website/"
const picsumURL = "https://picsum.photos/600/400" //Can change the numbers for sizing when have proper layout

//Event Listener for clicking the button
fun.addEventListener("submit", secondaryAPI);

function secondaryAPI(e) {
    
    e.preventDefault();

    fetch(buzzURL)
    .then(response => response.json())
    .then(json => json["phrase"])
    .then(phrase => {
        const headline = document.querySelector(".headline")
        headline.innerHTML = phrase
    })

    fetch(picsumURL)
    .then(response => response["url"])
    .then(url => {
        const articleImage = document.querySelector(".article-image");
        articleImage.src = url
    })

}


//INSTRUCTIONS:
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
