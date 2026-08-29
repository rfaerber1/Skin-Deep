// Code for running the machine learning model
// Exported from teachingmachine
// Altered to also take image as input as well,
// and to support desired user interaction

window.onload = function () {
    initializeML(0);
    startML();
};

// the links to my models provided by Teachable Machine export panel
const modelUrl = [
    "https://teachablemachine.withgoogle.com/models/EcXCpqYkV/", //skewed towards people of color
    "https://teachablemachine.withgoogle.com/models/Fmrd-Kw7b/", //skewed towards white people
    "https://teachablemachine.withgoogle.com/models/kC21ijCUQ/", // equal representation in data
];

let classNames = ["Not a Person", "Darker Skin", "Lighter Skin"]; //because some were being cut off

let state = "none"; //determines which input is being used
let currentModel = null; //reflects current model being used
let hidden = true; //determines if model interaction is hidden

const myNode = document.getElementById("webcam-container"); //used to display current input
let currentImg; //will keep track of what image was last used for input
let currentModelButton = document.getElementById("model0Button"); //for reflecting to user what the current model in use is

let model, webcam, labelContainer, maxPredictions, img;

// shows and hides model interaction given button interaction
// sets up components to reflect previous interaction (if any)
async function startML() {
    if (hidden == true) {
        hidden = false;

        document.getElementById("ml-model").style.display = "block";

        if (currentModel == -1) {
            currentModel = 0;
            currentModelButton = document.getElementById("model0Button");
        }
        currentModelButton.style.background = "white";
        initializeML(currentModel);

        if (state == "camera2") {
            cameraInit();
        } else if (state == "image") {
            currentImg.style.width = "75px";
            currentImg.style.height = "75px";
        }
    } else {
        hidden = true;

        document.getElementById("ml-interaction-blurb").style.display = "block";
        document.getElementById("ml-model").style.display = "none";
        document.getElementById("interact").innerHTML = "Interact!";

        if (state == "camera") {
            await webcam.stop(); //turns camera off
            myNode.removeChild(myNode.lastChild);
            state = "camera2"; //need to reset camera
        } else if (state == "image") {
            currentImg.style.width = "50px";
            currentImg.style.height = "50px";
        }
    }
}

// load the model
async function initializeML(num) {

    if (num != currentModel || model == null) {
        const modelURL = modelUrl[num] + "model.json";
        const metadataURL = modelUrl[num] + "metadata.json";

        //update button style
        currentModelButton.setAttribute("style", "background-color: gray;");
        currentModelButton = document.getElementById("model" + num + "Button")
        
        currentModelButton.setAttribute("style", "background-color: white;");        
        currentModel = num;

        // load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        if (state == "none" || state == "image") {
            imageInit();
        } else if (state == "camera") {
            console.log("passed if statement");
            cameraInit();
        }
    }
}

// get the image to input into model
async function imageInit() {
    if (currentModel == -1) {
        return;
    } else if (state == "image") {
        await predict(image);
        return;
    } else {
        if (state == "camera") {
            await webcam.stop(); //turns camera off
            myNode.removeChild(myNode.lastChild);
        }
        state = "image";
    }

    image = new Image();
    image.style.width = "200px";
    image.style.height = "200px";

    if (currentImg == null) {
        image.src = document.getElementById("image1").src;
        currentImg = document.getElementById("image1");
    } else {
        image.src = currentImg.src;
    }

    currentImg.style.transitionDuration = "0.5s";
    currentImg.style.width = "75px";
    currentImg.style.height = "75px";

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(image);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        // and add class labels
        labelContainer.appendChild(document.createElement("div"));
    }

    await predict(image);
}

// updates image being used for input
async function updateImg() {
    if (state == "image") {
        currentImg.style.transitionDuration = "0.5s";
        currentImg.style.width = "50px";
        currentImg.style.height = "50px";

        currentImg = event.currentTarget;
        currentImg.style.width = "75px";
        currentImg.style.height = "75px";

        image.src = event.currentTarget.src;
        await predict(image);
    }
}

