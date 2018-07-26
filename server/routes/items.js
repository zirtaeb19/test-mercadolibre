const express = require('express');
const router = express.Router();
const request = require('request');
const PromiseAll = require('promises-all');
const dataConfig = require('../config/dataConfig');
const itemsConfig = require('../config/itemsConfig');

router.get('/items', function (req, res) {
    var query = req.query.q;
    request({
        method: 'GET',
        uri: dataConfig.urlPath + 'sites/MLA/search?q=' + query
    }, function (error, response, body) {
        res.send(itemsConfig.listItems(body));
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
                uri: dataConfig.urlPath + 'items/' + itemId
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
                uri: dataConfig.urlPath + 'items/' + itemId + '/description'
            }, function (error, response, body) {
                var bodyResp = JSON.parse(body);
                resolve(bodyResp.text);
            });
        })
    }
});

module.exports = router;