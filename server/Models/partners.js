const mongoose = require("mongoose");

const PartnersSchema = new mongoose.Schema(
	{
		name: String,
		mob: String,
		email: String,
		active: Boolean,
		orders:[
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Orders"
			}
		]
	},
	{
		collection: "partners"
	}
);

const partnerModel = mongoose.model('Partners', PartnersSchema);

module.exports = partnerModel;