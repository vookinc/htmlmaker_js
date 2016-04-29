var promises = require("mammoth/lib/promises");
var Convert = require("./convert.js");
var fs = require("fs");
var mkdirp = require("mkdirp");

function main(argv) {
	var docxPath = argv["docx-path"];
	var outputDir = argv["output-dir"];
	var styleMapPath = argv["style-map"];
	var styleFunctionsPath = argv["style-functions"];
	var docxFileName = docxPath.substr(docxPath.lastIndexOf("/") + 1);
	var htmlFileName = outputDir + "/" + docxFileName.substring(0, docxFileName.lastIndexOf(".")) + ".html";

	promises.nfcall(fs.readFile, styleMapPath, "utf8").then(function(stylesJson) {
		var converter = new Convert(styleFunctionsPath);
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