'use strict';
const fetch = require('node-fetch');

function FetchUrls() {
  var self = this;

  self.load = function(urls) {

    return new Promise((resolve, reject) => {

      //var output = "";
      var output = [];
      var mostRecentPromise = Promise.resolve([]);

      urls.forEach(url => {
        var url = decodeURIComponent(url);
        mostRecentPromise = mostRecentPromise.then(urlsSoFar => {
          return fetch(url).then(response => {
            output.push({ url: url, status: response.status, endUrl: response.url });
            urlsSoFar.push(response.url);
            return urlsSoFar;
          }).catch(err => {
            output.push({ url: url, status: err, endUrl: "error resolving this url" });
            return urlsSoFar;
          });
        });
      });

      mostRecentPromise.then(allUrls => {
        //console.log(allUrls);
        resolve(output);
      }).catch(error => {
        return reject(error);
      });
    });

  }
}

module.exports = FetchUrls;
