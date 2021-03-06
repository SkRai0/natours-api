const fs = require('fs');
const tourModel = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
	try{
		// 1) Filtering
		const queryObj = {...req.query}
		const excludedField = ['limit','page','sort','fields']
		excludedField.forEach(el => delete queryObj[el])

		// 2) Advance Filtering
		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`)
		// console.log(JSON.parse(queryStr))
		let query = tourModel.find(JSON.parse(queryStr))
		
		// 3) Sorting
		if(req.query.sort){
			const sortBy = req.query.sort.split(',').join(' ');
			// console.log(sortBy)
			query = query.sort(sortBy)
		}
		else{
			query = query.sort('-createdAt')
		}

		// 4) Limiting Fields
		if(req.query.fields){
			const fields = req.query.fields.split(',').join(' ');
			query = query.select(fields);
		}
		else{
			query = query.select('-__v')
		}

		// 5) Pagination
		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 100;
		const skip = (page-1)*limit;

		query = query.skip(skip).limit(limit)

		if(req.query.page){
			const numTour = await tourModel.countDocuments();
			if(skip>numTour){
				throw new Error('This page does not exist')
			}
		}

		const tours = await query;
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
			err: err
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
		await tourModel.findByIdAndDelete(req.params.id)
		res.status(200).json({
			status: 'Success',
			data: null
		})
		console.log(req.params.id)
	} catch (err) {
		res.status(400).json({
			status: 'Failed',
			message: 'Could not delete'
		})
	}
}