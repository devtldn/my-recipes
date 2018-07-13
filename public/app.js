$.getJSON('/chicken', function(data) {
    for (let i = 0; i < data.length; i++) {
        $("#chicken").append(`<p data-id='${data[i]._id}'><img src='${data[i].Image}'>`);
        $("#chicken").append(`<p data-id='${data[i]._id}'><h4 class='note-this'>${data[i].Dish}</h4>`);
        $("#chicken").append(`<p data-id='${data[i]._id}'><h6 class='note-this'>${data[i].Summary}</h6>`);
        $("#chicken").append(`<a data-id='${data[i]._id}' href='${data[i].Link}' target='_blank'><h6>Get Recipe</h6></a><br>`);
    };
});

$(document).on("click", "#see-recipes", function() {
    $("#chicken").empty();
    
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).done(function() {
        location.reload();
    });
});

$(document).on("click", "p", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/chicken/" + thisId
    }).then(function(data) {
        $("#modal1").on('shown.bs.modal');
    });
});

// $(document).on("click", "#save-note", function() {
//     var thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "POST",
//         url: "/articles/" + thisId,
//         data: {
//             title: $("#modalTitle").val(),
//             body: $("#modalBody").val()
//         }
//     }).then(function(data) {
//         console.log("SAVED NOTE ****", data);
//         $("#")
//     })
// })