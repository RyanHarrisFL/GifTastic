// creating a variable to house the api request.
var topics = [
  "car",
  "truck",
  "bus",
  "firetruck",
  "tractor",
  "boat",
  "racecar",
  "bulldozer"
];

// sending the ajax response to request the data and then return a response with the data object.
function alertVehicleName() {
  var topic = $(this).attr("data-name");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=OgPKbbyI46IXrLDcpEJOinhz6R4BqGfL&q=" +
    topic +
    "&limit=10&offset=0&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    var topicsResults = response.data;
    for (i = 0; i < topicsResults.length; i++) {
      if (topicsResults[i].rating === "g") {
        console.log(response.data);
        var topicsDiv = $("<div class='float'>");
        var rating = response.data[i].rating;
        var p1 = $("<p>").text("Rating: " + rating);
        var topicsImage = $("<img>");
        // Adding attribues to create animation
        topicsImage.attr("src", topicsResults[i].images.fixed_height_still.url);
        topicsImage.attr("class", "gif");
        topicsImage.attr("data-state", "still");
        topicsImage.attr(
          "data-animate",
          topicsResults[i].images.fixed_height.url
        );
        topicsImage.attr(
          "data-still",
          topicsResults[i].images.fixed_height_still.url
        );
        topicsDiv.append(p1);
        topicsDiv.append(topicsImage);

        $("#image-div").prepend(topicsDiv);
      }
    }

    // Pause function
    $(".gif").on("click", function() {
      var state = $(this).attr("data-state");
      if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
    // Pause Function End
    
  });
}

// creating a function that creates buttons and pulls in the data from the object that display on the screen.
function createButtons() {
  $("#buttons-div").empty();

  for (i = 0; i < topics.length; i++) {
    var buttonsDiv = $("<button>");
    buttonsDiv.addClass("topics");
    buttonsDiv.attr("data-name", topics[i]);
    buttonsDiv.text(topics[i]);
    $("#buttons-div").append(buttonsDiv);
  }
}

//that takes input from form and pushes it to array.
$("#generate-buttons").on("click", function(event) {
  event.preventDefault();
  var topic = $("#input-topics")
    .val()
    .toLowerCase()
    .trim();
  topics.push(topic);
  createButtons();
});

$(document).on("click", ".topics", alertVehicleName);

// function request to diplay initial buttons
createButtons();
