const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './config.env'})

const DB = process.env.MONGO_CONNECT.replace('<PASSWORD>', process.env.MONGODB_PASSWORD)

mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}).then(() => {
	console.log("DB connection succesful")
})

const tourSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true,'A tour must have a name'],
		unique: [true,'A tour must have a price']
	},
	rating: {
		type: Number,
		default: 4.5
	},
	price: {
		type: Number,
		required: [true,'A tour must have a price'],
	}
})

const Tour = mongoose.model('Tour', tourSchema)

const newTour = new Tour({
	name: 'Test Tour 1',
	price: 500,
	rating: 4.9
})

newTour.save().then(doc => {
	console.log(doc)
}).catch(err => {
	console.log(`Krdi na glti ${err}`)
})

const port = 3000;
app.listen(port, () => {
	console.log('App running on port 3000');
});