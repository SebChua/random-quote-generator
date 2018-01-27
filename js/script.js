$("document").ready(function(){
	getQuote();
	changeColor();
});

$("#button-change").on("click", function(){
	getQuote();
	changeColor();
});

function changeColor() {
	var randomColor = getRandomColor();

	//if color is white, change it to black
	if (randomColor == "#FFFFFF"){
		randomColor = "#000000";
	}

	//changes the color of the background and text
	$("#entire-doc, .btn").css("background-color", randomColor);
	$(".colorElem").css("color", randomColor);
}

function getQuote(){
	var request = new XMLHttpRequest();
	var dataLink = 'https://raw.githubusercontent.com/4skinSkywalker/Database-Quotes-JSON/master/quotes.json';
	
	request.open('GET', dataLink);
	request.onload = function(){
		var quotes = JSON.parse(request.responseText);
		var quoteNumber = getRandomInt(0, quotes.length);
		var quote = quotes[quoteNumber].quoteText;
		var author = quotes[quoteNumber].quoteAuthor;
		if (author == ""){
			author = "Anonymous";
		}
		
		$("#quote-text").html("<strong>" + quote + "</strong>");
		$("#quote-author").html("<cite>" + author + "</cite>");
		$(".webText").addClass("text-center animated fadeIn");
		$('.webText').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$('.webText').removeClass("animated fadeIn");
		});

		generateTweetURL();
	}
	
	request.onerror = function(){
		alert("Couldn't find file from request.");
	}
	
	request.send();
}

function generateTweetURL() {
	//constructing link
	var currQuote = $("#quote-text").text().replace(/\s+/g, "%20");
	var currAuthor = $("#quote-author").text().replace(/\s+/g, "%20");
	var linkText = "%22" + currQuote + "%22%20" + currAuthor;
	var link = "https://twitter.com/intent/tweet?hashtags=quoteoftheday&text=" + linkText;

	$("#tweet").attr("href", link);
}

//code from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//code from https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}