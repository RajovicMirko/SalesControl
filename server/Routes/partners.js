//ROUTER SETUP
const express = require("express");
const router = express.Router();
const partnersCollection = require('../Models/partners');

// GET ALL PARTNERS
router.get('/', isLogedIn, (req, res) => {
		const filter = {};
		if(req.query.showActive) filter.active = req.query.showActive;
		if(req.query.searchString) filter.name = { $regex: req.query.searchString || '', $options: "i" };
	
		partnersCollection.find(filter, (err, data) => {
			if(err){
				res.status(400).send(err);
			}else{
				res.status(200).send(data);	
			}
		});
});

// GET PARTNER BY ID
router.get('/:id', (req, res) => {
	const id = req.params.id;
	
	partnersCollection.findById({ _id: id }, (err, data) => {
		if(err){
			res.status(400).send(err);
		}else{
			res.status(200).send(data);
		}
	});
});

// INSERT NEW PARTNER
router.post('/', (req, res) => {
	const partner = req.body.partner;
	
	partnersCollection.create(partner, (err, newPartner) => {
		if(err){
			res.status(400).send(err);
		}else{
			res.status(201).send(newPartner);
		}
	});
});

// UPDATE PARTNER BY ID
router.put('/:id', (req, res) => {
	const id = req.params.id;
	const partner = req.body;
	
	partnersCollection.updateOne({_id: id}, { $set: partner }, (err, updatedPartner) => {
		if(err){
			res.status(400).send(err);	
		}else{
			partnersCollection.findById({_id: id}, (err, partner) => {
				if(err){
					res.status(404).send({
						message: "Partner je ažuriran, ali nisu vraćene vrednosti"
					})
				}else{
					res.status(200).send(partner);	
				}
			})
		}
	})
});

// DELETE PARTNER BY ID
router.delete('/:id', (req, res) => {
	const id = req.params.id;
	
	partnersCollection.deleteOne({ _id: id }, (err, data) => {
		if(err){
			res.status(400).send(err);
		}else{
			res.status(200).send({
				message: `Partner with ID:${id} is deleted`
			});
		}
	});
});

router.get('/*', (req, res) => {
	res.status(400).send({
		message: "Nije pronađena tražena putanja",
		valOne: "test",
		status: 400
	});
})

module.exports = router;



function isLogedIn(req, res, next){
	return next();
	console.log(req.isAuthenticated());
	
	if(req.isAuthenticated()){
		return next();
	}
	res.status(401).send({
		message: "You are not allowed to do that"
	})
}