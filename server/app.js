var express = require('express');
var nunjucks = require('nunjucks');
var router = express.Router();
var app = express();
var request = require('request');
var bodyParser = require('body-parser');
var PromiseAll = require('promises-all');
let author = {
    name: "Beatriz",
    lastname: "Martínez"
}

app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true }));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', router);

router.get('/items', function (req, res) {
    var query = req.query.q;
    request({
        method: 'GET',
        uri: 'https://api.mercadolibre.com/sites/MLA/search?q=' + query
    }, function (error, response, body) {
        var bodyResp = JSON.parse(body);
        let data = {
            author: author,
            categories: bodyResp.available_filters[0],
            items: []
        }
        bodyResp.results.map(function (value) {
            data.items.push({
                "id": value.id,
                "title": value.title,
                "price": {
                    "currency": value.currency_id,
                    "amount": value.price,
                    "decimals": value.price
                },
                "picture": value.thumbnail,
                "condition": value.condition,
                "free_shipping": value.shipping.free_shipping,
                "city": value.address.city_name
            });
        });

        res.send(data);

    });
});


router.get('/items/:id', function (req, res) {
    var itemId = req.params.id;
    PromiseAll.all([request1(), request2()])
        .then(function (response) {
            let item = response.resolve[0];
            item.item.description = response.resolve[1];
            res.send(item);
        });

    function request1() {

        return new Promise(function (resolve, reject) {
            request({
                method: 'GET',
                uri: 'https://api.mercadolibre.com/items/' + itemId
            }, function (error, response, body) {
                var bodyResp = JSON.parse(body);
                let detail = {
                    "author": author,
                    "item": {
                        "id": bodyResp.id,
                        "title": bodyResp.title,
                        "price": {
                            "currency": bodyResp.currency_id,
                            "amount": bodyResp.price,
                            "decimals": bodyResp.base_price,
                        },
                        "picture": bodyResp.thumbnail,
                        "condition": bodyResp.condition,
                        "free_shipping": bodyResp.shipping.free_shipping,
                        "sold_quantity": bodyResp.sold_quantity,
                        "description": ""
                    }
                }
                resolve(detail);
            });
        })

    }
    function request2() {

        return new Promise(function (resolve, reject) {
            request({
                method: 'GET',
                uri: 'https://api.mercadolibre.com/items/' + itemId + '/description'
            }, function (error, response, body) {
                var bodyResp = JSON.parse(body);
                resolve(bodyResp.text);
            });
        })

    }
});



// Start the server listening
var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Start', port);
});