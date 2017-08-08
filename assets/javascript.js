var topics = ["Baseball", "Football", "Golf", "Nascar"];
//Create a button to put in the topics array
function putTopics() {
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.text(topics[i]);
        newButton.attr("data-search", topics[i].toLowerCase());
        $("#sports-views").append(newButton);
    }
    addEvents();
};
//Create a function to get the images from the GIPHY API
function addEvents() {
    $('button').on('click', function() {
        console.log("Button Clicked");
        var x = $(this).data("search");
        console.log(x)

        var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
                url: queryUrl,
                method: 'GET'
            })
            .done(function(response) {

                $("#GIFArea").empty();
                for (var i = 0; i < response.data.length; i++) {
                    $("#GIFArea").prepend("<p>Rating: " + response.data[i].rating + "</p");
                    var img = $("<img>");
                    img.attr("src", response.data[i].images.downsized_still.url);
                    img.attr("data-still", response.data[i].images.downsized_still.url);
                    img.attr("data-animate", response.data[i].images.downsized.url);
                    img.attr("data-state", "still");
                    $("#GIFArea").prepend(img);
                }

                //toggle animation on image click
                $("img").on("click", function() {
                    console.log($(this));
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            })
    })

    //The Main Processes
    $("#add-sport").on("click", function(event) {
        console.log(" New sport");

        $("#sports-views").empty();
        var sportsText = $("#sports-input").val();
        topics.push(sportsText);
        event.preventDefault();
        putTopics();
    });

} //end addEvents()
putTopics();