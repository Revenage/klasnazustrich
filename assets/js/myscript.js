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
            var name = $('#name').val();
            var email = $('#email').val();
            var tel = $('#phone').val();
            var message = $('#message').val();
            var text =
                '<h4>Контактные данные:</h4>' +
                '<ul>' +
                '<li>'+name+'</li>' +
                '<li>'+email+'</li>' +
                '<li>'+tel+'</li>' +
                '</ul>' +
                '<hr>' +
                '<h4>Текст сообщения</h4>' +
                '<p>'+message+'</p>';
            $.ajax({
                    type: 'POST',
                    url: 'https://mandrillapp.com/api/1.0/messages/send.json',
                    data: {
                        key: 'vvYHIWvAZKQooptpUCrd_Q',
                        message: {
                            from_email: 'post@klasnazustrich.esy.es',
                            to: [
                                {
                                    email: 'kozak.olga.info@gmail.com',
                                    name: 'Ольга Яковлевна',
                                    type: 'to'
                                }
                            ],
                            autotext: 'true',
                            subject: 'Сообщение с сайта KlasnaZustrich',
                            html: text
                        }
                    }
                })
                .done(function (response) {
                    console.log(response); // if you're into that sorta thing
                });
        })

    };

    var ToTop = (function () {
        var scroll = $('#scroll');
        $(window).on('scroll', function () {
            if ($(window).scrollTop() > window.innerHeight) {
                scroll.addClass('active');
            } else {
                scroll.removeClass('active');
            }
        });

        scroll.on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        });

    });


    MailSending(); // feedback form
    OlderPosts();// Show/hide posts on home page
    ToTop(); // to top button

});