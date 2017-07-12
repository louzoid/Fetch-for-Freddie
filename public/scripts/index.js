$(function() {

  $td = $("#res-tbody");
  $btn = $("#btn");
  $log = $("#log");

  function processBlock(arr) {

    var data = "urls=";
    arr.forEach(function(el) {
      data+=el.urlToTest + ",";
    });
    data = data.slice(0,-1);
    $.getJSON("/fetchUrls", data, function (res) {
      var i = 0;
      res.forEach(function(el) {
        var res = el.endUrl === arr[i].expectedUrl ? "good" : "bad"; //only ok to do this because we're processing in order on the server
        var row = `<tr class="${res}">
        <td>${el.url}</td>
        <td>${arr[i].expectedUrl}</td>
        <td>${el.status}</td>
        <td>${el.endUrl}</td>
        <td>${res}</td>
        </tr>`
        $td.prepend(row);
        i++;
      });
    }).fail(function () {
      $log.text("Oh dear, something went wrong with this chunk");
    });
  }

  function getResults(err, res) {

    $log.text("Got rows from spreadsheet, now sending them off for checking in chunks of 10");
    //split into chunks of 10
    var i,j,temparray,chunk = 10;
    for (i=0,j=res.length; i<j; i+=chunk) {
      temparray = res.slice(i,i+chunk);
      //send array off to processor
      processBlock(temparray);
    }
  }

  $(btn).on("click", function(e) {
    $log.text("Getting rows from Google sheet....");
    var ls = new GoogleSheetLookupService("1TtgH4V9_MSClTGwt21S0Cd-wJehiT5R4USVi88skSbc");
    ls.loadResults(getResults);
  });

})
