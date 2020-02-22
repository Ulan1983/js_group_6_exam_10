const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const fileDb = require('../fileDb');
const config = require('../config');

const storage = multer.diskStorage({
	destination: (req, file, cb) => cb(null, config.uploadPath),
	filename: (req, file, cb) => cb(null, nanoid() + path.extname(file.originalname))
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
	const news = await fileDb.getItems();
	const newsArray = [];

	for (let oneNew of news) {
		const newOneNews = {
			title: oneNew.title,
			id: oneNew.id,
			image: oneNew.image,
			date: oneNew.date
		};
		newsArray.push(newOneNews);
	}
	res.send(newsArray);
});

router.get('/:id', async (req, res) => {
	const oneNews = await fileDb.getItemById(req.params.id);
	res.send(oneNews);
});

router.post('/', upload.single('image'), async (req, res) => {

	if (req.file) {
		req.body.image = req.file.filename;
	}
	if (!req.body.title || !req.body.description) {
		res.status(404).send({message: 'Error! Please fill all required fields!'});
	}
	await fileDb.addItem(req.body);
	res.send(req.body.id);
});

router.delete('/:id', async (req, res) => {
	await fileDb.deleteItem(req.params.id);
	res.send("News has been deleted");
});

module.exports = router;