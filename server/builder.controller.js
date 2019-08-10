var Site = require('./site.schema');

exports.create = (req, res) => {
    const site = new Site({
        ...req.body,
    });
    site.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "ERROR in create",
        });
    });
}

exports.find = (req, res) => {
    res.send("FInd one");
}

