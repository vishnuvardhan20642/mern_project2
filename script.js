const API_KEY = "dc382007faeb4097bbdd0263f3ed65af";
const url = "https://newsapi.org/v2/everything?q=";


window.addEventListener('load',()=> fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    console.log(data);
    bindData(data.articles);
}

function reload(){
    window.location.reload();
}

//make articles using template and append in main card container class
function bindData(articles){
    const cardsContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-news-card");
    
    //everytime we call bindData() 100 cards get appended to existing card
    //To remove existing cards before appending , we need to make inner HTML empty
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true); //to clone complete template 
        fillDataInCard(cardClone,article);        
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone,article){
    const newsImage = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone : "Asia/Jakarta"
    });
    newsSource.innerHTML = `${article.source.name} - ${date}`;
    cardClone.firstElementChild.addEventListener("click", () =>{
        window.open(article.url,"_target");
    });
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("news-input");

searchButton.addEventListener("click",() => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});