const express = require('express');
const cors = require('cors');
const news = require('./app/news');
const comments = require('./app/comments');
const fileDb = require('./fileDb');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use('/news', news);
app.use('/comments', comments);

const run = async () => {
	await fileDb.init();

	app.listen(port, () => {
		console.log(`Server started on ${port} port!`);
	});
};

run().catch(e => {
	console.error(e);
});