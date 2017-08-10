let allCountries = require('./data/allCountries.json')
let argv = require('minimist')(process.argv.slice(2));
let request = require('request');
let webshot = require('webshot');
let async = require('async');
let baseUrl = argv.baseUrl;
let fs = require('fs');
let finished = true;
let found = {
    found: [],
    notFound: []
}
let getPicture = function getPicture(country, countryCode, callback) {
    finished = false;
    let url = baseUrl+countryCode;
    request(url, function (error, response, body) {
        if(error) {
            console.error(error);
            return callback(null, error);
        }
        if (body.indexOf(argv.game) != -1) {
            console.log(argv.game +" found in " + country);
            found.found.push(country);
            let webshotConfig = {
                windowSize: {
                    width: 1920,
                    height: 1080
                },
                shotSize: {
                    width: 1920,
                    height: "all"
                }
            };
            if (argv.saveImage) {
                webshot(url, "images/"+country+".png", webshotConfig, function (err) {
                    if (err){
                        console.error(err);
                    }
                    console.log("screenshot saved!");
                    finished = false;
                    return callback(null);
                });
            }
            return callback();
        }
        else {
            console.log(argv.game +" NOT found in " + country + " :-(");
            found.notFound.push(country);
            return callback();
        }
    });
}
let functions = [];
for (let i in allCountries) {
    functions.push(
        function (callback) {
            getPicture(i, allCountries[i], callback);
        }
    );  
}
async.parallel(functions, function (error) {
    if (error) {
        console.log(error);
    }
    console.log("Done");
    fs.writeFileSync("found.txt", found.found.join("\n"));
    fs.writeFileSync("notFound.txt", found.notFound.join("\n"));
});
