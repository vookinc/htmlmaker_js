var promises = require("mammoth/lib/promises");
var Convert = require("./convert.js");
var fs = require("fs");
var mkdirp = require("mkdirp");
var path = require('path');

function main(argv) {
	var docxPath = argv["docx-path"];
	var outputDir = argv["output-dir"];
	var styleMapPath = argv["style-map"];
	var styleFunctionsPath = argv["style-functions"];
	var docxFileName = docxPath.substr(docxPath.lastIndexOf('/') + 1).substr(docxPath.lastIndexOf('\\') + 1);
	var htmlFileName = path.join(outputDir, docxFileName.substring(0, docxFileName.lastIndexOf(".")) + ".html");
	var mammothFileName = path.join(outputDir, "MAM" + docxFileName.substring(0, docxFileName.lastIndexOf(".")) + ".json");

	promises.nfcall(fs.readFile, styleMapPath, "utf8").then(function(stylesJson) {
		var converter = new Convert(styleFunctionsPath);
		// UNCOMMENT BELOW TO RETURN MAMMOTH JSON
		// converter.getMammothHTML(docxPath, stylesJson).then(function(htmlDoc) {
		// 	fs.access(outputDir, function(err){
		// 		if(err) {
		// 			mkdirp(outputDir, function(err) {
		// 				if(err) {
		// 					console.log(err, err.stack);
		// 				} else {
		// 					fs.writeFileSync(mammothFileName, htmlDoc);
		// 				}
		// 			});
		// 		} else {
		// 			fs.writeFileSync(mammothFileName, htmlDoc);
		// 		}
		// 	});
		// });
		// END COMMENT
		converter.convertDocxToBookHTML(docxPath, stylesJson).then(function(htmlDoc) {
			fs.access(outputDir, function(err){
				if(err) {
					mkdirp(outputDir, function(err) {
						if(err) {
							console.log(err, err.stack);
						} else {
							fs.writeFileSync(htmlFileName, htmlDoc);
						}
					});
				} else {
					fs.writeFileSync(htmlFileName, htmlDoc);
				}
			});
		});
	});
}

module.exports = main;
