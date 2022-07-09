exports.checkBody = (req,res,next,val) => {
    if(!req.body.name || !req.body.price){
        return res.status(404).json({
            status: 'Fail',
            message: 'Name or Price not defined'
        })
    }
    next()
}

exports.getAllUsers = (req, res) => {
	res.status(500).json({
		status: 'Failed',
		message: 'Path not'
	});
}

exports.getUser = (req, res) => {
	const id = req.params.id * 1;
	if (id > tours.length) {
		return res.status(404).json({
			status: 'Not Found',
			message: 'Invalid ID',
		});
	}
	res.status(500).json({
		status: 'Failed',
		message: 'Path not'
	});
}

exports.postUser = (req, res) => {
	res.status(500).json({
		status: 'Failed',
		message: 'Path not'
	});
}

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
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