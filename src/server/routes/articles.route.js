import express from 'express';
import {
  getArticles,
  getArticleByArticleID,
  postArticle,
  deleteArticleByArticleID,
} from '../controllers/article.controller';

const router = express.Router();

router.route('/').get(getArticles);

router.route('/:articleID').get(getArticleByArticleID);

router.route('/').post(postArticle);

router.route('/:articleID').delete(deleteArticleByArticleID);

export default router;
