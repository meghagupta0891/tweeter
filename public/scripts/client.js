$(document).ready(function() {
    $('.create-tweet-error').hide();
    //method to iterate through the list of tweets to append tweet element
    const renderTweets = function(tweets) {
        for(let tweet of tweets) {
            $('#tweets-container').prepend(createTweetElement(tweet));
        }
    }
    //create tweet element using the object
    const createTweetElement = function(tweet) {
        //jQuery method to get relative date from timestamp
        let timeAgo = $.timeago(tweet.created_at);
        let $tweet = `<article class="tweets">
            <header>
                <div class="header-avatar">
                    <img src="${tweet.user.avatars}">
                    <h5> ${tweet.user.name}</h5>
                    </div>
                    <div class="handleTweet">
                    <h6>${tweet.user.handle}</h6>
                </div>
            </header>
            <section class="tweet-message">
                <p>${tweet.content.text}</p>
            </section>
            <footer>
                <span>${timeAgo}</span>
                <span>
                    <i class="fa fa-flag"></i>
                    <i class="fa fa-retweet"></i>
                    <i class="fa fa-heart"></i>
                </span>
            </footer>
        </article>`;
        return $tweet;
    }
    //async call to get list of tweets from server
    $.ajax( "http://localhost:8080/tweets", { method: 'GET' })
        .then(function (data) {
            renderTweets(data);
    });
    //event listener for form submission
    $( "#create-tweet" ).submit(function( event ) {
        event.preventDefault();
        if($("#tweet-text").val().length == 0) {
            $('#create-tweet-error-message').html('Please enter a tweet message.');
            $('.create-tweet-error').show();
        }
        else if($("#tweet-text").val().length > 140) {
            $('#create-tweet-error-message').html('Please enter a tweet message upto 140 characters.');
            $('.create-tweet-error').show();
        }
        else {
            //jQuery method to convert the form data to query string parameters
            let queryStr = $(this).serialize();
            $.post('http://127.0.0.1:8080/tweets', $(this).serialize(), "json")
            .done(function(data) {
                console.log( "Data Loaded: " + data );               
            })
            .always(function(){
                $("#tweet-text").val('');
                $('#create-tweet-error-message').html('');
                $('.create-tweet-error').hide();
                //Re-fetch the updated tweets from server
                $.ajax( "http://localhost:8080/tweets", { method: 'GET' })
                .then(function (data) {
                    $('#tweets-container').text('');
                    renderTweets(data);
                });
            });
        }
    });
});
