// TODO hide access token
//
// create mp3s with link and picture in the metadata (for the iPlayer archives?)

var fs = require('fs'),
    Ivona = require('ivona-node'),
    read = require("node-readability"),
    sanitizer = require("sanitizer"),
    request = require('request'),
    Entities = require('html-entities').AllHtmlEntities;

var ivona = new Ivona({
    accessKey: 'GDNAIWABFZTUS7TFCI5Q',
    secretKey: 'l5tEgLDQzeR85ZuH8/VMvS1Px7Noltuac6ZDjQwQ'
});

var entities = new Entities();

// from http://nodeexamples.com/2012/09/27/scraping-a-pages-content-using-the-node-readability-module-and-node-js/
function scraper(url, callback) {
    read(url, function(err, doc) {
        if (err) {
          console.log(err);
            throw err;
        }

        var obj = {
            "url": url,
            "title": doc.title.trim(),
            "contents": stripHTML(doc.content || ""),
            "test": doc.content,
            "html": doc.html,
        };
        callback(obj);
    });
}

function stripHTML(html) {
    var clean = sanitizer.sanitize(html, function (str) {
        return str;
    });
    // Remove all remaining HTML tags.
    clean = clean.replace(/<(?:.|\n)*?>/gm, "");

    // RegEx to remove needless newlines and whitespace.
    // See: http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");
    clean = clean.replace(/(<([^>]+)>)/ig,"");
    clean = clean.replace('&nbsp;', ' ');
    clean = entities.decode(clean);

    // Return the final string, minus any leading/trailing whitespace.
    return clean.trim();
}

var args = process.argv.slice(2);

url = "http://readability.com/api/content/v1/parser?url=" + args[0] + "&token=047be2416589ced8d31b1f929286c2b9087eee7b"
console.log(url);
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var article;
    var concat_list = 'concat:';

    body = JSON.parse(body);
    article = body['title'] + '\n' + body['content'];
    article = stripHTML(article);
    //console.log(article);

    ivona.listVoices().on('complete', function(voices) {
      console.log(voices);
      console.log(11);
   });
    //article.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").forEach(function (line, i) {
    article.split("\n").forEach(function (line, i) {
      console.log(line);
      ivona.createVoice(line, {
          body: {
              voice: {
                  name: 'Emma',
                  language: 'en-GB',
                  gender: 'Female'
              }
          }
      }).pipe(fs.createWriteStream('tmp/text-' + i + '.mp3'));
      concat_list += 'tmp/text-' + i + '.mp3|';
    });

    //const exec = require('child_process').exec;
    //console.log(concat_list);
    var cmd = 'ffmpeg -i "' + concat_list.slice(0, -1) + '" -c copy content/article.mp3';
    console.log(cmd);

    require('shelljs/global');
    //exec(cmd, {silent:true}).output;

    exec(cmd, function(err, out, code) {
      if (err instanceof Error)
        throw err;
      process.stderr.write(err);
      process.stdout.write(out);
      process.exit(code);
    });
  } else {
    console.log("ERROR");
  }

});
//scraper(args[0], function (data) {
//  var article;
//  var concat_list = 'concat:';
//
//  article = data.title + '\n\n' + data.contents
//  console.log(data.test);
//  console.log(data.contents);
//  console.log(data.html);
//  //console.log("# %s #\n\n%s\n\n---", data.title, data.contents);
//
//  article.split('\n').forEach(function (line, i) {
//    ivona.createVoice(line, {
//        body: {
//            voice: {
//                name: 'Emma',
//                language: 'en-GB',
//                gender: 'Female'
//            }
//        }
//    }).pipe(fs.createWriteStream('tmp/text-' + i + '.mp3'));
//    concat_list += 'tmp/text-' + i + '.mp3|';
//  });
//
//  //const exec = require('child_process').exec;
//  //console.log(concat_list);
//  var cmd = 'ffmpeg -i "' + concat_list.slice(0, -1) + '" -c copy content/article.mp3';
//  console.log(cmd);
//
//  require('shelljs/global');
//  //exec(cmd, {silent:true}).output;
//
//  exec(cmd, function(err, out, code) {
//    if (err instanceof Error)
//      throw err;
//    process.stderr.write(err);
//    process.stdout.write(out);
//    process.exit(code);
//  });
//});
