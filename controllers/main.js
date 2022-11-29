const models = require('../models/project_models.js');

const home = function(req, res) {
    res.render('index', {});
}

const getArticles = function(req, res) {
    models.Article.find({}, function(err, result) {
        if (err)
            res.sendStatus(500).render('server_error', {});
        else
            res.send(result);
    });
}

module.exports = {
    home,
    getArticles,
}