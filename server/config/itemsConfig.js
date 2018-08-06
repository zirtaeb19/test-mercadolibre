const dataConfig = require('../config/dataConfig');

function listItems(bodyResp) {
    let categories = categoriesBreadcrumb(bodyResp);
    let data = {
        author: dataConfig.author,
        categories: categories
    }
    data.items = bodyResp.results.map(value => {
        return dataConfig.baseDataItem(value);
    });

    return data;
}

function categoriesBreadcrumb(bodyResp) {
    if (bodyResp.filters.length > 0) {
        return fromFilters(bodyResp.filters[0].values[0].path_from_root);
    }
    return fromAvailableFilters(bodyResp.available_filters[0].values);
}

function fromFilters(filters) {
    let categories = [];
    for (let i = 0, length = filters.length; i < length; i++) {
        categories.push(filters[i].name);
    }
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
    return [category];
}

module.exports = { listItems };