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
