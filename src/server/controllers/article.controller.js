import {
  selectArticles,
  selectArticleByArticleID,
  insertArticle,
  updateOneArticleByArticleID,
  deleteOneArticleByArticleID,
} from '../modules/articles.module';

import { deleteImagesByArticleID } from '../modules/images.module';

export const getArticles = (req, res) => {
  selectArticles()
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(404).send(error));
};

export const getArticleByArticleID = (req, res) => {
  selectArticleByArticleID(req.params.articleID)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(404).send(error));
};

export const postArticle = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('post data 格式錯誤');
  } else {
    insertArticle({ ...req.body })
      .then(() => res.status(204).send())
      .catch((error) => res.status(400).send(error));
  }
};

export const putArticleByArticleID = (req, res) => {
  updateOneArticleByArticleID(req.params.articleID, { ...req.body })
    .then(() => res.status(204).send())
    .catch((error) => res.status(400).send(error));
};

export const patchArticleByArticleID = (req, res) => {
  updateOneArticleByArticleID(req.params.articleID, { ...req.body })
    .then(() => res.status(204).send())
    .catch((error) => res.status(400).send(error));
};

export const deleteArticleByArticleID = (req, res) => {
  Promise.all([
    new Promise((resolve, reject) => deleteOneArticleByArticleID(req.params.articleID)
      .then(() => resolve())
      .catch(() => reject())),
    new Promise((resolve, reject) => deleteImagesByArticleID(req.params.articleID)
      .then(() => resolve())
      .catch(() => reject())),
  ])
    .then(() => res.status(204).send())
    .catch((error) => res.status(404).send(error));
};
