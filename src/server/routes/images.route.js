import express from 'express';
import {
  getImagesByArticleID, postImage, deleteImageByImageID,
} from '../controllers/images.controller';

const router = express.Router();

router.route('/:articleID').get(getImagesByArticleID);

router.route('/').post(postImage);

router.route('/:imageID').delete(deleteImageByImageID);

export default router;
