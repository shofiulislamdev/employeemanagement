require('dotenv').config()
const express = require('express')

const dbConnection = require('./config/dbConnection')
const { registrationController, loginController, logOutController } = require('./controllers/authController')
const {profileCreateController, getProfile, getSingleProfile, updateProfile, holdProfile, getHoldProfile, deleteProfile} = require('./controllers/profileCreateController')
const app = express()


app.use(express.json())

dbConnection()

app.post('/registration', registrationController)
app.post("/login", loginController)
app.post("/logout", logOutController)

//Profile Create
app.post("/profilecreate", profileCreateController)
app.post("/update/:id", updateProfile)
app.post("/holdprofile", holdProfile)
app.get("/getprofile", getProfile)
app.get("/getprofile/:id", getSingleProfile)
app.get("/getholdprofile", getHoldProfile)

app.delete('/deleteprofile/:id', deleteProfile)

// console.log(process.env.PORT)
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})