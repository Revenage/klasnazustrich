/**
 * Created by reven on 19.01.2016.
 */
$(function () {

    var OlderPosts = (function () {

        var posts = $('.post-previews').find('.post-preview');
        var hideposts = function () {
            posts.each(function (index) {
                if (index >= 3) {
                    $(this).addClass('hide')
                } else {
                    $(this).removeClass('hide')
                }
            });
        };

        var showposts = function () {
            posts.removeClass('hide');
        };

        hideposts();
        var trig = false;
        $('#older-posts').on('click', function (e) {
            e.preventDefault();
            if (trig) {
                hideposts();
                trig = false;
            } else {
                showposts();
                trig = true;
            }
        });
    });

    var MailSending = function () {

        $('#send-button').on('click', function (e) {
            e.preventDefault();
            $.ajax({
                    type: 'POST',
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: {
                        key: 'vvYHIWvAZKQooptpUCrd_Q',
                        message: {
                            from_email: 'kozak.olga.info@gmail.com',
                            to: [
                                {
                                    email: 'info@klasnazustrich.esy.es',
                                    name: 'name',
                                    type: 'to'
                                }
                            ],
                            autotext: 'true',
                            subject: 'YOUR SUBJECT HERE!',
                            html: 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
                        }
                    }
                })
                .done(function (response) {
                    console.log(response); // if you're into that sorta thing
                });
        })

    };


    MailSending();
    OlderPosts();
    /* Show/hide posts on home page*/
});