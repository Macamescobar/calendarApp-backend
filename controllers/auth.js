const { response } = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async (req, res = response) => {

   const { email, password } = req.body;

   try {
        
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exists'
            });
        }

        user = new User( req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please speak with the administrator'
        })
    }
  
}

const loginUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: "Login failed! Email or Password wrong."
            });
        }

        // Confirmar los passwords

        const validPassword = bcrypt.compareSync(password, user.password);

        if( !validPassword) {
            return res.status(400).json({
                ok: false,
                msg: ' Password wrong '
            });
        }

        //Generar JWT

        res.json({
            ok: true,
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please speak with the administrator'
        })
    }

    
}

const renewToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}