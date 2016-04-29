#HtmlMaker Javascript based .docx to Html Conversion

##Usage

###Installation

Make sure Node.js is installed.

	node --version
	
Change to directory where tool is unziped
and run

	npm install
	
###Command Line

	node bin/htmlmaker -h
	
Shows the arguments for running via the command line

	usage: htmlmaker [-h] docx-path output-dir style-map style-functions

	Positional arguments:
  		docx-path        Path to the .docx file to convert.
  		output-dir       Output directory for generated HTML. Mutually exclusive with 
                   		 output-path.
  		style-map        File containing a style map.
  		style-functions  File containing a style specific functions.

	Optional arguments:
  		-h, --help       Show this help message and exit.


###Programmatic

	var htmlmaker = require("htmlmaker");
	
	var options = {
		"docx-path": "",
		"output-dir": "",
		"style-map": "",
		"style-functions": "",
	};

	htmlmaker.converToHtml(options);

