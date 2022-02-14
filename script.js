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



const search = document.querySelector(".date-picker")
const input = document.querySelector(".input")
const result = document.querySelector(".relevant-news")

search.addEventListener("submit", retrieveNews)

function retrieveNews(e) {
    
    result.innerHTML = "" //Clears the page when a new date is submitted.
    e.preventDefault() //To prevent page from reloading automatically when a date is submitted.
  
  const apiKey = '6cc6d299133d49b389492392edecde03'
  let articleHeadline = input.value;
  let url = `https://newsapi.org/v2/everything?q=${articleHeadline}&apiKey=${apiKey}`
  
  
  console.log(articleHeadline);
  
  fetch(url)
  .then((response) => {
      return response.json()
    })
  .then((data) => {console.log(data)


//DISPLAY THE HEADLINES:
    data.articles.forEach(articles => {
        let li = document.createElement("li") //Creating a list of headlines.
        let a = document.createElement("a") //Creating the anchor tags to link to the articles.
        a.setAttribute('href', articles.url) //The anchor tag will open to the url of the article selected.
        a.setAttribute('target', '_blank') //Opens the article in a new tab.
        a.textContent = articles.title
        li.appendChild(a)
        result.appendChild(li) 
    })

  });

}
