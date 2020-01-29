import {
  selectArticleByArticleID,
  insertArticle,
  deleteOneArticleByArticleID,
} from '../modules/articles.module';

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

export const deleteArticleByArticleID = (req, res) => {
  deleteOneArticleByArticleID(req.params.articleID)
    .then(() => res.status(204).send())
    .catch((error) => res.status(404).send(error));
};
