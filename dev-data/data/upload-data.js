const Tour = require('../../models/tourModel')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const fs = require('fs')

dotenv.config({path: './config.env'})

const DB = process.env.MONGO_CONNECT.replace('<PASSWORD>', process.env.MONGODB_PASSWORD)

mongoose.connect(DB, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("DB connection succesful")
}).catch(err => {
	console.log(err)
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const uploadData = async() => {
    try {
        await Tour.create(tours)
        console.log("Data Added Succesfully")
    } catch (error) {
        console.log(error)
    }
}

const deleteData = async() => {
    try {
        await Tour.deleteMany()
        console.log("Deleted")
    } catch (error) {
        console.log(error)
    }
}

if(process.argv[2] === '--import'){
    uploadData()
}
if(process.argv[2] === '--delete'){
    deleteData()
}