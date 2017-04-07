
var HtmlStyles = function(stylesJson){
	var styles = JSON.parse(stylesJson);
	var htmlstyles = this;

	this.titleStyle = styles["title"];

	function populateDocxStylesMap() {
		var tags = styles["tags"];
		var docxStyles = {};
		var refStyles = {};
		tags.forEach(function(tag){
			tag["dataTypeForDocxStyle"] = function(docxStyle) {
				var dataTypes = this["data-types"];
				var defaultType;
				for (var i = 0; i < dataTypes.length; i++) {
					var dataType = dataTypes[i];
					var styleIndex = dataType["doc-style"].indexOf(docxStyle);
					if(styleIndex > -1) {
						return dataType;
					}
					if(dataType["data-type"] == "@default") {
						defaultType = dataType;
					}
				}
				return defaultType;
			};
			if(!tag["reference-only"]){
				tag["data-types"].forEach(function(docxStyle){
					docxStyle["doc-style"].forEach(function(docStyle){
						var styles = docxStyles[docStyle];
						if(!styles) {
							styles = [];
							docxStyles[docStyle] = styles;
						}
						styles.push(tag);
					});
				});
			} else {
				refStyles[tag["tag-name"]] = tag;
			}
		});
		htmlstyles.docxStyles = docxStyles;
		htmlstyles.refStyles = refStyles;
	};

	populateDocxStylesMap();
};

HtmlStyles.prototype.tagsForDocxStyle = function(docxStyle) {
	var tags = this.docxStyles[docxStyle];
	return tags ? tags : this.docxStyles["@default"];
};

HtmlStyles.prototype.tagForRef = function(reference) {
	return this.refStyles[reference];
}

module.exports = HtmlStyles;
