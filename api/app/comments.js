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
	const comments = await fileDb.getCommentsItems();
	res.send(comments);
});

router.get('/?news_id=:id', async (req, res) => {
	const comment = await fileDb.getCommentsItemById(req.params.id);
	res.send(comment);
});

router.post('/', upload.single('image'), async (req, res) => {


	await fileDb.addComment(req.body);
	res.send(req.body.id);
});

router.delete('/:id', async (req, res) => {
	await fileDb.deleteComment(req.params.id);
	res.send("Comment has been deleted");
});

module.exports = router;