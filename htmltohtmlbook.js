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
toplevelheads['.FMHeadfmh'] = "preface";
toplevelheads['.FMHeadNonprintingfmhnp'] = "preface";
toplevelheads['.FMHeadALTafmh'] = "preface";
toplevelheads['.FrontSalesTitlefst'] = "preface";
toplevelheads['.AdCardMainHeadacmh'] = "preface";
toplevelheads['.PartTitlept'] = "part";
toplevelheads['.ChapTitlect'] = "chapter";
toplevelheads['.ChapTitleALTact'] = "chapter";
toplevelheads['.ChapTitleNonprintingctnp'] = "chapter";
toplevelheads['.BMHeadbmh'] = "appendix";
toplevelheads['.BOBAdTitlebobt'] = "appendix";

var partheads = [".PartTitlept"];

var headingparas = [".BMHeadbmh",
                    ".BMHeadNonprintingbmhnp",
                    ".BMHeadALTabmh",
                    ".AppendixHeadaph",
                    ".AboutAuthorTextHeadatah",
                    ".PartNumberpn",
                    ".PartTitlept",
                    ".ChapTitlect",
                    ".ChapTitleALTact",
                    ".ChapTitleNonprintingctnp",
                    ".FMHeadfmh",
                    ".FMHeadNonprintingfmhnp",
                    ".FMHeadALTafmh",
                    ".FrontSalesTitlefst",
                    ".BOBAdTitlebobt",
                    ".AdCardMainHeadacmh",
                    ".TitlepageBookTitletit",
                    ".HalftitleBookTitlehtit",
                    ".VolumeNumbervoln",
                    ".VolumeTitlevolt"];

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
                    ".Extract-ScheduleofEventssch",
                    ".LetterExtHeadnotehn",
                    ".LetterExtClosinglcl",
                    ".LetterExtGeneralextl",
                    ".LetterExtSalutationlsa",
                    ".LetterExtSignaturelsig",
                    ".LetterExtDatelineldl",
                    ".LetterExtAddressladd",
                    ".LetterExtBodyTextNo-Indentltx1",
                    ".LetterExtBodyTextltx",
                    ".LetterExtPostscriptlps",
                    ".BOBAdQuoteHeadbobqh",
                    ".BOBAdQuotebobq",
                    ".BOBAdQuoteNo-Indentbobq1",
                    ".BOBAdQuoteSourcebobqs"];

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

var illustrationparas = [".Captioncap",
                         ".Illustrationholderill",
                         ".IllustrationSourceis",
                         ".IllustrationCreditsTextilctx",
                         ".IllustrationCreditsTextNo-Indentilctx1"];

var imageholders = [".Illustrationholderill"];

var captionparas = [".Captioncap"];

var illustrationsrcparas = [".IllustrationSourceis"];

var unorderedlistparas = [".AppendixListBulletapbl",
                          ".BoxListBulletbbl",
                          ".Extract-BulletListextbl",
                          ".ListBulletbl",
                          ".SidebarListBulletsbbl"];

var orderedlistparas = [".AppendixListNumapnl",
                        ".BoxListNumbnl",
                        ".Extract-NumListextnl",
                        ".ListAlphaal",
                        ".ListNumnl",
                        ".SidebarListNumsbnl"];

var unorderedsublistparas = [".ListBulletSubentrybsl"];

var orderedsublistparas = [".ListAlphaSubentryasl",
                           ".ListNumSubentrynsl"];

var omitparas = [".PageBreakpb",
                 ".SectionBreaksbr",
                 ".PartStartpts",
                 ".PartEndpte",
                 ".ChapNumbercn"];

// MUST HAPPEN FIRST: adding parent containers
// wrap content in main sections

function makeNot(list) {
  return "body:not(" + list + "), section:not(" + list + "), div:not(" + list + "), blockquote:not(" + list + "), h1:not(" + list + "), pre:not(" + list + "), aside:not(" + list + "), p:not(" + list + "), li:not(" + list + "), figure:not(" + list + ")";
}

//function to replace element, keeping innerHtml & attributes
  function replaceEl(selector, newTag) {
    selector.each(function(){
      var myAttr = $(this).attr();
      var myHtml = $(this).html();
      $(this).replaceWith(function(){
          return $(newTag).html(myHtml).attr(myAttr);
      });
    });
  }

// leave this commented until we're ready to add real part handling. 
// Currently we're just putting div.part at the same level as other sections.
// add part-level divs
// var partheadslist = partheads.join(", ");

// partheads.forEach(function ( val ) {
//   $( val ).each(function() {
//     var nextsiblings = $(this).nextUntil(partheadslist).addBack();
//     var newdiv = $("<div/>").attr("data-type", "part").addClass("parttemp");
//     $(this).before(newdiv);
//     var node = $(".parttemp");
//     node.append(nextsiblings);
//     $(".parttemp").removeClass("parttemp");
//   });
// });

// add chapter-level sections

var toplevelheadsarr = [];

for (var k in toplevelheads) {
  toplevelheadsarr.push(k);
};

var toplevelheadslist = toplevelheadsarr.join(", ");

