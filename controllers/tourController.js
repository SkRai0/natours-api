const fs = require('fs');
const tourModel = require('./../models/tourModel');
const ApiFeatures = require('./../utils/apiFeatures')

exports.getAllTours = async (req, res) => {
	try{
		const features = new ApiFeatures(tourModel.find(), req.query).filter().sort().limitFields().paginate()
		const tours = await features.query;
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
		console.log(err)
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

exports.getTourStats = async (req, res) => {
	try {
		const stats = await tourModel.aggregate([
			{
				$match: { ratingsAverage: { $gte: 4.5 } }
			},
			{
				$group: {
				_id: { $toUpper: '$difficulty' },
				numTours: { $sum: 1 },
				numRatings: { $sum: '$ratingsQuantity' },
				avgRating: { $avg: '$ratingsAverage' },
				avgPrice: { $avg: '$price' },
				minPrice: { $min: '$price' },
				maxPrice: { $max: '$price' }
				}
			},
			{
				$sort: { avgPrice: 1 }
			}
		]);

		res.status(200).json({
			status: 'success',
			data: {
				stats
			}
		});
		} catch (err) {
			console.log(err)
			res.status(404).json({
			status: 'fail',
			message: err
		});
	}
};


exports.getMonthlyPlan = async (req, res) => {
	try {
		const year = req.params.year * 1; // 2021

		const plan = await tourModel.aggregate([
			{
				$unwind: '$startDates',
			},
			{
				$match: {
					startDates: {
						$gte: new Date(`${year}-01-01`),
						$lte: new Date(`${year}-12-31`),
					},
				},
			},
			{
				$group: {
					_id: { $month: '$startDates' },
					numTourStarts: { $sum: 1 },
					tours: { $push: '$name' },
				},
			},
			{
				$addFields: { month: '$_id' },
			},
			{
				$project: {
					_id: 0,
				},
			},
			{
				$sort: { numTourStarts: -1 },
			},
			{
				$limit: 12,
			},
		]);

		res.status(200).json({
			status: 'success',
			data: {
				plan,
			},
		});
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		});
	}
};