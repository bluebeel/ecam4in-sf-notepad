var $ = require('jquery');
// JS is equivalent to the normal "bootstrap" package
// no need to set this to a variable, just require it
require('bootstrap');

$(function(){
    var current = location.pathname;
    $('.list-group a').each(function(){
        var $this = $(this);
        // if the current path is like this link, make it active
        if($this.attr('href') === current){
            $this.addClass('active');
        }
    });
    function wrapText(elementID, openTag, closeTag) {
        var textArea = $('#'+ elementID);
        var len = textArea.val().length;
        var start = textArea[0].selectionStart;
        var end = textArea[0].selectionEnd;
        var selectedText = textArea.val().substring(start, end);
        var remplacement = openTag + selectedText + closeTag;
        textArea.val(textArea.val().substring(0, start) + remplacement + textArea.val().substring(end, len));
    }
    $("form_add tag").click(function() {
        wrapText("form_content", "<tag>", "</tag>");
    });
});