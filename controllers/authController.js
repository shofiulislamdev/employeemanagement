// const { model } = require("mongoose");

const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")

let registrationController = async (req, res) => {
    const { username, email, password } = req.body

    // Todo for next-> validation

    // Check Existing User

    try {
        let existingUser = await User.findOne({ email: email })



        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email Already Exist"
            })
        }


        // Another way to bcrypt

        try {

            const hash = bcrypt.hashSync(password, 10);

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

            console.log(hash)

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Server error"
            })
        }






        //callback way

        // bcrypt.hash(password, 10, function (err, hash) {
        //     if (err) {
        //         console.log(err)
        //         return res.status(500).json({
        //             success: false,
        //             message: "Server Error"
        //         })
        //     }

        //     let createUser = new User({
        //         username: username,
        //         email: email,
        //         password: hash
        //     })

        //     createUser.save();

        //     res.send({
        //         id: createUser._id,
        //         username: createUser.username,
        //         email: createUser.email
        //     })
        // });





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

let loginController = async (req, res) => {
    let { email, password } = req.body


    let existingUser = await User.findOne({ email: email })

    // res.send(existingUser)

    if (!existingUser) {
        return res.status(404).json({
            success: false,
            message: "Email not found"
        })
    }

    if (existingUser.isLogin) {
        return res.status(400).json({
            success: false,
            message: "Please logout from another device"
        })
    }



    let pass = bcrypt.compareSync(password, existingUser.password);

    if (pass) {
        existingUser.isLogin = true
        existingUser.save()
        res.status(200).json({
            success: true,
            message: "Login SuccessFull"
        })
    } else {
        res.status(200).json({
            success: false,
            message: "Invalid Credential"
        })
    }
}

let logOutController = async (req, res) => {
    let { id } = req.body

    let existingUser = await User.findOne({ _id: id });
    existingUser.isLogin = false
    existingUser.save()

    res.status(200).json({
        success: true,
        message: "Logout Done"
    })
}

module.exports = { registrationController, loginController, logOutController }

