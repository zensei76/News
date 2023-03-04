//to get carousel elements
const container = document.getElementById("showOnLoad");
const carousel = document.getElementById("carousel-data");
const indicators = document.querySelector(".carousel-indicators");

//serach and submit button in nav bar---------------------------------------
const search = document.getElementById("search");
const submit = document.getElementById("submit");
//adding onclick event to submit to get search input----------------------------
submit.addEventListener("click", getCategory);

//to get dropdown option elements------------------------------------------------
const all = document.getElementById("all");
const national = document.getElementById("national");
const business = document.getElementById("business");
const sports = document.getElementById("sports");
const world = document.getElementById("world");
const politics = document.getElementById("politics");
const technology = document.getElementById("technology");
const startup = document.getElementById("startup");
const entertainment = document.getElementById("entertainment");
const miscellaneous = document.getElementById("miscellaneous");
const hatke = document.getElementById("hatke");
const science = document.getElementById("science");
const automobile = document.getElementById("automobile");
//Adding click event to all dropdown options---------------------------------------------
all.addEventListener("click", getCategory);
national.addEventListener("click", getCategory);
business.addEventListener("click", getCategory);
sports.addEventListener("click", getCategory);
world.addEventListener("click", getCategory);
politics.addEventListener("click", getCategory);
technology.addEventListener("click", getCategory);
startup.addEventListener("click", getCategory);
entertainment.addEventListener("click", getCategory);
miscellaneous.addEventListener("click", getCategory);
hatke.addEventListener("click", getCategory);
science.addEventListener("click", getCategory);
automobile.addEventListener("click", getCategory);

function getCategory(event) {
  event.preventDefault();
  let category;
  if (search.value) {
    category = search.value;
    console.log(`"${category}" category is searched`);
    getArticle(category);
  } else {
    category = this.value;
    console.log(`"${category}" category is selected`);
    getArticle(category);
  }
}

function getArticle(category) {
  console.log("Inside getArticle");
  let url = `https://inshorts.deta.dev/news?category=${category}`;
  console.log("Your url :" + url);
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Something went wrong");
    })
    .then((responseJson) => {
      responseJson = responseJson.data;
      console.log(responseJson);
      displayArticle(responseJson);
    })
    .catch((error) => {
      console.log(error);
    });
}

function displayArticle(articles) {
  console.log("Inside displayArticle");
  articles.forEach((article, index) => {
    if (index == 0) {
      indicators.innerHTML = `<li class= "indicator"data-target="#carouselExampleCaptions" data-slide-to="${index}" class="active"></li>`;
      carousel.innerHTML = `
            <div class="carousel-item active">
                <img class="image" src="${article.imageUrl}" class="d-block w-100" alt="...">
                <div class="carousel-content">                
                <h5 class="title">${article.title}</h5>
                <div class = "line"></div>
                    <div class="author-date">
                        <span class="author">Author: ${article.author}</span>
                        <span class="date">${article.date}</span>
                    </div>
                    <p class="content">${article.content}</p>
                    <a class = "readmore" href="${article.readMoreUrl}"target="_blank">Read More</a>
                </div>
            </div>
            `;
    } else {
      indicators.innerHTML += `<li class= "indicator" data-target="#carouselExampleCaptions" data-slide-to="${index}"></li>`;
      carousel.innerHTML += `
            <div class="carousel-item">
                <img class="image" src="${article.imageUrl}" class="d-block w-100" alt="...">
                <div class="carousel-content">                
                <h5 class="title">${article.title}</h5>
                <div class = "line"></div>
                    <div>
                        <span class="author">Author: ${article.author}</span>
                        <span class="date">${article.date}</span>
                    </div>
                    <p class="content">${article.content}</p>
                    <a class = "readmore" href="${article.readMoreUrl}"target="_blank">Read More</a>
                </div>
            </div>
            `;
    }
  });

  container.style.display = "block";
}
