$("#search").submit(function(e) {
    e.preventDefault();
    console.log("Hi");
    var url = '/lecturers/' + $("#query").val();
    $.get(url, function( lecturers ) {
        console.log(lecturers);
        $(".results").empty();
        $(".results").append('<h1> Search Results </h1>');
        $.each(lecturers, function(index, lecturer) {
            $(".results").append(
                '<div class="row">' +
                '<div class="col-sm-6 col-sm-offset-3">' +
                '<div class="well"><h3>' + 
            lecturer.firstname + ' ' + lecturer.lastname + '</h3><br>' +
            lecturer.subject + '</div> </div> </div>'
        );
        });
    });
});