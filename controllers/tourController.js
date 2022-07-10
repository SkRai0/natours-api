const fs = require('fs');
const tourModel = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
	try{
		const tours = await tourModel.find()
		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours,
			},
		});
	}catch(err){
		res.status(400).json({
			status: 'Fail',
			message: 'Kuch hoga'
		})
	}
}

exports.getTour = async (req, res) => {
	try{
		const tour = await tourModel.findById(req.params.id)
		res.status(200).json({
			status: 'Success',
			data: {
				tour,
			},
		});
	}catch(err){
		res.status(400).json({
			status: 'Fail',
			message: 'Cannot get tour'
		})
	}
}

exports.postTour = async (req, res) => {
	try{
		const newTour = await tourModel.create(req.body)
		res.status(201).json({
			status: 'Success',
			data: {
				tour: newTour,
			},
		});
	}catch(err){
		res.status(400).json({
			status: 'Fail',
			message: 'Cannot post tour'
		})
	}
}

exports.updateTour = async (req, res) => {
	
	try{
		const tour = await tourModel.findByIdAndUpdate(req.params.id, req.body)

		res.status(200).json({
			status: 'Success',
			data: {
				tour
			}
		})
	}catch(err){
		res.status(400).json({
			status: 'Failed',
			message: 'Could not update tour'
		});
	}
}

exports.deleteTour = async (req, res) => {
	
	try {
		const tour = tourModel.findByIdAndDelete(req.params.id)

		res.status(200).json({
			status: 'Success',
			message: 'Deleted'
		})
	} catch (err) {
		res.status(400).json({
			status: 'Failed',
			message: 'Could not delete'
		})
	}
}