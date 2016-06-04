#!/usr/bin/env node

// 3rd party modules.
var read = require("node-readability"),
    Ivona = require('ivona-node'),
    fs = require('fs'),
    sanitizer = require("sanitizer");

var ivona = new Ivona({
    accessKey: 'GDNAIWABFZTUS7TFCI5Q',
    secretKey: 'l5tEgLDQzeR85ZuH8/VMvS1Px7Noltuac6ZDjQwQ'
});

var concat_list = 'concat:';

var args = process.argv.slice(2);
url = "http://readability.com/api/content/v1/parser?url=" + args[0] + "&token=047be2416589ced8d31b1f929286c2b9087eee7b"
console.log(url);

scraper(url, function (data) {
  console.log("# %s #\n\n%s\n\n---", data.title, data.contents);

  data.contents.split(/\\n/).forEach(function (line, i) {
    if (/\S/.test(line)) {
      console.log(line);
      console.log('----');
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
  console.log(concat_list);
});

function scraper(url, callback) {
    read(url, function(err, doc) {
        if (err) {
            throw err;
        }

        var obj = {
            "url": url,
            "title": doc.title.trim(),
            "contents": stripHTML(doc.content || "")
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

    // Return the final string, minus any leading/trailing whitespace.
    return clean.trim();
}
