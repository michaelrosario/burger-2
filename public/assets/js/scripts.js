$(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    if($("#burger_name").val().length > 3) {
        $("#burger_name").removeClass("error");
        var newBurger = {
            burger_name: $("#burger_name").val().trim(),
            devoured: 0
          };
      
          console.log("newBurger",newBurger);
      
          // Send the POST request.
          $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
          }).then(
            function() {
              console.log("created new burger");
              // Reload the page to get the updated list
              location.reload();
            }
          );

    } else {
        $("#burger_name").addClass("error");
    }
    
  });

  $("#burger_name").on("focus",function(){
      $(this).removeClass("error");
  });

  $(".ready-count").html("["+$(".burgers-ready li").length +" Burgers]");

  $(".devoured-count").html("["+$(".burgers-devoured li").length +" Burgers]");


  $(".devour").on("click", function(event) {
    var id = $(this).data("id");
    var devouredState = {
      devoured: 1
    };

    // Send the PUT request.
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("devoured", devouredState);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });