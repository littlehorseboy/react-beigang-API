import express from 'express';
import {
  getImagesByArticleID, postImage, deleteImageByImageIDAndName,
} from '../controllers/images.controller';

const router = express.Router();

router.route('/:articleID').get(getImagesByArticleID);

router.route('/').post(postImage);

router.route('/:imageID/:name').delete(deleteImageByImageIDAndName);

export default router;
