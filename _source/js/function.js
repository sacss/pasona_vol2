(function ( $ ) {
  'use strict';

  var runSwitch = false;
  $('#run').on('click', function () {
    if(runSwitch) {
      $('style').remove();
      $(this).text('Run');
      runSwitch = false;
    } else {
      var css = $('#cssCode').html().replace(/&gt;/g,'>');
      var html = $('#htmlCode').html();
      $('<style></style>').html(css).appendTo('head');
      $(this).text('Break');
      if(html){
        $('.demo').html(html.replace(/&gt;/g,'>').replace(/&lt;/g,'<'));
      }
      runSwitch = true;
    }
  });

  $('#cssCode, #htmlCode').on('click', function () {
    if(!$(this).hasClass('on')){
      var codeHeight = $(this).height()+6;
      $(this).addClass('on');
      var txt = $(this).text();
      $(this).html('<textarea>'+txt+'</textarea>');
      $('textarea').css({height:codeHeight}).focus().blur(function(){
        var inputVal = $(this).val();
        $(this).parent().removeClass('on').text(inputVal);
      });
    }
  });

  $('#htmlCode').text($.trim($('.demo').html()));

  $('h3:not(#demoTitle)').on('click', function () {
    $(this).next().slideToggle();
  });

})(jQuery);