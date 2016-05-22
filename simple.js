// create mp3s with link and picture in the metadata (for the iPlayer archives?)

var fs = require('fs'),
    Ivona = require('ivona-node');

var ivona = new Ivona({
    accessKey: 'GDNAIWABFZTUS7TFCI5Q',
    secretKey: 'l5tEgLDQzeR85ZuH8/VMvS1Px7Noltuac6ZDjQwQ'
});

//ivona.listVoices().on('complete', function(voices) {
//    console.log(voices);
//});

//  [string] text - the text to be spoken
//  [object] config (optional) - override Ivona request via 'body' value
//ivona.createVoice('This is the text that will be spoken.').pipe(fs.createWriteStream('test.mp3'));




var article = `
Berlin’s Hipster Ghetto
Foreign Policy · by Renuka Rayasam · January 18, 2016

BERLIN — Gül-Aynur Uzun weaved her way down Berlin’s Karl-Marx-Strasse, greeting women wearing black chadors in Turkish while chatting with me in German. It was a Saturday afternoon in September, and everyone was scrambling to get their errands finished before stores closed on Sunday; the street was crowded with outdoor displays from discount stores and produce markets.

We were walking through Neukölln, a former West Berlin neighborhood and longtime immigrant enclave. The streets were lined with squat, flat postwar buildings occupied by disparate businesses: Within a few blocks, neighborhood residents could stop for Turkish tea and pastries, pick up a hot-pink handbag, attend services at a mosque, or visit a 19th-century theater. Uzun had just come off a morning of leading tours through the area. Today, people from more than 160 countries call Neukölln home, andjournalists and politicians take Uzun’s tours to better understand one of Berlin’s most diverse neighborhoods.

We turned the corner into an alleyway where the bustle of shops and people gave way to cobblestone streets and farmhouses with window boxes full of flowers. Within a matter of minutes, we were standing in front of a statue of Friedrich Wilhelm I, the Prussian king, set on a high pedestal that dwarfed us both.

This is where Uzun takes her tour groups. Here, she tells them how the Rixdorf quarter of Neukölln has actually been home to immigrants for centuries: In the 18th century, King Friedrich invited Bohemian Protestants to help settle the land here, even freeing them from taxes and exempting them from military service.

“They were allowed to keep their language,” said Uzun, pointing out a street sign still in Czech. “It took them 140 years to really integrate.”

Nearly 300 years after the first Bohemians settled in the neighborhood, Neukölln remains a hub of immigration in Berlin and laboratory for the country’s experiments with integration. Today, more than 40 percent of the neighborhood’s 325,000 residents have an immigrant background, which Germany defines as either being from a different country or having foreign parents or grandparents; about a quarter of the residents don’t have a German passport, according to Neukölln’s district office.

The story of Neukölln is, in some ways, a success story. Located in the far reaches of former West Berlin — about as far away as immigrants could be settled while still remaining within city limits when the Berlin Wall was up — the area has managed to stay integrated with the rest of the capital. Unlike the banlieues of France, Neukölln is well connected to Berlin’s center both practically, with a subway line that runs directly to the middle of the city, and culturally: In recent years, the neighborhood has become home to young Germans attracted to more affordable rents. Cocktail bars and restaurants followed, and what started as a place settled by foreign workers brought in to rebuild a war-torn country has become a popular part of Berlin.

But in other ways, the area continues to struggle. Today, about 15 percent of the neighborhood’s residents are unemployed — higher than Berlin’s overall unemployment rate of 11 percent and more than double the German average of around 6 percent. About a third of the area’s residents are on welfare. And while the neighborhood may feel integrated into the rest of the city, many of its residents say they still don’t feel like full-fledged members of German society.

Today, migrants are streaming into Germany in record numbers. Neukölln’s history offers warnings for the future — and lessons for policymakers of the present.

“So much went wrong with previous efforts at integration,” said Maria Macher, who is a project manager at a social work organization for migrants in the neighborhood. “Now, with a new wave of refugees, we have another chance.”

* * *
“Because of our demography, Germany is forced to be a land of immigrants,” wrote Heinz Buschkowsky, Neukölln’s longtime mayor, in his bestselling 2012 book, Neukölln Is Everywhere. Buschkowsky meant that Germany’s aging population and low birthrate at the time he was writing would require the country to import labor. But in reality, Germany has been a land of immigrants from the beginning.

After its unification in 1871, a rapidly industrializing Germany faced a dearth of workers — the result of decades of war and famine, which sent young people fleeing to places like the United States. So Germany invited guest laborers from other countries — mostly Poland — to help build the economy. By World War I, the country was home to more than 1.2 million foreigners, according to the Federal Agency for Civic Education. It was a strategy Germany would pursue again in the 20th century: In the 1950s and 1960s, it invited guest workers from Italy, Turkey, and elsewhere to rebuild after the devastation of World War II.

But Germany never expected these guest workers to stay. For decades, in fact, the country’s policies actively worked against immigrants trying to build a permanent home: Authorities granted guest workers temporary visas and, in some cases, restricted where they could live. Yet many immigrants, like Uzun and her family, did stay. Today, about a quarter of Germany’s population has an immigrant background, according to a study from the Federal Agency for Civic Education released in June. Of those with immigrant backgrounds, nearly 18 percent are Turkish. And many call Neukölln home.

Uzun’s experience is typical for many immigrants. More than 40 years ago, her mother moved to Germany for a job assembling light bulbs, bringing along 6-year-old Uzun and her two older brothers. Her family swapped a comfortable house with a garden in Istanbul for an apartment in Rixdorf close to her mother’s work. Like most of the neighborhood’s apartments, it was inexpensive and had no bathroom and kitchen. Rixdorf was one of the few areas where they could settle: During her tours, Uzun likes to whip out her mother’s Turkish passport from 1987, filled with two-year visas that stipulate the Berlin neighborhoods in which she was allowed to live.

Uzun stayed in a pure Turkish-speaking school until the fifth grade when she was suddenly thrown into a German-speaking school, where the other kids would have little to do with her. When she finished school, she began working in a printing shop where she met her husband, also the child of a Turkish guest worker.

Today, she speaks fluent German and has raised two kids in Germany. In addition to being a tour guide, she works at a neighborhood organization that helps women from Middle Eastern countries navigate foreign aspects of German life, like how to register for kindergarten or separate trash for recycling. But she still holds a Turkish passport and has to renew her German visa every few years. “I’ve always been treated like an outsider here,” she said.

That experience is common in Germany, which has traditionally pursued an assimilation model of integrating newcomers. It’s similar to the approach pursued in France: The onus is placed on immigrants to make the effort to become more German, rather than Germany opening up the definition of what it means to belong, said Ines Michalowski, a research fellow studying migration and integration at the WZB Berlin Social Science Center.

“Germany just doesn’t see itself as a land of immigrants,” she said.
“Germany just doesn’t see itself as a land of immigrants,” she said.
Despite decades of experience with newcomers, it wasn’t until 2005 that Germany finally passed a national immigration law aimed at helping arrivals from other countries feel more at home. The new provisions eased the process of getting visas and offered free German-language and integration classes. From 2005 until 2013, about 1,333,000 people have taken the classes, according to the Interior Ministry.

While the law was at least a step toward recognizing that Germany was becoming a land of immigrants, it hasn’t been completely successful at boosting their prospects. The Berlin Institute for Population and Development published a 2014 study called “New Potential” showing that Germany still has a long way to go toward integrating immigrants, especially if it wants to use their talents to fill jobs. It found that only about 25 percent of immigrants’ children have completed some form of higher education, compared with 43 percent of native-born Germans. The result is that immigrants from the Middle East and Africa face higher unemployment rates — around 20 percent, compared with 6 percent nationally, and also earn less.

* * *
When Arnold Mengelkoch, Neukölln’s current migration commissioner, first took the job eight years ago, the neighborhood seemed to be on shaky footing, he said. It had been on a downward trend since the early 1990s, when many companies left the neighborhood. Turkish guest workers found themselves without jobs, and the area struggled with drug trafficking, crime, and unemployment, Mengelkoch said. At the same time, Neukölln swelled with refugees from Lebanon, Palestine, and other conflict-ridden regions.

“Kids inherited the frustration of their parents,” he said. “Teachers gave up trying to get kids to go to school.” A lot of the area’s residents, he said, “felt hopeless.” Many throughout Germany saw Neukölln as a symbol of the downsides of immigration.

About six years ago, Mengelkoch was part of a group that put together a manifesto in Neukölln, in an attempt to codify how to integrate newcomers successfully. While the manifesto does talk about the responsibility that society has in integrating immigrants, it places most of the burden on newcomers to learn and adapt to German culture. In the preamble, it states that “newcomers must bring along a willingness to assimilate, learn, and a willingness to adapt” and then goes on to list various ways they should strive to fit into German society.

These integration efforts, which include programs that encourage immigrants to send their kids to free daycare and measures to boost security, made the neighborhood more welcoming. They reduced crime and helped attract non-immigrants to live in Neukölln, paving the way for high-end shops and eateries. But they did little to help immigrants and their families feel welcome.

In the section on education, for instance, the manifesto states that immigrants who withhold their daughters from swimming lessons are violating Berlin’s education law. But many Muslim families in Germany simply don’t feel comfortable having their daughters wear bathing suits in front of males — a feeling that the manifesto’s implied threat did little to change.

Even when Germany has made more help available to immigrant families, that help is often out of reach for new arrivals baffled by the country’s bureaucracy and culture. The problem isn’t that immigrants don’t want to assimilate or give their kids opportunities, said Macher, the social worker. More often, she said, it’s that they don’t know how.

Macher is a project manager at an organization called Diakoniewerk Simeon. In 2004, using public grant money, Macher started a neighborhood mothers’ program that trains immigrant mothers in Neukölln to reach out to other less assimilated immigrant mothers in their native language and help them integrate into German society. The program consists of 10 home visits where neighborhood mothers explain aspects of German life like how to make doctors’ appointments, get library books, enroll in language classes, and read nutrition labels. Uzun is a program alumna. After the training, these mothers are sent out into the neighborhood to find more conservative women at schools or mosques and tell them about the free program.

Since its start, Macher said that the program has reached 8,000 families. Now more than 90 percent of neighborhood toddlers attend free public nurseries, which she says is partly the result of her group’s outreach. “Now the problem is that we need more nursery spots,” she said.

With the sudden influx of migrants over the past year, Germany has recognized the need not only to step up integration efforts but also to rethink its approach. Most of the 1.1 million asylum-seekers who registered in Germany in 2015 remain in temporary housing scattered around the country while awaiting the outcome of their applications. But some have begun making their way toward neighborhoods like Neukölln, where they’ll be largely left to fend for themselves.

In a speech to parliament at the end of November, Interior Minister Thomas de Maizière said Germany has to think about what the influx means for the country over the long term. “Many will stay here longer. It is, therefore, one of the most important tasks to give people who are staying a long-term perspective,” he said, requesting an additional 326 million euros, or $356 million, for integration efforts in 2016. “Successful integration is essential for long-term acceptance and our social cohesion.” But Germany’s plans remain short on details and have largely revolved around more language and integration classes.

There are emerging signs that Germany is coming to terms with what it means to be an immigrant nation. Today, 34.5 percent of children under the age of 5 have an immigrant background, and that figure looks poised to rise. At the annual conference of her conservative Christian Democratic Union in December, German Chancellor Angela Merkel reiterated her “refugees welcome” message, calling for more effort to integrate those from other societies. But since the New Year’s Eve attacks in the city of Cologne, where German woman complained about assaults from mobs of men with largely foreign backgrounds, many in the country have become increasingly wary of newcomers, putting Merkel on the defensive.

Still even in one of the most diverse parts of the country, confusion reigns over what it means to be an immigrant nation. In June 2015, recent law school graduate Betül Ulusoy made headlines when she showed up to sign a contract for her new job as a trainee in the Neukölln city government. She wore a headscarf to the appointment; Neukölln told her it was reconsidering the job offer, before relenting and granting her what they called an exception.
`;

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
  }).pipe(fs.createWriteStream('text-' + i + '.mp3'));
  concat_list += 'text-' + i + '.mp3|';
});

