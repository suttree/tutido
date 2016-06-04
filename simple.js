// TODO hide access token

var fs = require('fs'),
    Ivona = require('ivona-node'),
    read = require("node-readability"),
    sanitizer = require("sanitizer"),
    //request = require('request'),
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
            "html": doc.html,
            "excerpt": doc.excerpt,
            "lead_image_url": doc.lead_image_url,
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

function fetchArticleText(url) {
  scraper(url, function (data) {
    article = data.title + '\n' + data.contents;
    article = stripHTML(article);

    var concat_list = 'concat:';

    //article = "Hello duncan\n how are you?"
    article.split(/\\n/).forEach(function (line, i) {
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
  });
}

var body;
var article;
var args = process.argv.slice(2);
url = "http://readability.com/api/content/v1/parser?url=" + args[0] + "&token=047be2416589ced8d31b1f929286c2b9087eee7b"
console.log(url);
fetchArticleText(url);
