const express = require('express');
const app = express();

app.use(express.static(__dirname + '/dist/prova-srm-web'));

app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/prova-srm-web/index.html')
});

app.listen(process.env.PORT || 4200 );