for (var k in toplevelheads) {
  $( k ).each(function() {
    var nextsiblings = $(this).nextUntil(toplevelheadslist).addBack();
    var newTag = "<section/>";
    if (toplevelheads[k] == "part") {
      newTag = "<div/>"
    };
    var newsection = $(newTag).attr("data-type", toplevelheads[k]).addClass("temp");
    $(this).before(newsection);
    var node = $(".temp");
    node.append(nextsiblings);
    $(".temp").removeClass("temp");
  });
};

// wrap extracts in blockquote
var extractparaslist = extractparas.join(", ");
var notextractparaslist = makeNot(extractparaslist);

extractparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   var parentEl = thisparent[0].tagName.toLowerCase();
   if (parentEl !== 'blockquote') {
     var prevblock = $($(this).prevUntil(notextractparaslist).get().reverse());
     var nextblock = $(this).nextUntil(notextractparaslist).addBack();
     var newblockquote = $("<blockquote/>").addClass("tempextractparas");
     $(this).before(newblockquote);
     var node = $(".tempextractparas");
     node.append(prevblock);
     node.append(nextblock);
     $(".tempextractparas").removeClass("tempextractparas");
   };
   });
 });

// wrap epigraphs in blockquote
var epigraphparaslist = epigraphparas.join(", ");
var notepigraphparaslist = makeNot(epigraphparaslist);

epigraphparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   var parentEl = thisparent[0].tagName.toLowerCase();
   if (parentEl !== 'blockquote') {
     var prevblock = $($(this).prevUntil(notepigraphparaslist).get().reverse());
     var nextblock = $(this).nextUntil(notepigraphparaslist).addBack();
     var newblockquote = $("<blockquote/>").attr("data-type", "epigraph").addClass("tempepigraphparas");
     $(this).before(newblockquote);
     var node = $(".tempepigraphparas");
     node.append(prevblock);
     node.append(nextblock);
     $(".tempepigraphparas").removeClass("tempepigraphparas");
   };
   });
 });

// wrap poetry in pre
var poetryparaslist = poetryparas.join(", ");
var notpoetryparaslist = makeNot(poetryparaslist);

poetryparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   var parentEl = thisparent[0].tagName.toLowerCase();
   if (parentEl !== 'pre') {
     var prevblock = $($(this).prevUntil(notpoetryparaslist).get().reverse());
     var nextblock = $(this).nextUntil(notpoetryparaslist).addBack();
     var newpre = $("<pre/>").addClass("poetry").addClass("temp");
     $(this).before(newpre);
     var node = $(".temp");
     node.append(prevblock);
     node.append(nextblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap boxes in aside
var boxparaslist = boxparas.join(", ");
var notboxparaslist = makeNot(boxparaslist);

boxparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   var parentEl = thisparent[0].tagName.toLowerCase();
   if (parentEl !== 'aside') {
     var prevblock = $($(this).prevUntil(notboxparaslist).get().reverse());
     var nextblock = $(this).nextUntil(notboxparaslist).addBack();
     var newaside = $("<aside/>").attr("data-type", "sidebar").addClass("box").addClass("temp");
     $(this).before(newaside);
     var node = $(".temp");
     node.append(prevblock);
     node.append(nextblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap sidebar in aside
var sidebarparaslist = sidebarparas.join(", ");
var notsidebarparaslist = makeNot(sidebarparaslist);

sidebarparas.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   var parentEl = thisparent[0].tagName.toLowerCase();
   if (parentEl !== 'aside') {
     var prevblock = $($(this).prevUntil(notsidebarparaslist).get().reverse());
     var nextblock = $(this).nextUntil(notsidebarparaslist).addBack();
     var newaside = $("<aside/>").attr("data-type", "sidebar").addClass("temp");
     $(this).before(newaside);
     var node = $(".temp");
     node.append(prevblock);
     node.append(nextblock);
     $(".temp").removeClass("temp");
   };
   });
 });

// wrap illustrations in figure parent
// assumes only one actual image per figure;
// only adds figure if an image is referenced;
// (i.e., will not wrap solo caption and source paras)
var imageholderslist = imageholders.join(", ");
var illustrationparaslist = illustrationparas.join(", ");
var notillustrationparaslist = makeNot(illustrationparaslist);
notillustrationparaslist = notillustrationparaslist + ", " + imageholderslist;

imageholders.forEach(function ( val ) {
   $( val ).each(function() {
   var thisparent = $(this).parent();
   var parentEl = thisparent[0].tagName.toLowerCase();
   if (parentEl !== 'figure') {
     var prevblock = $($(this).prevUntil(notillustrationparaslist).get().reverse());
     var nextblock = $(this).nextUntil(notillustrationparaslist).addBack();
     var newfigure = $("<figure/>").addClass("Illustrationholderill").addClass("figtemp");
     $(this).before(newfigure);
     var node = $(".figtemp");
     node.append(prevblock);
     node.append(nextblock);
     $(".figtemp").removeClass("figtemp");
   };
   });
 });

// create img tags after figure parent has been added
var imagelist = imageholders.join(", ");
var imagelistselector = $("p" + imagelist);

