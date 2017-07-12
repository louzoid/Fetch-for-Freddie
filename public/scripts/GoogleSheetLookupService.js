; (function (global) {
    'use strict'
    var $ = global.jQuery;

    function GoogleSheetLookupService(sheetKey) {
        var self = this;

        var _sheetKey = sheetKey;

        function processResults(data) {
            var res = [];
            var row = data.feed.entry;
            var c = 2;
            $(row).each(function () {
                var urlToTest = this.gsx$urltotest.$t;
                var expectedUrl = this.gsx$expectedurl.$t;
                res.push({ rowNo: c, urlToTest: urlToTest, expectedUrl: expectedUrl });
                c++;
            });
            return res;
        }

        self.loadResults = function(cb) {

            var url = self.googleApiUrl(_sheetKey, 1);

            $.getJSON(url, function (data) {
                var res = processResults(data);
                cb(null, res);
            }).fail(function () { console.log("couldn't load data :("); });
        }

        self.googleApiUrl = function (key, worksheet) {
            return "https://spreadsheets.google.com/feeds/list/" + key + "/" + worksheet + "/public/values?alt=json&callback=?";
        };

    }

    global.GoogleSheetLookupService = GoogleSheetLookupService;
})(window)
