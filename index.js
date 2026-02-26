require('dotenv').config()
const express = require('express')

const dbConnection = require('./config/dbConnection')
const app = express()


app.use(express.json())

dbConnection()

app.get('/', (req, res) => {
    res.send('Hello, World');
})


// console.log(process.env.PORT)
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})