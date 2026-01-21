const URL = "https://cat-fact.herokuapp.com/facts";

const getVideo = async () => {
    console.log("Fetching video data...");
    let response = await fetch(URL); 
    console.log("Response received.", response); //JSON Format
}