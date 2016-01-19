/**
 * Created by reven on 19.01.2016.
 */
$(function(){

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




    OlderPosts(); /* Show/hide posts on home page*/
});