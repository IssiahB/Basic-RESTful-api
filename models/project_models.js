const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, function(err) {
    if (err)
        console.log(err);
    else
        console.log('Successfully Connected To Database!');
});

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Article = mongoose.model('article', articleSchema);

module.exports = {
    Article,
}