
// creating a variable to house the api request.


// sending the ajax response to request the data and then return a response with the data object.
function alertVehicleName() {
//var vehicleName = $(this).attr("data-name");
var queryURL =
"https://api.giphy.com/v1/gifs/search?api_key=OgPKbbyI46IXrLDcpEJOinhz6R4BqGfL&q=" + topics + "&limit=10&offset=0&lang=en";

$.ajax({
url: queryURL,
method: "GET"
}).then(function(response) {
console.log(response);
var topicsResults = response.data;
for (i = 0; i < topicsResults.length; i++) {

    if (topicsResults[i].rating === "g") {
        console.log(response.data);
        var topicsDiv = $("<div class='topics'>");
        var rating = response.data[i].rating;
        var p1 = $("<p>").text("Rating: " + rating);
        topicsDiv.append(p1);
        $("#buttons-div").prepend(topicsDiv);
    }


}
});
  }

var topics = [
    "cars",
    "trucks",
    "buses",
    "firetrucks",
    "tractors",
    "boats",
    "racecars",
    "bulldozers"
  ];

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
    var topic = $("#input-topics").val().trim();
    topics.push(topic);
    createButtons();
});

$(document).on("click", ".topics", alertVehicleName);

// function request to diplay initial buttons 
createButtons();
