const accesskey = "kc19GXb6u7Cs6DgNvOuSXGbt8C9dwnvZ9nvJyML40aY";

const formE1 = document.querySelector("form");
const inputE1 = document.querySelector("#search-input"); // Corrected selector
const searchResult = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputdata = "";
let page = 1;

async function searchImages() {
    inputdata = inputE1.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("searchResult");
        
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        
        searchResult.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
        showmore.style.display = "block";
    } else {
        showmore.style.display = "none";
    }
}

formE1.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmore.addEventListener("click", (event) => {
    event.preventDefault();
    searchImages();
});
