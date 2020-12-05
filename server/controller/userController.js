import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'

export const AuthenticateUser =  (req, res) => {
    
    const loginData = req.body;
    const username = loginData.username;
    const password = loginData.password;

    userModel.find(loginData).then((data) => {
        let success = false;
        if(data.length > 0)
            success = true;

        res.status(200).json({
            success: success
        })
    }).catch(error => {
        res.status(500).json({
            success: false,
            message: error.message
        })
    })
}

export const saveUser = async (req, res) => {

    console.log("hahahaha");
    const userData = req.body;

    const existingUser = await userModel.findOne({ email: userData.email });

    if(existingUser) {
        return res.status(400).json({ message: 'User already exists...'});
    }

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(userData.password, salt);

    console.log("passwordHash"); 
    
    userData.password = passwordHash;

    let saveUserModel = new userModel(userData);

    console.log(userData);

    saveUserModel.save().then(() => {
        res.status(200).json({
            "success" : true,
            "message" : "Data inserted!"
        });
    }).catch(error => {
        res.status(500).json({
            "success" : false,
            "message" : error
        });
    });
}