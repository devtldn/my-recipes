$.getJSON('/chicken', function (data) {
    $("#chicken").empty();

    for (let i = 0; i < data.length; i++) {
        $("#chicken").append(`<p data-id='${data[i]._id}'><img src='${data[i].Image}'>`);
        $("#chicken").append(`<p data-id='${data[i]._id}'><h4>${data[i].Dish}</h4>`);
        $("#chicken").append(`<p data-id='${data[i]._id}'><h6>${data[i].Summary}</h6>`);
        $("#chicken").append(`<a data-id='${data[i]._id}' href='${data[i].Link}' target='_blank'><h6>Get Recipe</h6></a><br>`);
    };
});

$(document).on("click", "#see-recipes", function (event) {
    $("#chicken").empty();

    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function () {
        $.ajax({
            method: "GET",
            url: "/chicken"
        }).done(function () {
            location.reload();
        });
    });
});

$(document).on("click", "p", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/chicken/" + thisId
    }).then(function (data) {
        console.log(data);
        
        $("#clicked-recipe").html(`"${data.Dish}"`);
        $("#modal-save").html(`<button type="button" class="btn btn-primary" id="save-note" data-id="${data._id}">Save</button>`)
        $("#modal1").show();
        $(".close").on("click", function() {
            $("#modal1").hide();
        });

        if (data.note) {
            $("#note-title").val(data.note.title);
            $("#note-body").val(data.note.body);
        };
    });
});

$(document).on("click", "#save-note", function() {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/chicken/" + thisId,
        data: {
            title: $("#note-title").val(),
            body: $("#note-body").val()
        }
    }).then(function(data) {
        console.log(data);
        
        $("#modal1").hide();
        $("#note-title").val("");
        $("#note-body").val("");
    });
});