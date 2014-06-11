jQuery(function($){
	$('#run').toggle(function(){
		var css = $('#cssCode').html();
    css = css.replace(/&gt;/g,'>');
		$('<style></style>').html(css).appendTo('head');
		$(this).text('Break');
	},function(){
		$('style').remove();
		$(this).text('Run');
	});
	
	$('#cssCode').click(function(){
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
	$('h3:not(#demoTitle)').click(function(){
		$(this).next().slideToggle();
	});
});