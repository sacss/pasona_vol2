(function ( $ ) {
  'use strict';

  var runSwitch = false,
      css;
  $('#run').on('click', function () {
    if(runSwitch) {
      css = $('#cssCode').html().replace(/&gt;/g,'>');
      $('<style></style>').html(css).appendTo('head');
      $(this).text('Break');
      runSwitch = false;
    } else {
      $('style').remove();
      $(this).text('Run');
      runSwitch = true;
    }
  });

  $('#cssCode').on('click', function () {
    if(!$(this).hasClass('on')){
      var codeHeight = $(this).height()+8;
      $(this).addClass('on');
      var txt = $(this).text();
      $(this).html('<textarea>'+txt+'</textarea>');
      $('textarea').css({height:codeHeight}).focus().blur(function(){
        var inputVal = $(this).val();
        $(this).parent().removeClass('on').text(inputVal);
      });
    }
  });
  
  $('h3:not(#demoTitle)').on('click', function () {
    $(this).next().slideToggle();
  });

})(jQuery);