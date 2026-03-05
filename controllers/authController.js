// const { model } = require("mongoose");

const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")

let registrationController = async (req, res) => {
    const { username, email, password } = req.body

    // Todo for next -> validation

    // Check Existing User

    try {
        let existingUser = await User.findOne({ email: email })



        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exist"
            })
        }



        //callback way

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: "Server Error"
                })
            }

            let createUser = new User({
                username: username,
                email: email,
                password: hash
            })

            createUser.save();

            res.send({
                id: createUser._id,
                username: createUser.username,
                email: createUser.email
            })
        });





        // promis use kore (then(), catch())

        // bcrypt.hash(password, 10)
        //     .then((hash) => {

        //         let createUser = new User({
        //             username: username,
        //             email: email,
        //             password: hash
        //         })

        //         createUser.save();

        //         res.send({
        //             id: createUser._id,
        //             username: createUser.username,
        //             email: createUser.email
        //         })

        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         return res.status(500).json({
        //             success: false,
        //             message: "Server Error"
        //         })
        //     })







        // async await method

        // try {
        //     let encrypt = await bcrypt.hash(password, 10)

        //     let createUser = new User({
        //         username: username,
        //         email: email,
        //         password: encrypt
        //     })

        //     await createUser.save()

        //     res.send({
        //         id: createUser._id,
        //         username: createUser.username,
        //         email: createUser.email
        //     })

        // } catch (error) {
        //     console.log(error)
        //     return res.status(500).json({
        //         success: false,
        //         message: "Server Error"
        //     })
        // }







    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }


}

module.exports = { registrationController }