// setup the webcam
async function cameraInit() {
    if (currentModel == -1) {
        return;
    } else if (state == "camera") {
        return;
    } else {
        if (state == "image") {
            myNode.removeChild(myNode.lastChild);
            currentImg.style.transitionDuration = "0.5s";
            currentImg.style.width = "50px";
            currentImg.style.height = "50px";
        }
        state = "camera";
    }

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(cameraLoop);

    // append elements to the DOM
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        // and add class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

// keeps the camera running
async function cameraLoop() {
    if (state == "camera") {
        webcam.update(); // update the webcam frame
        await predict(webcam.canvas);
        window.requestAnimationFrame(cameraLoop);
    }
}

// run the webcam image or picture through the image model
async function predict(input) {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(input);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            classNames[i] + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}

//scrolling to see more images to use

let images = [
    "../imgs/ml_experiment_imgs/Person3.jpg",
    "../imgs/ml_experiment_imgs/Person4.jpg",
    "../imgs/ml_experiment_imgs/Person5.jpg",
    "../imgs/ml_experiment_imgs/Person6.jpg",
    "../imgs/ml_experiment_imgs/Person7.jpg",
    "../imgs/ml_experiment_imgs/Person8.jpg",
    "../imgs/ml_experiment_imgs/Person10.jpg",
    "../imgs/ml_experiment_imgs/Person11.jpg",
    "../imgs/ml_experiment_imgs/Person14.jpg",
    "../imgs/ml_experiment_imgs/Person16.jpg",
    "../imgs/ml_experiment_imgs/Person18.jpg",
    "../imgs/ml_experiment_imgs/Person19.jpg",
    "../imgs/ml_experiment_imgs/Person20.jpg",
    "../imgs/ml_experiment_imgs/Person21.jpg",
    "../imgs/ml_experiment_imgs/Person22.jpg",
    "../imgs/ml_experiment_imgs/Person24.jpg",
    "../imgs/ml_experiment_imgs/Person23.jpg",
    "../imgs/ml_experiment_imgs/NonPerson2.jpg",
    "../imgs/ml_experiment_imgs/NonPerson1.jpg",
    "../imgs/ml_experiment_imgs/NonPerson3.jpg",
    "../imgs/ml_experiment_imgs/NonPerson4.jpg",
];

let imageID = ["image1", "image2", "image3"];

let leftMostImg = 0;
let updateCurrentImg = false;
document.getElementById("imageRight").style.background = "gray";

// update images based on button being pressed
async function goLeft() {
    if (leftMostImg == images.length - 3) {
        return;
    } else {
        updateCurrentImg = false;
        if (currentImg == document.getElementById("image1")) {
            updateCurrentImg = true;
        }

        if (leftMostImg == 0) {
            document.getElementById("imageRight").style.background = "white";
        }

        leftMostImg += 1;

        if (leftMostImg == images.length - 3) {
            document.getElementById("imageLeft").style.background = "gray";
        }

        document.getElementById("image1").src = images[leftMostImg];
        document.getElementById("image2").src = images[leftMostImg + 1];
        document.getElementById("image3").src = images[leftMostImg + 2];

        if (updateCurrentImg == true) {
            currentImg = document.getElementById("image1");
            image.src = currentImg.src;
            await predict(image);
        } else {
            for (let i = 0; i < 3; i++) {
                if (image.src == document.getElementById(imageID[i]).src) {
                    currentImg.style.transitionDuration = "0.5s";
                    currentImg.style.width = "50px";
                    currentImg.style.height = "50px";

                    currentImg = document.getElementById(imageID[i]);
                    currentImg.style.width = "75px";
                    currentImg.style.height = "75px";
                    break;
                }
            }
        }
    }
}

// update images based on button being pressed
async function goRight() {
    if (leftMostImg === 0) {
        return;
    } else {
        updateCurrentImg = false;
        if (currentImg == document.getElementById("image3")) {
            updateCurrentImg = true;
        }

        if (leftMostImg == images.length - 3) {
            document.getElementById("imageLeft").style.background = "white";
        }

        leftMostImg -= 1;

        if (leftMostImg == 0) {
            document.getElementById("imageRight").style.background = "gray";
        }

        document.getElementById("image1").src = images[leftMostImg];
        document.getElementById("image2").src = images[leftMostImg + 1];
        document.getElementById("image3").src = images[leftMostImg + 2];

        if (updateCurrentImg == true) {
            currentImg = document.getElementById("image3");
            image.src = currentImg.src;
            await predict(image);
        } else {
            for (let i = 0; i < 3; i++) {
                if (image.src == document.getElementById(imageID[i]).src) {
                    currentImg.style.transitionDuration = "0.5s";
                    currentImg.style.width = "50px";
                    currentImg.style.height = "50px";

                    currentImg = document.getElementById(imageID[i]);
                    currentImg.style.width = "75px";
                    currentImg.style.height = "75px";
                    break;
                }
            }
        }
    }
}
