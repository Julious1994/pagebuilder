module.exports = function(app) {
    const site = require('./builder.controller');

    app.get("/rest/sites", site.find);

    app.post("/rest/sites", site.create);
}


