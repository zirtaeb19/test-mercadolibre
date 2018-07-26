let author = {
    name: "Beatriz",
    lastname: "Martínez"
}

function listItems(body) {
    let bodyResp = JSON.parse(body);
    let categories = categoriesBreadcrumb(bodyResp);
    let data = {
        author: author,
        categories: categories
    }
    data.items = bodyResp.results.map(function (value) {
        return {
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
        };
    });

    return data;
}

function categoriesBreadcrumb(bodyResp) {
    if (bodyResp.filters.length > 0) {
        fromFilters(bodyResp.filters[0].values[0].path_from_root);
    }
    else {
        fromAvailableFilters(bodyResp.available_filters[0].values);
    }
}

function fromFilters(filters) {
    let categories = [];
    for (let i = 0, length = filters.length; i < length; i++) {
        categories.push(filters[i].name);
    }
    console.log(categories);
    return categories;
}


function fromAvailableFilters(arr) {
    let maxResults = arr[0].results;
    let category = arr[0].name;
    for (let i = 1, length = arr.length; i < length; i++) {
        let value = arr[i].results;
        if (value > maxResults) {
            maxResults = value;
            category = arr[i].name;
        }
    }
    console.log(category);
    return category;
}

module.exports = { listItems };