const exec = require('child_process').exec;
const child = exec("ffmpeg -i \"" + concat_list.slice(0, -1) + "\" -c copy article.mp3");
//const child = exec("ffmpeg -i \"" + concat_list.slice(0, -1) + "\" -acodec copy article.mp3
//    (error, stdout, stderr) => {
//        console.log(`stdout: ${stdout}`);
//        console.log(`stderr: ${stderr}`);
//        if (error !== null) {
//            console.log(`exec error: ${error}`);
//        }
//});
console.log(concat_list);

//ivona.createVoice('This is the text that will be spoken.', {
//    body: {
//        voice: {
//            name: 'Emma',
//            language: 'en-GB',
//            gender: 'Female'
//        }
//    }
//}).pipe(fs.createWriteStream('text.mp3'));

// ffmpeg -i "concat:text-0.mp3|text-1.mp3|text-2.mp3|text-3.mp3|text-4.mp3|text-5.mp3|text-6.mp3|text-7.mp3|text-8.mp3|text-9.mp3|text-10.mp3|text-1
// 1.mp3|text-12.mp3|text-13.mp3|text-14.mp3|text-15.mp3|text-16.mp3|text-17.mp3|text-18.mp3|text-19.mp3|text-20.mp3|text-21.mp3|text-22.mp3|text-23.mp3|text-24.mp3|text-25.mp3|text-
// 26.mp3|text-27.mp3|text-28.mp3|text-29.mp3|text-30.mp3|text-31.mp3|text-32.mp3|text-33.mp3|text-34.mp3|text-35.mp3|text-36.mp3|text-37.mp3|text-38.mp3|text-39.mp3|text-40.mp3|text
// -41.mp3|text-42.mp3|text-43.mp3|text-44.mp3|text-45.mp3|text-46.mp3|text-47.mp3|text-48.mp3|text-49.mp3|text-50.mp3|text-51.mp3|text-52.mp3|text-53.mp3|text-54.mp3|text-55.mp3|tex
// t-56.mp3|text-57.mp3|text-58.mp3|text-59.mp3|text-60.mp3|text-61.mp3|text-62.mp3|text-63.mp3|text-64.mp3|text-65.mp3|text-66.mp3|text-67.mp3|text-68.mp3|text-69.mp3" -c copy outpu
// t.mp3
