const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
	{
		date: {
			type: Date,
			default: Date.now
		},
		items: Array
	},
	{
		collection: "orders"
	}
);

const ordersModel = mongoose.model('Orders', OrdersSchema);

module.exports = ordersModel;