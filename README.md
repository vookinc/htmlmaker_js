# htmlmaker_js

JavaScript replacement for Macmillan's .docx-to-HTML conversion.

This process exists in two pieces. The first converts the .docx file to a simple HTML file of paragraphs. The second piece converts the HTML file to HTMLBook.

## To Run

Convert .docx to simple HTML:

```
$ htmlmaker docx-path output-dir styles.json style-functions.js
```

Convert HTML to HTMLBook:

```
$ node htmltohtmlbook.js output-dir/docx-name.html
```

Generate linked nav for the new html:

```
$ node generateTOC.js output-dir/docx-name.html
```

## Notes

### Footnotes

When running the full conversion from .docx to HTMLBook, footnotes that are embedded in Word will be converted to our default markup, and then will be moved inline and converted to comply with the HTMLBook spec. If you are bypassing the Word conversion and submitting an HTML file to be converted to HTMLBook via the secondary conversion, then footnotes must conform to the following markup specification:

* The full text of each footnote must be contained within a single parent (e.g., a div or p element).
* Each footnote must have a _data-noteref_ attribute containing the note number (this number must correspond to the _id_ attribute of the footnote reference, as described below).
* Footnote parents must have a common class by which they can all be selected. E.g.:

```html
<div class="footnote" data-noteref="1">
<p class="FootnoteText">You will knock, and a sharp-eyed old man answer. &#x201C;Yes?&#x201D; He&#x2019;ll look you over and see what you hold: a fist-size pouch, fat with coin. &#x201C;What do you want?&#x201D;</p>
<p class="FootnoteText">&#x201C;To talk to the lady of the warrior Cumalo, please. I was a friend of his.&#x201D;</p>
<p class="FootnoteText">You see the elder grasps at once what news you bring, but he&#x2019;ll bridle and bluster anyway, in the tedious way of northern men. &#x201C;No call to go bothering my daughter. And it ain&#x2019;t proper, nohow, you calling on a married lady. Speak your piece to me.&#x201D;</p>
</div>
<div class="footnote" data-noteref="2">
<p class="FootnoteText">Tiefer alt. A voice to sing the pale sour out of lemons, sing them luscious orange; as much the sensations of <span class="spanitaliccharactersital">eros</span> on the body as mere sound in the ears.</p>
</div>
```

* Footnote references (the marker denoting the location in the text to which the footnote corresponds) must be tagged as a span with an id of "footnote-' \+ the note number. E.g.: 

```html
<p class="TextStandardtx">Macmillan Publishers is currently located in the Flatiron Building.<span id="footnote-1">1</span></p>
```