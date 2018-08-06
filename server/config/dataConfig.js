const urlPath = 'https://api.mercadolibre.com/';
const author = {
    name: "Beatriz",
    lastname: "Martínez"
}

const condition = {
    'new': 'Nuevo',
    'used': 'Usado'
};

function baseDataItem(item) {
    return {
        "id": item.id,
        "title": item.title,
        "price": {
            "currency": item.currency_id == 'ARS' ? '$' : item.currency_id,
            "amount": item.price,
            "decimals": item.price,
        },
        "picture": item.thumbnail,
        //"picture": item.pictures[0].url,
        "condition": condition[item.condition],
        "free_shipping": item.shipping.free_shipping,
        "sold_quantity": item.sold_quantity,
        "city": (item.address) ? item.address.city_name : null,
        "description": ""
    }
}

module.exports = { urlPath, author, baseDataItem };