/* get size of an object */
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


var $headingTitle = $('#dvHeader'),
	$infoMsg = $('#notification_Msg_Print'),
	$qTitle = $('#containerDiv h2'),
	$container = $('#container'),
	$navigation = $('.pagination'),
	totalQuestion = Object.size(dataCollection),
	currentAnswer;

function init()
{
	$('#dvHeader span').html(heading);
	$('#notification_Msg_Print').html(helpTxt);
	$('#containerDiv h2 span').html(activitTitle);
	loadQuestion();
	$('.answer').draggable(
	{
		revert: 'invalid'
	});
	
	$('.answer').each(function()
	{
	var left = $(this).position().left;
	var top = $(this).position().top;
	//$(this).css({left: left, top: top});
	});
	//$('.answer').css('position', 'absolute');	
	
	$('.divDiscription').droppable(
	{
		drop: function(event, ui)
		{
			var text = $(ui.draggable).html();
			$(ui.draggable).hide();
			this.innerHTML = text;
			if($('#ansContainer').children().filter(':visible').length == 0)
				$('#submit').removeAttr('disabled');
			$(this).droppable('destroy');
			$('#reset').removeAttr('disabled');
		}
	});
	
	$('#submit').html(btnLabel["submitbtn"]);
	$('#next').html(btnLabel["nextbtn"]);
	$('#reset').html(btnLabel["resetbtn"]);
}

function loadQuestion()
{
	$('#container').empty();

	for(var index=1; index<=totalQuestion; index++)
	{
		var option = dataCollection[index]["image"];
		var answer = dataCollection[index]["answer"];

		
		$div = $('<div></div>');
		
		$div2 = $('<div id = ' +("cont_"+index) + ' class= "img_container"></div>').appendTo($div);
				
		//$('<img>').attr({src: option, alt: ""}).appendTo($div2);
		
		$('<label>')
			.attr({for: 'temp' + index})
			
				.appendTo($div);
		$('<div>')
			.attr({class: 'images', value: answer, class: 'divDiscription', id: 'temp' + index})
			.appendTo($div);
			
		$('<div class="answer"></div>').html(answer).appendTo('#ansContainer');
			
		$div.appendTo('#container');
		
		$('#container').find($('#cont_' + (index))).css('background-image','url('+option+')');
				
		currentAnswer = answer;
	}

	for(var i=0; i<totalQuestion; i++)
	{
		var randomNum = Math.floor(Math.random() * totalQuestion);
		$('#ansContainer').children().eq(randomNum).detach().appendTo('#ansContainer');
	}
		
	$('input[type="checkbox"]').click(function(e)
	{
		$('#submit').removeAttr('disabled');
	});
}

function checkAnswer()
{
	var right = false;
	var sound2 = new Audio('audio/try-again.mp3'); 
	var sound1 = new Audio('audio/well-done.mp3');
	
	$('#submit').attr('disabled', 'disabled');
	$('.divDiscription').each(function(index, element)
	{
        var coranswer = $(this).attr('value');
		var useranswer = $(this).html();
	 
		if(coranswer == useranswer)
		{
			$(this).parent().append('<span class = "correct"></span>'); 
		}
		else
		{
			$(this).parent().append('<span class = "incorrect"></span>');
			right=true;
		}
   });
 		if($('.incorrect').length == 0 )
			actComplete();
		
 		else
			$('#next').removeAttr('disabled');
	
	if(right)
	{
		sound2.play();
	}
	else
	{
		sound1.play();
	}
	 	}

function showHelp()
{
	$('.notifiactinMsgWrapper').fadeToggle();
	return false;
}

function actComplete()
{
	return false;
	setTimeout(function()
	{
		$('.errorMsg').fadeIn().html(msgComplete);
	}, 1000);
}

function showAnswer()
{
	$('#next').attr('disabled', 'disabled');
	$('.divDiscription').each(function(index, element) {
        $(this).html($(this).attr('value'));
		$('.incorrect').removeClass('incorrect').find('div.divDiscription').css({color: 'rgb(9, 139, 9)', background: 'rgb(190, 247, 115)'});
		actComplete();
    });
	
	$('.correct, .incorrect').remove();
}

function resetGame()
{
	$('#container, #ansContainer').empty();
	init();
	$('#submit, #next').attr('disabled', 'disabled');
}

$(document).ready(function(e) {
    init();
});

function fnShowAudioPlayer(){
	var x = "<div id='dvAudioControl' class='audioPlayer'>"+
				"<object id='auTest' type='application/x-shockwave-flash' data='audio/mp3_player.swf' width='200' height='20'>"+
					"<param name='wmode' value='transparent' />"+
					"<param name='movie' value='audio/mp3_player.swf' />"+
					"<param name='FlashVars' value='mp3=audio/1.mp3&amp;showvolume=1&amp;autoplay=1' />"+
				"</object>"+
				"<img src='img/icon_close.png' class='btnCloseAudio' onclick='fnHideAudioControl()'></img>"+
			"</div>";
	$("#audioContainerDiv").html(x);
	//$('#dvAudioControl').show();
	//var audioElement = document.getElementById('auTest');
	//audioElement.play();
}

function fnHideAudioControl(){
	$("#audioContainerDiv").html('');
	//var audioElement = document.getElementById('auTest');
	//audioElement.pause();
	//audioElement.currentTime=0;
	//$('#dvAudioControl').hide();
}