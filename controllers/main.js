const { Model, model } = require('mongoose');
const models = require('../models/project_models.js');

const home = function(req, res) {
    res.render('index', {});
}

////////////////////////// Getting Articles //////////////////////////

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

////////////////////////// Creating Articles //////////////////////////

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

////////////////////////// Deleting Articles //////////////////////////

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

////////////////////////// Updating Whole Articles //////////////////////////

const replaceArticle = function(req, res) {
    const articleId = req.params.articleId;
    const newTitle = req.body.title;
    const newContent = req.body.content;

    const newArticle = {
        title: newTitle,
        content: newContent
    }

    models.Article.replaceOne({_id: articleId}, newArticle, null, function(err, result) {
        if (err)
            res.render('server_error', {errors: err});
        else
            res.send(result);
    });
}



////////////////////////// Updating Article Parts //////////////////////////

const updateArticle = function(req, res) {
    const articleId = req.params.articleId;
    const newTitle = req.body.title;
    const newContent = req.body.content;

    const updatedPart = {};
    
    // To ensure that a field is not set to undefined if one isn't given
    if (newTitle) 
        updatedPart.title = newTitle;
    if (newContent)
        updatedPart.content = newContent;

    models.Article.updateOne({_id: articleId}, updatedPart, function(err, result) {
        if (err)
            res.render('server_error', {errors: err});
        else
            res.send(result);
    });
}

module.exports = {
    home,
    getArticles,
    postArticle,
    deleteArticles,
    replaceArticle,
    updateArticle
}