var captionlist = captionparas.join(", ");

imagelistselector.each(function(){
    var myID = $(this).attr("id");
    var mySrc = "images/" + $(this).text();
    var myCaption = $(this).siblings(captionlist).text();
    if (!myCaption) {
      myCaption = $(this).text();
    } else {
      myCaption = encodeURI(myCaption);
    }
    var myAlt = $(this).text();
    $(this).parent().attr("id", myID);
    $(this).replaceWith(function(){
        return $("<img/>").attr("src", mySrc).attr("alt", myCaption);
    });
  });

// add illustration src link placeholders
var illustrationsrclist = illustrationsrcparas.join(", ");

$(illustrationsrclist).contents().wrap('<a class="fig-link"></a>');

// convert list paras to real lists;
// must occur after all the other parents are added

function makeListItems(unorderedlistparas, orderedlistparas, unorderedsublistparas, orderedsublistparas) {
  var alllists = unorderedlistparas.concat(orderedlistparas).concat(orderedsublistparas).concat(unorderedsublistparas);
  var listparasli = [];
  
  alllists.forEach(function ( val ) {
    $( val ).each(function() {
      var thisclass = $(this).attr("class");
      $(this).wrap( "<li class=" + thisclass + "></li>" );
    });
  });
}

function makeSubLists(sublistparas, sublisttype) {
  var sublistparaslist = sublistparas.join(", ");
  var notsublistparaslist = makeNot(sublistparaslist);
  var sublistparasli = [];

  sublistparas.forEach(function ( val ) {
    var thisLI = "li" + val;
    sublistparasli.push(thisLI);
  });
  
  sublistparasli.forEach(function ( val ) {
    $( val ).each(function() {
    var thisparentclass = $(this).parent().attr("class").toLowerCase();
      if (thisparentclass !== "sublist") {
      var prevblock = $($(this).prevUntil(notsublistparaslist).get().reverse());
      var nextblock = $(this).nextUntil(notsublistparaslist).addBack();
      var newlisttag = "<" + sublisttype + "/>";
      var newlist = $(newlisttag).addClass("sublist").addClass("tempsublist");
      $(this).before(newlist);
      var subnode = $(".tempsublist");
      subnode.append(prevblock);
      subnode.append(nextblock);
      $(".tempsublist").removeClass("tempsublist");
    };
    });
  });
  
  $("li + .sublist").each(function() {
    var newparent = $(this).prev();
    newparent.append(this);
  });
}

// second iteration
function makeLists(listparas, listtype, unorderedsublistparas, orderedsublistparas) {
  var listparaslist = listparas.join(", ");
  var alllists = listparas.concat(orderedsublistparas).concat(unorderedsublistparas);
  var alllistparaslist = alllists.join(", ");
  var notlistparaslist = makeNot(alllistparaslist);
  var listparasli = [];
  
  listparas.forEach(function ( val ) {
    var thisLI = "li" + val;
    listparasli.push(thisLI);
  });

  listparasli.forEach(function ( val ) {
    $( val ).each(function() {
    var thisparent = $(this).parent();
    var parentEl = thisparent[0].tagName.toLowerCase();
    if (parentEl !== listtype) {
      var prevblock = $($(this).prevUntil(notlistparaslist).get().reverse());
      var nextblock = $(this).nextUntil(notlistparaslist).addBack();
      var newlisttag = "<" + listtype + "/>";
      var newlist = $(newlisttag).addClass("templist");
      $(this).before(newlist);
      var node = $(".templist");
      node.append(prevblock);
      node.append(nextblock);
      $(".templist").removeClass("templist");
    };
    });
  });
  
}

makeListItems(unorderedlistparas, orderedlistparas, unorderedsublistparas, orderedsublistparas);

makeLists(unorderedlistparas, "ul", unorderedsublistparas, orderedsublistparas);
makeLists(orderedlistparas, "ol", unorderedsublistparas, orderedsublistparas);

makeSubLists(unorderedsublistparas, "ul");
makeSubLists(orderedsublistparas, "ol");

// create heading tags
var headingslist = headingparas.join(", ");
var headingslistselector = $(headingslist);

headingslistselector.each(function(){
    var myAttr = $(this).attr();
    var myHtml = $(this).html();
    $(this).replaceWith(function(){
        return $("<h1/>").html(myHtml).attr(myAttr);
    });
  });

// creating the header block;
// this relies on the h1 tags that are created previously
$("section, div[data-type='part']").each(function(){
  var myTitle = $(this).children("h1").first().clone().removeAttr("class").removeAttr("id");
  var myType = $(this).attr("data-type");
  // capitalize the data-type value
  // to potentially be used as the heading text
  myType = myType.toLowerCase().replace(/-/g, " ").replace(/\b[a-z]/g, function(letter) {
    return letter.toUpperCase();
  });
  // if no h1 exists within the section
  // use the data-type value as the heading text
  if (myTitle[0] === undefined) {
    myTitle = "<h1>" + myType + "</h1>";
  }
  var newHeader = $("<header/>").prepend(myTitle);
  $(this).prepend(newHeader);
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