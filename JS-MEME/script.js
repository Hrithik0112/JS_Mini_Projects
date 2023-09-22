const genMeme = document.getElementById("gen-meme");
const memeTitle = document.getElementById("meme-title");
const memeimg = document.getElementById("meme-img");
const memeAuthor = document.getElementById("meme-author");

const updateDetails = (url , title , author) => {
    memeimg.setAttribute("src", url);
    memeTitle.innerHTML = title;
    memeAuthor.innerHTML = author;
}


const generateMeme = ()  => {
    fetch("https://meme-api.com/gimme/wholesomememes")
    .then((response) => response.json())
    .then(data => 
        {updateDetails(data.url, data.title , data.author);
        });
};

genMeme.addEventListener("click", generateMeme);

generateMeme();