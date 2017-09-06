

$(document).ready(function(){
    $(".results").empty();
    $(".results").hide();
        var videoGames = ["Super Mario", "Legend of Zelda", "Runescape", "Metroid", "World of Warcraft", "League of Legends"]
    
        function removeList(){
            $(".game-list").empty();
        }
    
    
        function gamelist(){
    
            removeList();
    
            for(i = 0; i < videoGames.length; i++){
                    var list = $("<button>");
                    list.addClass("game-button");
                    list.attr("data-name", videoGames[i])
                    list.text(videoGames[i])
                    $(".game-list").append(list);
            }
        }
    
        function displayGames(){
    
            var selectedGame = $(this).attr("data-name");
    
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            selectedGame + "&api_key=2e98084fedf14507a3cef6efe3a5edf0&limit=15";
    
            $.ajax({
                url: queryURL,
                method: "GET",
            }).done(function(result){
                    var data = result.data;
                    $(".results").empty();
                    $(".results").show();
    
                    for(i = 0; i < data.length; i++ ){
                        img = $("<img>");
                        img.addClass("gif")
                        img.attr("src", data[i].images.fixed_height_still.url)
                        img.data("still", data[i].images.fixed_height_still.url)
                           .data("animate",data[i].images.fixed_height.url)
                           .data("state", "still")
                           .data("state", "animate")
                        img.on("mouseenter", function(){
                            var url = $(this).data("animate");
                            $(this).attr("src", url);
                            $(this).data("state", "animate");
                        });
                        img.on("mouseleave", function(){
                            var stayurl = $(this).data("still");
                            $(this).attr("src", stayurl);
                            $(this).data("state", "still");
                        });
                        rating = $("<div>");
                        rating.addClass("gif-rating");
                        rating.html("Rating: " + data[i].rating);
                        h2 = $("<hr>");
                        $(".results").append(img,rating,h2);
    
                    }
                       
                })
        }
    
        gamelist();
    
    
        $(".search-button").on("click", function(event){
    
            event.preventDefault();
    
            var game = $("#search-bar").val();
    
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            game + "&api_key=2e98084fedf14507a3cef6efe3a5edf0&limit=15";
    
            videoGames.push(game);
            $("#search-bar").val("");
    
                $.ajax({
                    url: queryURL,
                    method: "GET",
                }).done(function(result){
                    var data = result.data;
                    $(".results").empty();
                    for(i = 0; i < data.length; i++ ){
                        img = $("<img>");
                        img.addClass("gif")
                        img.attr("src", data[i].images.fixed_height_still.url)
                        img.data("still", data[i].images.fixed_height_still.url)
                           .data("animate",data[i].images.fixed_height.url)
                           .data("state", "still")
                           .data("state", "animate")
                        img.on("mouseenter", function(){
                            var url = $(this).data("animate");
                            $(this).attr("src", url);
                            $(this).data("state", "animate");
                        });
                        img.on("mouseleave", function(){
                            var stayurl = $(this).data("still");
                            $(this).attr("src", stayurl);
                            $(this).data("state", "still");
                        })
                        rating = $("<div>");
                        rating.addClass("gif-rating");
                        rating.html("Rating: " + data[i].rating);
                        h2 = $("<hr>");
                        $(".results").append(img,rating,h2);
                    }
                       
                    })
            $(".results").show();
            gamelist();
        });
    
    
    
        $("#remove").on("click", function(){
            videoGames.pop();
            removeList();
            gamelist();                
        });
    
        $("#clear").on("click", function(){
            $(".results").empty();
            $(".results").hide();
        });
    
    
        $(document).on("click", ".game-button", displayGames);
});