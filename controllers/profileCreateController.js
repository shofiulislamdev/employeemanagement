const Profile = require("../models/profileCreateModel")

let profileCreateController = async (req, res) => {
    const { email, name, phoneNumber, bloodGroup, gender, dob, designation } = req.body

    //Check if a profile exists with this email
    let existingProfile = await Profile.findOne({ email: email })
    if (existingProfile) {
        return res.status(400).json({
            success: false,
            message: "profile or email already exist"
        })
    }

    let firstThreeLetter = name.slice(0, 3)
    let randomNumber = Date.now().toString()
    let emid = firstThreeLetter + randomNumber.slice(-3)

    //Check if a profile exists with this emid
    let existingEmid = await Profile.findOne({ employeeId: emid })
    if (existingEmid) {
        return res.status(400).json({
            success: false,
            message: "Emid already exist"
        })
    }



    let profile = new Profile({
        employeeId: emid,
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        bloodGroup: bloodGroup,
        gender: gender,
        dob: dob,
        designation: designation
    })

    profile.save()

    res.status(201).json({
        status: true,
        message: "Profile Created"
    })
}

let getProfile = async (req, res) => {
    let data = await Profile.find({})

    // isHold = true mane hold data show hobena 
    // let data = await Profile.find({isHold: {$ne: true}})

    res.status(200).json({
        status: true,
        message: "All Profile",
        data: data
    })
}

let getSingleProfile = async (req, res) => {
    let { id } = req.params
    // console.log(id)
    let data = await Profile.findOne({ _id: id })
    // console.log(data)
    res.status(200).json({
        status: true,
        message: `${data.name} Profile`,
        data: data
    })
}


let updateProfile = async (req, res) => {
    let { id } = req.params

    let data = await Profile.findByIdAndUpdate({ _id: id }, req.body, { new: true })

    res.status(200).json({
        status: true,
        message: "Update Successfull",
        data: data
    })
}

let holdProfile = async (req, res) => {
    let {id} = req.body
    let existingUser = await Profile.findOne({_id:id})

    existingUser.isHold = true
    existingUser.save()

    res.send("Hoiche")
}


let getHoldProfile = async (req, res) => {
    let data = await Profile.find({isHold: {$eq: true}})

    res.send(data)
}



module.exports = { profileCreateController, getProfile, getSingleProfile, updateProfile, holdProfile, getHoldProfile }