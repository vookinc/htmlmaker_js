var promises = require("mammoth/lib/promises");
var Convert = require("./convert.js");
var fs = require("fs");
var mkdirp = require("mkdirp");

var exports = module.exports = {};

exports.convertToHtml = function(options) {
	var docxPath = options["docx-path"];
	var outputDir = options["output-dir"];
	var styleMapPath = options["style-map"];
	var styleFunctionsPath = options["style-functions"];
	var docxFileName = docxPath.substr(docxPath.lastIndexOf("/") + 1);
	var htmlFileName = outputDir + "/" + docxFileName.substring(0, docxFileName.lastIndexOf(".")) + ".html";
	// ADDED BY NELLIE
	var mammothFileName = outputDir + "/MAM" + docxFileName.substring(0, docxFileName.lastIndexOf(".")) + ".json";
	// END ADDED

	promises.nfcall(fs.readFile, styleMapPath, "utf8").then(function(stylesJson) {
		var converter = new Convert(styleFunctionsPath);
		// ADDED BY NELLIE
		converter.getMammothHTML(docxPath, stylesJson).then(function(htmlDoc) {
			fs.access(outputDir, function(err){
				if(err) {
					mkdirp(outputDir, function(err) {
						if(err) {
							console.log(err, err.stack);
						} else {
							fs.writeFileSync(mammothFileName, htmlDoc);
						}
					});
				} else {
					fs.writeFileSync(mammothFileName, htmlDoc);
				}
			});
		});
		// END ADDED
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
};
