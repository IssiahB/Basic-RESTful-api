const controller = require('../controllers/main.js');
const {Router} = require('express'); // includes only router class
const router = Router();


router.get('/', controller.home);
router.get('/articles', controller.getArticles);
router.get('/articles/:articleId', controller.getArticles);
router.post('/articles', controller.postArticle);

module.exports = router;