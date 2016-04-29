module.exports = {
	"figure": function (htmlEl, convert, tagStyle, para, prevPara) {
		var $ = convert.document;
		var img = $("<img></img>");
		var imgSrc = convert.aggregateParaText(para).join("");
		img.attr("src", "images/" + imgSrc);
		img.attr("alt", imgSrc);
		htmlEl.append(img);
	},
	"figureSource": function (htmlEl, convert, tagStyle, para, prevPara) {
		var $ = convert.document;
		var a = $("<a class='fig-link'></a>");
		var aText = convert.aggregateParaText(para).join("");
		a.text(aText);
		htmlEl.append(a);
	}
};


