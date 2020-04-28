//ROUTER SETUP
const express = require("express");
const router = express.Router();
const ordersCollection = require('../Models/orders');
const partnersCollection = require('../Models/partners');

// GET ORDERS BY PARTNER ID
router.get('/:partnerId', (req, res) => {
	const partnerId = req.params.partnerId;
	partnersCollection.findById({_id: partnerId}).populate('orders').exec((err, partner)=>{
		if(err){
			res.status(400).send();
		}else{
			res.status(200).send(partner);	
		}
	})
});

// INSERT NEW ORDER
router.post('/:partnerId', (req, res) => {
	const partnerId = req.params.partnerId;
	const order = req.body.order;
	console.log(partnerId, order)
	ordersCollection.create(order, (err, newOrder) => {
		if(err){
			res.status(400).send();
		}else{
			partnersCollection.findById({_id: partnerId}, (err, partner) => {
				if(err){
					res.status(400).send();
				}else{
					partner["orders"].push(newOrder);
					partner.save((err, data) => {
						if(err){
							res.status(400).send();
						}else{
							res.status(201).send();
						}
					});
				}
			});
		}
	});
});

module.exports = router;