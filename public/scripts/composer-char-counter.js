$(document).ready(function() {
    let counter = 140;
    $("#tweet-text").keydown(function(event) {
        //update counter whenever text in the input text box updates
        var charsLeft = counter - $(this).val().length;
        $(this).closest('section').find('.counter').html(charsLeft);
        if(charsLeft >= 0) {
            $(this).closest('section').find('.counter').removeClass('red-counter');
        }
        else {
            $(this).closest('section').find('.counter').addClass('red-counter');
        }
    })
  });
