const fs = require('fs');

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/./../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req,res,next,val) => {
    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'Fail',
            message: 'Name or Price not defined'
        })
    }
    next()
}

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		results: tours.length,
		data: {
			tours,
		},
	});
}

exports.getTour = (req, res) => {
	const id = req.params.id * 1;
	if (id > tours.length) {
		return res.status(404).json({
			status: 'Not Found',
			message: 'Invalid ID',
		});
	}
	const tour = tours.find((el) => el.id === id);
	res.status(200).json({
		status: 'Success',
		data: {
			tour,
		},
	});
}

exports.postTour = (req, res) => {
	const newId = tours.length;
	const newTour = Object.assign({ id: newId }, req.body);
	tours.push(newTour);
	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: 'Success',
				data: {
					tour: newTour,
				},
			});
		}
	);
}

exports.updateTour = (req, res) => {
	const id = req.params.id*1;
	if (id > tours.length) {
		return res.status(404).json({
			status: 'Not Found',
			message: 'Invalid ID',
		});
	}
	res.status(500).json({
		status: 'Failed',
		message: 'Path not defined yet'
	});
}

exports.deleteTour = (req, res) => {
	const id = req.params.id*1;
	if (id > tours.length) {
		return res.status(404).json({
			status: 'Not Found',
			message: 'Invalid ID',
		});
	}
	res.status(500).json({
		status: 'Failed',
		message: 'Path not defined yet'
	});
}