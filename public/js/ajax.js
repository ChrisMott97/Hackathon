$("#search").click(function(){
    var url = '/lecturers/' + $("#query").val();
    $.get(url, function( lecturers ) {
        console.log(lecturers);
        $("#results").empty();
        $.each(lecturers, function(index, lecturer) {
            $("#results").append(
                '<div class="well">' + 
            lecturer.firstname + '<br>' +
            lecturer.lastname + '<br>' +
            lecturer.subject + '</div>'
        );
        });
    });
}); 
    