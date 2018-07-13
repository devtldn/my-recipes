$.getJSON('/chicken', function(data) {
    for (let i = 0; i < data.length; i++) {
        $("#chicken").append(`<img src='${data[i].Image}'><br>`);
        $("#chicken").append(`<h4 class='note-this'>${data[i].Dish}</h4><br>`);
        $("#chicken").append(`<h6 class='note-this'>${data[i].Summary}</h6><br>`);
        $("#chicken").append(`<a href='${data[i].Link}'><h6>Get Recipe</h6></a>`);
    };
});

$(document).on("click", "#see-recipes", function() {
    $("#chicken").empty();

    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        $.ajax({
            method: "GET",
            url: "/chicken/" + thisId
        }).then(function(data) {
            $("#chicken").append(`<img src='${data.Image}'><br>`);
            $("#chicken").append(`<h4 class='note-this'>${data.Dish}</h4><br>`);
            $("#chicken").append(`<h6 class='note-this'>${data.Summary}</h6><br>`);
            $("#chicken").append(`<a href='${data.Link}'><h6>Get Recipe</h6></a>`);
        });
    });
});

// $(document).on("click", ".note-this", function() {
//     var thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "GET",
//         url: "/chicken/" + thisId
//     }).then(function(data) {
//         console.log(data);

//         if (data.note) {
//             $("#noteTitle").val(data.note.title);
//             $("#noteBody").val(data.note.body);
//         }
//     })
// })

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