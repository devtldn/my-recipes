$.getJSON('/chicken', function(data) {
    for (let i = 0; i < data.length; i++) {
        $("#chicken").append(`<img src='${data[i].Image}'><br><br>`);
        $("#chicken").append(`<h4 class='note-this'>${data[i].Dish}</h4><br>`);
        $("#chicken").append(`<h6 class='note-this'>${data[i].Summary}</h6><br>`);
        $("#chicken").append(`<a href='${data[i].Link}' target='_blank'><h6>Get Recipe</h6></a><br><br>`);
    };
});

$(document).on("click", "#see-recipes", function() {
    $("#chicken").empty();
    
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function() {
        location.reload();
    });
});

// $(document).on("click", ".note-this", function() {
//     var thisId = $(this).attr("data-id");

//     $.ajax({
//         method: "GET",
//         url: "/chicken/" + thisId
//     }).then(function(data) {
//         $(".note-this").show();

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