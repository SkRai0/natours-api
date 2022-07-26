const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config({path: './config.env'})

const DB = process.env.MONGO_CONNECT.replace('<PASSWORD>', process.env.MONGODB_PASSWORD)

mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("DB connection succesful 😁")
}).catch(err => {
	console.log(err)
})

const port = 3000;
app.listen(port, () => {
	console.log('App running on port 3000');
});