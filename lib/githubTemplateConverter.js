var fs = require('fs');
var path = require('path');
var assert = require('assert');
var cheerio = require('cheerio');
var copyFile = require('./extensions/copyFile');

var GithubTemplateConverter =function (){
	var self = this;

	self.convertHead = function($,baseDirectory,onComplete){

	fs.writeFile(baseDirectory+'/_includes/head.html',
				$.html("head"),
				function (err) {
					if (err) throw err;
		});

	$('head').replaceWith("{% include head.html %}");

	};
	self.convertHeader = function($,baseDirectory,onComplete){
		
		var selector = "header";
		if($('body').hasClass('#header_wrap'))
			selector = '#header_wrap';

		fs.writeFile(baseDirectory+'/_includes/header.html',$.html(selector));
		$(selector).replaceWith("{% include header.html %}");

	};

	self.convertFooter = function($,baseDirectory,onComplete){

		var selector = "footer";
		if($('body').hasClass('#footer_wrap'))
			selector = '#footer_wrap';

		fs.writeFile(baseDirectory+'/_includes/footer.html',$.html(selector));
		$(selector).replaceWith("{% include footer.html %}");
	};


	self.convertMain = function($,baseDirectory,onComplete){
		var date = new Date();
		var year =  date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();

		var postName = year+"-"+month+"-"+day+"-"+'Github-Pages.html';
		fs.writeFile(baseDirectory+'/_posts/'+postName,$("section").html());

		$("section").empty();
		$("section").append("{{content}}");
	};

	self.createDefaultLayout = function($,baseDirectory,onComplete){
		fs.writeFile(baseDirectory+'/_layouts/default.html',$.html());
	};

	self.createIndex = function($,baseDirectory,onComplete){
		copyFile(__dirname+'/templates/default/index.html',baseDirectory+'/index.html');
	};

	self.convert= function(fileToConvert){

		assert(fileToConvert,'File to convert must be defined');

		var baseDirectory = path.dirname(fileToConvert);

		copyFile(fileToConvert,fileToConvert+".bak");

		fs.readFile(fileToConvert, 'utf8', function (err,data) {
			if (err) {
				return console.log(err);
			}

			var $ = cheerio.load(data);
			self.convertHead($,baseDirectory);
			self.convertHeader($,baseDirectory);
			self.convertFooter($,baseDirectory);
			self.convertMain($,baseDirectory);

			self.createDefaultLayout($,baseDirectory);
			self.createIndex($,baseDirectory);

		});
	};
};

module.exports = new GithubTemplateConverter();