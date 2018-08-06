const express = require('express');
const router = express.Router();
const request = require('request');
const dataConfig = require('../config/dataConfig');
const itemsConfig = require('../config/itemsConfig');

router.get('/items', function (req, res) {
    var query = req.query.q;
    request({
        method: 'GET',
        uri: dataConfig.urlPath + 'sites/MLA/search?q=' + query
    }, function (error, response, body) {
        let bodyResp = JSON.parse(body);
        if (error) { res.status(500).json({ message: "Error de servicio" }); return; }
        if (bodyResp.results.length === 0) { res.status(404).json({ message: "No hay publicaciones que coincidan con tu búsqueda." }); return; }
        res.send(itemsConfig.listItems(bodyResp));
    });
});


router.get('/items/:id', function (req, res) {
    var itemId = req.params.id;

    Promise.all([getDataItem(), getDescriptionItem()])
        .then(function (response) {

            let detail = {
                "author": dataConfig.author,
                "item": response[0]
            }
            detail.item.description = response[1];
            res.send(detail);
        })
        .catch(function (error) {
            res.status(404).json(error);
        });

    function getDataItem() {
        return new Promise(function (resolve, reject) {
            request({
                method: 'GET',
                uri: dataConfig.urlPath + 'items/' + itemId
            }, function (error, response, body) {
                var bodyResp = JSON.parse(body);
                if (bodyResp.status === 404) {
                    reject({ message: "Elemento no encontrado" });
                    return;
                }
                let item = dataConfig.baseDataItem(bodyResp);
                resolve(item);
            });
        })
    }

    function getDescriptionItem() {
        return new Promise(function (resolve, reject) {
            request({
                method: 'GET',
                uri: dataConfig.urlPath + 'items/' + itemId + '/description'
            }, function (error, response, body) {
                var bodyResp = JSON.parse(body);
                if (bodyResp.status === 404) {
                    reject({ message: "Elemento no encontrado" });
                    return;
                }
                resolve(bodyResp.plain_text);
            });
        })
    }
});

module.exports = router;