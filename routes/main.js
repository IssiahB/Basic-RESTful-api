const controller = require('../controllers/main.js');
const {Router} = require('express'); // includes only router class
const router = Router();


router.get('/', controller.home);

router.route('/articles')
.get(controller.getArticles)
.post(controller.postArticle)
.delete(controller.deleteArticles);

router.route('/articles/:articleId')
.get(controller.getArticles)
.put(controller.replaceArticle)
.patch(controller.updateArticle);

module.exports = router;