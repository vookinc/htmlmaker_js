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
toplevelheads['.AdCardMainHeadacmh'] = "preface";

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

var omitparas = [".PageBreakpb",
                 ".SectionBreaksbr",
                 ".PartStartpts",
                 ".PartEndpte",
                 ".ChapNumbercn"];

// wrap content in main sections
var toplevelheadsarr = [];

for (var k in toplevelheads) {
  toplevelheadsarr.push(k);
};

var toplevelheadslist = toplevelheadsarr.join(", ");

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

// wrap extracts in blockquote
var extractparaslist = extractparas.join(", ");

extractparas.forEach(function ( val ) {
  $( val ).each(function() {

  });
});

// removing unneccessary paras. 
// THIS NEEDS TO HAPPEN LAST

var omitparaslist = omitparas.join(", ");

$(omitparaslist).remove();

// write the new html to a file
  var output = $.html();
    fs.writeFile(file, output, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("Content has been updated!");
  });
});