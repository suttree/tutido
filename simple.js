// create mp3s with link and picture in the metadata (for the iPlayer archives?)

var fs = require('fs'),
    Ivona = require('ivona-node'),
    readability = require("node-readability"),
    sanitizer = require("sanitizer");

var ivona = new Ivona({
    accessKey: 'GDNAIWABFZTUS7TFCI5Q',
    secretKey: 'l5tEgLDQzeR85ZuH8/VMvS1Px7Noltuac6ZDjQwQ'
});

// from http://nodeexamples.com/2012/09/27/scraping-a-pages-content-using-the-node-readability-module-and-node-js/
function scraper(url, callback) {
    readability.read(url, function(err, doc) {
        if (err) {
            throw err;
        }

        var obj = {
            "url": url,
            "title": doc.getTitle().trim(),
            "contents": stripHTML(doc.getContent() || "")
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


var concat_list = 'concat:';

article.split('\n').forEach(function (line, i) {
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

const exec = require('child_process').exec;
const child = exec("ffmpeg -i \"" + concat_list.slice(0, -1) + "\" -c copy content/article.mp3");
//const child = exec("ffmpeg -i \"" + concat_list.slice(0, -1) + "\" -acodec copy article.mp3
//    (error, stdout, stderr) => {
//        console.log(`stdout: ${stdout}`);
//        console.log(`stderr: ${stderr}`);
//        if (error !== null) {
//            console.log(`exec error: ${error}`);
//        }
//});
console.log(concat_list);

scraper("http://www.readability.com/about", function (data) {
  console.log("# %s #\n\n%s\n\n---", data.title, data.contents);
});
