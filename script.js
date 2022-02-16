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
const newsAPIKEY = "0339a12944af485e80cd4cdbb6541d75"
const baseNewsURL = "https://newsapi.org/v2/"

//FETCH THE ARTICLES
const search = document.querySelector(".date-picker")
const input = document.querySelector(".input")

const output = document.querySelector('output')
const result = document.querySelector(".relevant-news")

search.addEventListener("submit", retrieveNews)

function retrieveNews(e) {
    
    result.innerHTML = "" //Clears the page when a new date is submitted.
    e.preventDefault() //To prevent page from reloading automatically when a date is submitted.
  
    let articleHeadline = input.value;
    let url = `${baseNewsURL}everything?q=${articleHeadline}&apiKey=${newsAPIKEY}`
  
  
  console.log(articleHeadline);
  
  fetch(url)
  .then((response) => {
      return response.json()
    })
  .then((data) => {console.log(data)
    outputArticle(data.articles[0]) //Using the first article found for now, can change to something else later
        //DISPLAY THE HEADLINES:
    data.articles.forEach(articles => {
        let li = document.createElement("li") //Creating a list of headlines.
        let a = document.createElement("a") //Creating the anchor tags to link to the articles.
        let p = document.createElement("p") 
        a.setAttribute('href', articles.url) //The anchor tag will open to the url of the article selected.
        a.setAttribute('target', '_blank') //Opens the article in a new tab.
        a.textContent = articles.title
        p.textContent = articles.description
        li.appendChild(a) 
        result.appendChild(li)
        result.append(p)
    })
  }); 

}




/*
Output Area
*/


function outputArticle(article) {
    //Clearing output for new article
    output.innerHTML = ""
    //Fetching the different data
    const author = article.author;
    const description = article.description;
    const title = article.title;
    const linkURL = article.url;
    const imageURL = article.urlToImage;

    //Headline
    const headline = document.createElement('h2');
    headline.textContent = title;

    // Written By
    const writer = document.createElement('h3');
    writer.innerHTML = `Written by - ${author}`;

    //Synopsis
    const synopsis = document.createElement('p')
    synopsis.innerHTML = description
    
    //Image
    const articleImage = document.createElement('img');
    articleImage.src = imageURL;
    articleImage.alt = `Image for ${title}`
    //Probably needs a class as well

    //Creating sections for each part
    const wordSection = document.createElement('article');
    const imageSection = document.createElement('article');

    //Apending to specific sections
    wordSection.append(headline, writer, synopsis);
    imageSection.append(articleImage);
    //Appending sections to overall output area
    output.append(wordSection, imageSection)
}