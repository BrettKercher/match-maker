const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const swaggerExpress = require('swagger-express-mw');
const queueManager = require('./app/inc/queueManager');

app.use(bodyParser.json());
app.use(cors());

const swaggerConfig = {
    appRoot: __dirname,
    swaggerFile: __dirname + '/app/api/swagger/swagger.yaml'
};

swaggerExpress.create(swaggerConfig, function(err, swaggerExpress) {
    if (err) { throw err; }

    swaggerExpress.register(app);

    queueManager.initialize();

    const port = process.env.PORT || 5000;
    app.listen(port, 'localhost', function() {
        console.log('Match Making Server Listening on port ' + port);
    });
});