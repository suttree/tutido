#!/usr/bin/env node

var fs = require('fs'),
  Ivona = require('ivona-node'),
  request = require('request'),
  sanitizer = require("sanitizer"),
  Entities = require('html-entities').AllHtmlEntities,
  ffmetadata = require("ffmetadata"),
  util = require('util'),
  exec = require('child_process').exec;

var ivona = new Ivona({
  accessKey: 'GDNAIWABFZTUS7TFCI5Q',
  secretKey: 'l5tEgLDQzeR85ZuH8/VMvS1Px7Noltuac6ZDjQwQ'
});

var entities = new Entities();

var args = process.argv.slice(2);
url = "http://readability.com/api/content/v1/parser?url=" + encodeURIComponent(args[0]) + "&token=047be2416589ced8d31b1f929286c2b9087eee7b"
console.log(url);

fetchArticle(url, function(data) {
  createSpeech(data, function(file_list) {
    createMP3(file_list);
  });
});

function fetchArticle(url, callback) {
  scraper(url, function(data) {
    callback(data);
  });
}

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
}

function createSpeech(data, callback) {
  var concat_list = 'concat:';
  var article = data.title + '\n' + data.contents;
  splitArticle(article).forEach(function (line, i) {
    console.log(line);
    console.log('----')
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

  // could progressively add to the main mp3 here, one file at a time
  // not very performant but better than the hit or miss situation right now?
  callback(concat_list);
}

// rename this method
// could use a tokenizer here
// https://www.npmjs.com/package/summarizely
// https://github.com/contours/node-splitta
// https://www.npmjs.com/package/sentence-tokenizer
// https://github.com/NaturalNode/natural
// http://julian.com/research/blast/
function splitArticle(article) {
    if (article.split(/\n/).length > 5) {
      return article.split(/\n/);
    } else if (article.split(/[.|!|?]\s/).length > 3) {
      // need a regex to keep that splitting element (the . or ! or ?)
      var piece = '';
      var pieces = [];
      var sentences = article.split(/[.|!|?]\s/);
      for(var i = 0, len = sentences.length; i < len; i++) {
        piece += sentences[i] + '. ';
        if (piece.length > 1000) {
          pieces.push(piece);
          piece = '';
        }
      }
      pieces.push(piece);
      return pieces;
    } else {
      return article.match(/[\s\S]{1,100}/g) || [];
    }
}

// use the article title as the filename
function createMP3(concat_list) {
  var cmd = 'ffmpeg -i "' + concat_list.slice(0, -1) + '" -c copy content/' + Date.now() +'.mp3 -y';
  console.log(cmd);
  exec(cmd, {silent:true});
  //exec(cmd);

  // use this to edit the mp3 metadata (add an image, creator, link to article, etc)
  // https://www.npmjs.com/package/ffmetadata
};

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
