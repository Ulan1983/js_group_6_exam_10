const fs = require('fs');
const nanoid = require('nanoid');

const readFile = filename => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

const writeFile = (filename, data) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(filename, data, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
};

const newsFilename = './news.json';
const commentsFilename = './comments.json';


let newsData = [];
let commentsData = [];

module.exports = {
	async init() {
		try {
			const fileContents = await readFile(newsFilename);
			const fileContentsComments = await readFile(commentsFilename);
			newsData = JSON.parse(fileContents.toString());
			commentsData = JSON.parse(fileContentsComments.toString());
		} catch (e) {
			console.log('Could not read file ' + newsFilename);
			console.log('Could not read file ' + commentsFilename);
			newsData = [];
			commentsData = [];
		}
	},
	async getItems() {
		return newsData;
	},
	async getCommentsItems() {
		return commentsData;
	},
	async getItemById(id) {
		return newsData.find(item => item.id === id);
	},
	async getCommentsItemById(id) {
		return commentsData.find(item => item.id === id);
	},
	async addItem(item) {
		item.id = nanoid();
		item.date = new Date().toISOString();
		newsData.push(item);
		await this.save();
	},
	async addComment(comment) {
		comment.id = nanoid();

		if (!comment.author) {
			comment.author = 'Anonymous';
		}
		commentsData.push(comment);
		await this.saveCategory();
	},
	async deleteItem(item) {
		const itemIndex = newsData.findIndex(i => i.id === item.id);
		newsData.splice(itemIndex, 1);
		await this.save();
	},
	async deleteComment(comment) {
		const itemIndex = commentsData.findIndex(i => i.id === comment.id);
		commentsData.splice(itemIndex, 1);
		await this.saveCategory();
	},
	async save() {
		const fileContents = JSON.stringify(newsData, null, 2);
		await writeFile(newsFilename, fileContents);
	},
	async saveCategory() {
		const fileContents = JSON.stringify(commentsData, null, 2);
		await writeFile(commentsFilename, fileContents);
	},
};