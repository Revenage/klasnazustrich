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

        $('#contactForm')
            .find('.form-group')
            .each(function (i, form) {
                var tForm = $(form).find('.form-control');

                tForm
                    .on('focus', function () {
                        $(this).attr('placeholder', '');
                        $(this).parent().addClass('floating-label-form-group-with-value');
                    })
                    .on('blur', function () {
                        if ($(this).val() == null || $(this).val() == '') {
                            $(this).parent().removeClass('floating-label-form-group-with-value');
                            $(this).attr('placeholder', $(this).attr('name'));
                        } else {
                            $(this).parent().addClass('floating-label-form-group-with-value');
                            $(this).parent().removeClass('error-form-required')
                        }
                    })
                    .on('change', function () {
                        $(this).parent().removeClass('error-form-required')
                    })

            });


        $('#send-button').on('click', function (e) {
            e.preventDefault();
            var trig = 0;
            $('#contactForm')
                .find('.form-group')
                .each(function (i, form) {
                    var tForm = $(form).find('.form-control');
                    if (tForm.val() == null || tForm.val() == '') {
                        $(form).addClass('error-form-required');
                        trig += 0;
                    } else {
                        $(form).removeClass('error-form-required');
                        trig += 1;
                    }
                });

            if (trig >= 4) {
                $(this).addClass('btn-success');
                $(this).removeClass('btn-danger');
                postData();

            } else {
                $(this).addClass('btn-danger');
                $(this).removeClass('btn-success');
            }

        });


        function postData() {
            var name = $('#name').val();
            var email = $('#email').val();
            var tel = $('#phone').val();
            var message = $('#message').val();
            var text =
                '<h4>Контактные данные:</h4>' +
                '<ul>' +
                '<li>' + name + '</li>' +
                '<li>' + email + '</li>' +
                '<li>' + tel + '</li>' +
                '</ul>' +
                '<hr>' +
                '<h4>Текст сообщения</h4>' +
                '<p>' + message + '</p>';

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
                    // if you're into that sorta thing
                    setTimeout(function () {
                        $('#send-button').removeClass('btn-danger , btn-success');
                        $('#contactForm')
                            .find('.form-group')
                            .each(function (i, form) {
                                $(this).removeClass('floating-label-form-group-with-value');
                                var cForm = $(this).find('.form-control');
                                cForm.val('');
                                cForm.attr('placeholder', cForm.attr('name'));
                            });
                    }, 2000);
                });
        }

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

    var bootstrapSettings = (function(){
            $('[data-toggle="popover"]').popover();
    });


    MailSending();
    OlderPosts();// Show/hide posts on home page
    ToTop();
    bootstrapSettings();
});