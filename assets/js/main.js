var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('bootstrap');

$(function(){
    var current = location.pathname;
    console.log(current);
    $('.list-group a').each(function(){
        var $this = $(this);
        // if the current path is like this link, make it active
        if($this.attr('href') === current){
            $this.addClass('active');
        }
    })
});