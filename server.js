#!/usr/bin/env node

/*jshint multistr: true */
var http = require("http"),
		_ = require("./underscore"),
    querystring = require("querystring");
	

var bookmarks = {
    "CPSC 473": {
        url: "http://j.mp/cpsc473jhedfjhsdjhsdjhfhjsdf",
        clicks: 0
    },
    "CSUF": {
        url: "http://www.fullerton.edu",
        clicks: 0
    },
    "GOOGLE": {
        url: "http://www.google.com",
        clicks: 0
    },
    "YAHOO": {
        url: "http://www.yahoo.com",
        clicks: 0
    }
};


var listContent = "<!DOCTYPE html> <html> <head><title>Start Page</title></head><body><ul>";
_.each(_.pairs(bookmarks),function(bookmark) {
	listContent += "<li><a href=\"click?title="+encodeURIComponent(bookmark[0])+"\">"+bookmark[0]+"</a></li>";
});
listContent += "</ul></body></html>";

//http://stackoverflow.com/questions/1767246/javascript-check-if-string-begins-with-something	
				
String.prototype.startsWith = function(needle) {
	return(this.indexOf(needle) === 0);
};

http.createServer(function(req, res){
	
	var url = req.url.toString();
	var title = "";
	
  if(url.startsWith("/click")){
    title = _.values(querystring.parse(url)).toString();
		bookmarks[title].clicks += 1;
		console.log(title+" : "+bookmarks[title].clicks);
		res.writeHead(302, {
      "Location": bookmarks[title].url
		});
		res.end();
		return;
  }
	
	
	
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write(listContent);
    res.end();
	
}).listen(8080);
