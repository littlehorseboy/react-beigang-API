import {
  selectImagesByArticleID,
  insertImage,
  deleteOneImageByImageIDAndName,
} from '../modules/images.module';

export const getImagesByArticleID = (req, res) => {
  selectImagesByArticleID(req.params.articleID)
    .then((result) => res.status(200).send(result))
    .catch((error) => res.status(404).send(error));
};

export const postImage = (req, res) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send('post data 格式錯誤');
  } else {
    insertImage({
      ...req.body,
    })
      .then(() => res.status(204).end())
      .catch((error) => res.status(400).send(error));
  }
};

export const deleteImageByImageIDAndName = (req, res) => {
  deleteOneImageByImageIDAndName(req.params.imageID, req.params.name)
    .then(() => res.status(204).end())
    .catch((error) => res.status(404).send(error));
};
