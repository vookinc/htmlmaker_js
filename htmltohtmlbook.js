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

var epigraphparas = [".PartEpigraph-non-versepepi",
                    ".PartEpigraph-versepepiv",
                    ".PartEpigraphSourcepeps",
                    ".ChapEpigraph-non-versecepi",
                    ".ChapEpigraph-versecepiv",
                    ".ChapEpigraphSourceceps",
                    ".FMEpigraph-non-versefmepi",
                    ".FMEpigraph-versefmepiv",
                    ".FMEpigraphSourcefmeps",
                    ".Epigraph-non-verseepi",
                    ".Epigraph-verseepiv",
                    ".EpigraphSourceeps",
                    ".EpigraphinText-non-versetepi",
                    ".EpigraphinText-versetepiv",
                    ".EpigraphinText-Sourceteps"];

var poetryparas = [".PoemTitlevt",
                   ".PoemSubtitlevst",
                   ".PoemLevel-1Subheadvh1",
                   ".PoemLevel-2Subheadvh2",
                   ".PoemLevel-3Subheadvh3",
                   ".PoemLevel-4Subheadvh4",
                   ".VerseTextvtx",
                   ".VerseRun-inTextNo-Indentvrtx1",
                   ".VerseRun-inTextvrtx"];

var boxparas = [".BoxHeadbh",
                ".BoxSubheadbsh",
                ".BoxEpigraph-non-versebepi",
                ".BoxEpigraphSourcebeps",
                ".BoxEpigraph-versebepiv",
                ".BoxEpigraphSourcebeps",
                ".BoxTextNo-Indentbtx1",
                ".BoxHead-Level-1bh1",
                ".BoxTextNo-Indentbtx1",
                ".BoxListNumbnl",
                ".BoxListNumbnl",
                ".BoxListNumbnl",
                ".BoxListNumbnl",
                ".BoxHead-Level-2bh2",
                ".BoxListBulletbbl",
                ".BoxListBulletbbl",
                ".BoxTextbtx",
                ".BoxTextbtx",
                ".BoxHead-Level-2bh2",
                ".BoxTextNo-Indentbtx1",
                ".BoxHead-Level-3bh3",
                ".BoxTextbtx",
                ".BoxHead-Level-4bh4",
                ".BoxTextNo-Indentbtx1",
                ".BoxExtractbext",
                ".BoxTextbtx",
                ".BoxHead-Level-2bh2",
                ".BoxTextNo-Indentbtx1",
                ".BoxHead-Level-2bh2",
                ".BoxTextNo-Indentbtx1",
                ".BoxTextbtx",
                ".BoxTextbtx",
                ".BoxSourceNotebsn",
                ".BoxFootnotebfn"];

var sidebarparas = [".SidebarHeadsbh",
                    ".SidebarSubheadsbsh",
                    ".SidebarEpigraph-non-versesbepi",
                    ".SidebarEpigraphSourcesbeps",
                    ".SidebarEpigraph-versesbepiv",
                    ".SidebarEpigraphSourcesbeps",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarHead-Level-1sbh1",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarListNumsbnl",
                    ".SidebarListNumsbnl",
                    ".SidebarListNumsbnl",
                    ".SidebarListNumsbnl",
                    ".SidebarHead-Level-2sbh2",
                    ".SidebarListBulletsbbl",
                    ".SidebarListBulletsbbl",
                    ".SidebarTextsbtx",
                    ".SidebarTextsbtx",
                    ".SidebarHead-Level-2sbh2",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarHead-Level-3sbh3",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarHead-Level-4sbh4",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarExtractsbext",
                    ".SidebarTextsbtx",
                    ".SidebarHead-Level-2sbh2",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarHead-Level-2sbh2",
                    ".SidebarTextNo-Indentsbtx1",
                    ".SidebarTextsbtx",
                    ".SidebarTextsbtx",
                    ".SidebarSourceNotesbsn",
                    ".SidebarFootnotesbfn"];

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
var notextractparaslist = "*:not(" + extractparaslist + ")";

extractparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   console.log(thisparent[0].tagName);
   if (thisparent[0].tagName !== 'BLOCKQUOTE') {
     var thisblock = $(this).nextUntil(notextractparaslist).addBack();
     var newblockquote = $("<blockquote/>").addClass("temp");
     $(this).before(newblockquote);
     var node = $(".temp");
     node.append(thisblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap epigraphs in blockquote
var epigraphparaslist = epigraphparas.join(", ");
var notepigraphparaslist = "*:not(" + epigraphparaslist + ")";

epigraphparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   console.log(thisparent[0].tagName);
   if (thisparent[0].tagName !== 'BLOCKQUOTE') {
     var thisblock = $(this).nextUntil(notepigraphparaslist).addBack();
     var newblockquote = $("<blockquote/>").attr("data-type", "epigraph").addClass("temp");
     $(this).before(newblockquote);
     var node = $(".temp");
     node.append(thisblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap poetry in pre
var poetryparaslist = poetryparas.join(", ");
var notpoetryparaslist = "*:not(" + poetryparaslist + ")";

poetryparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   console.log(thisparent[0].tagName);
   if (thisparent[0].tagName !== 'PRE') {
     var thisblock = $(this).nextUntil(notpoetryparaslist).addBack();
     var newpre = $("<pre/>").addclass("poetry").addClass("temp");
     $(this).before(newpre);
     var node = $(".temp");
     node.append(thisblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap boxes in aside
var boxparaslist = boxparas.join(", ");
var notboxparaslist = "*:not(" + boxparaslist + ")";

boxparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   console.log(thisparent[0].tagName);
   if (thisparent[0].tagName !== 'ASIDE') {
     var thisblock = $(this).nextUntil(notboxparaslist).addBack();
     var newaside = $("<aside/>").attr("data-type", "sidebar").addClass("box").addClass("temp");
     $(this).before(newaside);
     var node = $(".temp");
     node.append(thisblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap sidebar in aside
var sidebarparaslist = sidebarparas.join(", ");
var notsidebarparaslist = "*:not(" + sidebarparaslist + ")";

sidebarparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   console.log(thisparent[0].tagName);
   if (thisparent[0].tagName !== 'ASIDE') {
     var thisblock = $(this).nextUntil(notsidebarparaslist).addBack();
     var newaside = $("<aside/>").attr("data-type", "sidebar").addClass("temp");
     $(this).before(newaside);
     var node = $(".temp");
     node.append(thisblock);
     $(".temp").removeClass("temp");
   };
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