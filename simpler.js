#!/usr/bin/env node

var read = require("node-readability"),
  Ivona = require('ivona-node'),
  request = require('request'),
  fs = require('fs'),
  sanitizer = require("sanitizer");

var ivona = new Ivona({
  accessKey: 'GDNAIWABFZTUS7TFCI5Q',
  secretKey: 'l5tEgLDQzeR85ZuH8/VMvS1Px7Noltuac6ZDjQwQ'
});

require('shelljs/global');

var args = process.argv.slice(2);
url = "http://readability.com/api/content/v1/parser?url=" + args[0] + "&token=047be2416589ced8d31b1f929286c2b9087eee7b"

scraper(url, function (data) {
  console.log(data);
  var concat_list = 'concat:';
  var article = data.title + '\n' + data.contents;
  article.split(/\n/).forEach(function (line, i) {
    // add pauses between title and also when we detect any whitespace-lines
    if (/\S/.test(line)) {
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
    }
  });

  var cmd = 'ffmpeg -i "' + concat_list.slice(0, -1) + '" -c copy content/' + Date.now() +'.mp3 -y';
  console.log(cmd);
  exec(cmd, {silent:true}).output;
});

function scraper(url, callback) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      doc = JSON.parse(body);

      var obj = {
          "url": url,
          "title": doc.title,
          "excerpt": doc.excerpt,
          "lead_image_url": doc.lead_image_url,
          "contents": stripHTML(doc.content || "")
      };
      callback(obj);
    }
  });
  //read(url, function(err, doc) {
  //    if (err) {
  //        throw err;
  //    }
  //
  //    var obj = {
  //        "url": url,
  //        "title": doc.title,
  //        "excerpt": doc.excerpt,
  //        "lead_image_url": doc.lead_image_url,
  //        "contents": stripHTML(doc.content || "")
  //    };
  //    callback(obj);
  //});
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

    // Return the final string, minus any leading/trailing whitespace.
    return clean.trim();
}
