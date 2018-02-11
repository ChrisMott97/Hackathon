$(document).ready(function() {
    $('input[type=radio][name=rating]').change(function() {
        $('input[type=submit][name=submit]').removeAttr("disabled");
        console.log(this.value);
        if (this.value == '1') {
            $('#preview').html('<i class="fa fa-star-half-empty"></i>');
        }
        else if (this.value == '2') {
            $('#preview').html('<i class="fa fa-star"></i>');
        }
        else if (this.value == '3') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star-half-empty"></i>');
        }
        else if (this.value == '4') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
        }
        else if (this.value == '5') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star-half-empty"></i>');
        }
        else if (this.value == '6') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
        }
        else if (this.value == '7') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star-half-empty"></i>');
        }
        else if (this.value == '8') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
        }
        else if (this.value == '9') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star-half-empty"></i>');
        }
        else if (this.value == '10') {
            $('#preview').html('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
            $('#preview').append('<i class="fa fa-star"></i>');
        }
        
    });
});