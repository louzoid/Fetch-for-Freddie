var express = require('express');
var router = express.Router();
const fff = require('./fetch/fetchUrls');

router.get('/fetchUrls', function (req, res) {
  var f = new fff();
  var qs = req.query.urls; //['http://staging.main.su.baigentpreview.com/8.id', 'ppp', 'http://staging.main.su.baigentpreview.com/about/107.id', 'http://staging.main.su.baigentpreview.com/AboutScriptureUnion/Vacancies/106126.id'];
  var urls = qs.split(',');
  console.log(urls);
  f.load(urls).then(output =>  {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(output)).end();
  });

});

module.exports = router;
