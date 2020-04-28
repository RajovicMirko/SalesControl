const mongoose = require("mongoose");

const dbName = 'myFirstDb';
const dbPassword = 'Mirkasin.12345';
const dbConnUrl = `mongodb+srv://rajovicmirko:${dbPassword}@cluster0-folf1.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(dbConnUrl, { dbName: dbName, useNewUrlParser: true })
	.then(() => console.log(`Connected to ${dbName} db...`));

module.exports = mongoose;