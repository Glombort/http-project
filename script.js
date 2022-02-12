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



const search = document.querySelector(".submit-date")
const input = document.querySelector(".input")
const result = document.querySelector(".relevant-news")

search.addEventListener("submit", retrieveNews)

function retrieveNews(e) {
  e.preventDefault() //to prevent page from reloading 
  
  //APIkey:
  const apiKey = '6cc6d299133d49b389492392edecde03'
  
  let reference = input.value;
  //URL:
  
  let url = `https://newsapi.org/v2/everything?q=${reference}&apiKey=${apiKey}`
  console.log(reference);
  
  fetch(url)
  .then((response) => {
      return response.json()
    })
  .then((data) => {console.log(data)
  });

  //fetch url
  //then get reponse
  //data => response.json
}
