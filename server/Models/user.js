const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
	{
		name: String,
		email: String,
		password: String
	},
	/*{
		collection: "users"
	}*/
);
UserSchema.plugin(passportLocalMongoose);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;