const models = require('../models/project_models.js');

const home = function(req, res) {
    res.render('index', {});
}

const getArticles = function(req, res) {
    const articleId = req.params.articleId;

    // get all articles in there is no id given
    if (articleId == undefined) {
        models.Article.find({}, function(err, result) {
            if (err)
                res.render('server_error', {errors: err});
            else
                res.send(result);
        });
    } else {
        models.Article.findOne({_id: articleId}, function(err, result) {
            if (err)
                res.render('server_error', {errors: err});
            else
                res.send(result);
        });
    }
}

const postArticle = function(req, res) {
    const postTitle = req.body.title;
    const postContent = req.body.content;

    const newModel = new models.Article({
        title: postTitle,
        content: postContent
    });

    newModel.save(function(err) {
        if (err) {
            res.render('server_error', {errors: err});
        } else
            res.send(newModel._id);
    });
}

const deleteArticles = function(req, res) {
    const articleId = req.body.articleId;

    // Delete all articles
    if (articleId == undefined) {
        models.Article.deleteMany({}, function(err) {
            if (err)
                res.render('server_error', {errors: err});
            else
                res.send('Success');
        });
    } else {
        models.Article.findByIdAndDelete(articleId, null, function(err, doc) {
            if (err)
                res.render('server_error', {errors: err});
            else
                res.send(doc);
        });
    }
}

module.exports = {
    home,
    getArticles,
    postArticle,
    deleteArticles,
}