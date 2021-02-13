function loadFile(event){
    var image = document.getElementById("output");
    image.src = URL.createObjectURL(event.target.files[0])
}

async function handle(event){
    console.log("An image has arrived!");
    $("#emotion").html("Loading...");
    event.preventDefault();

    var myForm = document.getElementById("image-form");
    var payload = new FormData(myForm);

    var functionUrl = "https://jasonwufunction.azurewebsites.net/api/HttpTrigger1?code=DVvHIR0v7Bdlrl6gOAaloLLottcvx7FoXk61Zqzl9hvvtQTaiFGlrw=="

    const resp = await fetch(functionUrl, {
        method: "POST",
        body: payload,
    });

    var data = await resp.json();


console.log(data);
console.log(data.result[0].faceAttributes.emotion);
var emotion = data.result[0].faceAttributes.emotion;

var resultString = `
    <h3> Emotions in the image: </h3><br />
    <p> Anger: ${emotion.anger}</p>
    <p> Contempt: ${emotion.contempt}</p>
    <p> Disgust: ${emotion.disgust}</p>
    <p> Fear: ${emotion.fear}</p>
    <p> Happiness: ${emotion.happiness}</p>
    <p> Neutral: ${emotion.neutral}</p>
    <p> Sadness: ${emotion.sadness}</p>
    <p> Surprise: ${emotion.surprise}</p>
    `;

    $('#emotion').html(resultString);
}