import express from 'express';
import config from '../../config/config';
import imagesRoute from './images.route';
import articlesRoute from './articles.route';

const router = express.Router();

router.get('/', (req, res) => res.send(`Hello World! localhost:${config.port}/api`));

router.post('/', (req, res) => res.send('Got a POST request'));

router.put('/', (req, res) => res.send('Got a PUT request at /user'));

router.delete('/', (req, res) => res.send('Got a DELETE request at /user'));

router.use('/images', imagesRoute);

router.use('/articles', articlesRoute);

export default router;
