$("#search").submit(function(e) {
    e.preventDefault();
    console.log("Hi");
    var url = '/api/lecturers/' + $("#query").val();
    $.get(url, function( lecturers ) {
        console.log(lecturers);
        $(".results").empty();
        $.each(lecturers, function(index, lecturer) {
            $(".results").append(
                '<br><div class="row"><div class="col-sm-6 col-sm-offset-3"><div class="well"><h3><a href="/lecturer/'+lecturer.username+'">' + 
            lecturer.firstname + ' ' + lecturer.lastname + '</a></h3><br>' +
            lecturer.subject + '</div> </div> </div>'
            );
        });
        $(".results").append(
            '<br><div class="row"><div class="col-sm-6 col-sm-offset-3"><div class="well"><h3><a href="/lecturer">'+
            'Can\'t find your lecturer? Add them!'
            +'</a></h3</div> </div> </div>'
            );
    });
    $('html, body').animate({
        scrollTop: $(".results").offset().top
    }, 2000);
});
