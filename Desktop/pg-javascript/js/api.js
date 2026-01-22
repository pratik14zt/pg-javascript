const URL = "https://cat-fact.herokuapp.com/facts";
const factVideo = document.querySelector("#fact");
const btn = document.querySelector("#btn");

const getVideo = async () => {
    console.log("Fetching video data...");
    let response = await fetch(URL); 
    console.log("Response received.", response); //JSON Format
    let data = await response.json();
    factVideo.innerText = data[2].text;
};

btn.addEventListener("click", getVideo);