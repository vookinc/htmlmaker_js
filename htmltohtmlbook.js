var fs = require('fs');
var cheerio = require('cheerio');
var file = process.argv[2];

fs.readFile(file, function editContent (err, contents) {
  $ = cheerio.load(contents, {
          xmlMode: true
        });

// adding values to the list of section-start styles
// key = class name to select
// value = data-type to assign to new section
var toplevelheads = {};
toplevelheads['.ChapTitlect'] = "chapter";
toplevelheads['.BMHeadbmh'] = "appendix";

var extractparas = [".Extractext",
                    ".ExtractSourceexts",
                    ".Extract-Newspapernews",
                    ".Extract-Diaryextd",
                    ".Extract-Transcripttrans",
                    ".Extract-NoIndentext1",
                    ".Extract-BulletListextbl",
                    ".Extract-NumListextnl",
                    ".ExtractHeadexth",
                    ".Extract-VerseorPoetryextv",
                    ".Extract-Noteextn",
                    ".Extract-NoteHeadextnh",
                    ".Extract-Headlineexthl",
                    ".Extract-Emailextem",
                    ".Extract-EmailHeadingemh",
                    ".Extract-Websiteextws",
                    ".Extract-SongLyricextsl",
                    ".Extract-BusinessCardextbc",
                    ".Extract-Telegramtel",
                    ".Extract-Inscriptionins",
                    ".Extract-ScheduleofEventssch"];

// wrap content in main sections
var toplevelheadsarr = [];

for (var k in toplevelheads) {
  toplevelheadsarr.push(k);
};

var toplevelheadslist = toplevelheadsarr.join(", ");

//toplevelheads.forEach(function ( val ) {
for (var k in toplevelheads) {
  $( k ).each(function() {
      var nextsiblings = $(this).nextUntil(toplevelheadslist).addBack();
      var newsection = $("<section/>").attr("data-type", toplevelheads[k]).addClass("temp");
      $(this).before(newsection);
      var node = $(".temp");
      node.append(nextsiblings);
      $(".temp").removeClass("temp");
  });
};

var extractparaslist = extractparas.join(", ");

$(extractparaslist).nextAll(extractparaslist).addBack();

extractparas.forEach(function ( val ) {
  $( val ).each(function() {
  thisblock = $(this).nextAll(extractparaslist).addBack();
  var newblockquote = $("<blockquote/>").addClass("temp");
  $(this).before(newblockquote);
  var node = $(".temp");
  node.append(thisblock);
  $(".temp").removeClass("temp");
  });
});

var extractparaslist = extractparas.join(", ");

extractparas.forEach(function ( val ) {
  $( val ).each(function() {
  var thisparent = $(this).parent();
  console.log(thisparent.tagName);
  if (thisparent.tagName !== 'blockquote') {
    var thisblock = $(this).nextUntil(':not(' + extractparaslist + ')').addBack();
    var newblockquote = $("<blockquote/>").addClass("temp");
    $(this).before(newblockquote);
    var node = $(".temp");
    node.append(thisblock);
    $(".temp").removeClass("temp");
  };
  });
});

// wrap extract paras in blockquote

  var output = $.html();
    fs.writeFile(file, output, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("Content has been updated!");
  });
});