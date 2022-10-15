// Each slide will have its own index, for simplicity we will assign the array index to the slides
var slideIndex = 0;
// Tell us what slide we're on
var currentSlideIndex = 0;
// Array of our slides
var slideArray = [];


/*
This function will help us to create slide objects
  include: title, description, image, link when clicking the button on the slide,
and the id of each slide
*/
function Slide(title, subtitle, background, link) {
    this.title = title;
    this.subtitle = subtitle;
    this.background = background;
    this.link = link;
    // we need an id to target later using getElementById
    this.id = "slide" + slideIndex;
    // Add one to the index for the next slide number
    slideIndex++;
    // Add this Slide to our array
    slideArray.push(this);
}


// Create slide objects, you can create more

var walkingDead = new Slide(
    "John",
    "Back end developer",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "./assets/John.jpg"
);

var bigBang = new Slide(
    "Jacoub",
    "Senior front end developer",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "./assets/Jacoub.jpg"
);

var LastMan = new Slide(
    "krstian",
    "Senior UX",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "./assets/krstian.jpeg"
);

// From the created slide array, we proceed to put it into the HTML source
function buildSlider() {
    // A variable to hold all our HTML
    var myHTML;

    // Go through the Array and add the code to our HTML
    for (var i = 0; i < slideArray.length; i++) {
        myHTML +=
            "<div id='" +
            slideArray[i].id +
            "' class='singleSlide' style='background-image:url(" +
            slideArray[i].background +
            ");'>" +
            "<div class='slideOverlay'>" +
            "<h1>" +
            slideArray[i].title +
            "</h1>" +
            "<h4>" +
            slideArray[i].subtitle +
            "</h4>" +
            "<a href='" +
            slideArray[i].link +
            "' target='_blank'>Open Link</a>" +
            "</div>" +
            "</div>";
    }

    // Put the HTML we just created into the id #mySlider
    document.getElementById("mySlider").innerHTML = myHTML;

    // Also show the first slide
    document.getElementById("slide" + currentSlideIndex).style.left = 0;
}

// Call the execute function
buildSlider();

// Handling pressing the button to switch to the previous slide
function prevSlide() {
    // Find previous slides
    var nextSlideIndex;
    // If the slide index is 0, go to the last slide
    if (currentSlideIndex === 0) {
        nextSlideIndex = slideArray.length - 1;
    } else {
        // If not, reduce the stat by 1
        nextSlideIndex = currentSlideIndex - 1;
    }

    // Hide current slide, show "currentSlideIndex" slider
    document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
    document.getElementById("slide" + currentSlideIndex).style.left = 0;

    // Add a class to switch slides with animation defined in step 3
    document
        .getElementById("slide" + nextSlideIndex)
        .setAttribute("class", "singleSlide slideInLeft");
    document
        .getElementById("slide" + currentSlideIndex)
        .setAttribute("class", "singleSlide slideOutRight");

    // Update current slide value
    currentSlideIndex = nextSlideIndex;
}

// Handling clicking the button to move to the next slide
// The treatment is similar to the prevSlide shown above
function nextSlide() {
    var nextSlideIndex;
    if (currentSlideIndex === slideArray.length - 1) {
        nextSlideIndex = 0;
    } else {
        nextSlideIndex = currentSlideIndex + 1;
    }

    document.getElementById("slide" + nextSlideIndex).style.left = "100%";
    document.getElementById("slide" + currentSlideIndex).style.left = 0;

    document
        .getElementById("slide" + nextSlideIndex)
        .setAttribute("class", "singleSlide slide-in-right");
    document
        .getElementById("slide" + currentSlideIndex)
        .setAttribute("class", "singleSlide slideOutLeft");

    currentSlideIndex = nextSlideIndex;
}
