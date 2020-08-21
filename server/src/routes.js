const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtMiddleware = require('express-jwt');
const path = require('path');
const formidable = require('formidable');
const gridfs = require('mongoose-gridfs');
const { createReadStream } = require('fs');
const { createModel } = require('mongoose-gridfs');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const atob = require('atob');
const fs = require('fs')

// import mongoose & models from our Schema
const { mongoose, Person } = require("./Schema");

const router = express.Router();
require('dotenv/config');

//registration
router.post('/user/register', require('./middlewares/dataValid'), async(req, res) => {
    const newPerson = new Person(req.body)
    let newPersonEmail = req.body.email
    newPersonEmail = await Person.countDocuments({ email: newPersonEmail })
    if (newPersonEmail <= 0) {
        const saltRounds = 10;
        bcrypt.hash(newPerson.password, saltRounds, function(err, hash) {
            newPerson.password = hash
            newPerson.save((err, doc) => {
                if (!err) {
                    res.status(201).json({
                        success: true,
                        user: doc
                    })
                } else {
                    res.status(400).json({
                        success: false,
                        error: "Can't create user. Server error"
                    })
                }
            })
        })
    } else {
        res.status(409).json({
            success: false,
            error: 'Could not create user. The email already exists.'
        })
    }
})

//Get single user
router.get('/user/profile/:id', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), async(req, res) => {
    try {
        const user = await Person.findById(req.params.id);
        if (user) {
            res.status(200).json({
                success: true,
                user
            });
        } else {
            res.status(404).json({
                success: false,
                error: `User with id ${req.params.id} not found.`
            });
        }
    } catch (err) {
        res.status(500).send({
            success: false,
            error: err.message
        });
    }

})

//update single user
router.put('/user/update/:id', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), async(req, res) => {

    const personId = req.params.id;
    const newData = req.body;
    try {
        await Person.findByIdAndUpdate(personId, { $set: newData });
        res.status(200).json({
            success: true,
            newData
        });
    } catch (err) {
        res.status(404).send({
            success: false,
            error: err.message
        });
    }
});

//Upload picture
router.post('/user/picture/:id/upload', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), async(req, res) => {

    gridfs.mongo = mongoose.mongo;
    const upload = createModel({
        modelName: 'upload'
    });
    const form = formidable({ multiples: false });
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.status(400).json({
                success: false,
                error: err.message
            });
        }
        const prExt = /jpg|jpeg|png|gif/;
        const checkExt = prExt.test(path.extname(files.file.name));
        const checkmime = prExt.test(files.file.type);
        if (checkExt && checkmime) {
            const readStream = createReadStream(files.file.path);
            const options = ({ filename: req.params.id + "_" + files.file.name, contentType: 'multipart/form-data' });
            upload.write(options, readStream, async(error, file) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        error: err.message
                    });
                }
                Person.updateOne({ _id: req.params.id }, { picture: file.filename }, (err, id) => {
                    if (!err) {
                        return res.status(201).send({
                            success: true,
                            file
                        });
                    }
                    res.status(400).json({
                        success: false,
                        error: 'Error during image upload.'
                    });
                });
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Only /jpg|jpeg|png|gif/ file type are allowed.'
            });
        }
    });
});

//  Get user profile image
router.get('/user/picture/:id/upload', jwtMiddleware({ secret: process.env.ACCESS_TOKEN_KEY, algorithms: ['HS256'] }), async(req, res) => {
    // const user = await Person.findById(req.params.id);
    const uploads = createModel({
        modelName: 'uploads'
    });
    uploads.read({ filename: req.params.id }, (error, buffer) => {
        if (error) {
            res.status(400).json({
                success: false,
                error: error.message
            })
        }
        const file = buffer.toString('base64')
        return res.status(201).send({
            success: true,
            file: file
        });
    });

})

// Verifiy token valid
router.get('/verifytoken', (req, res) => {
    const authHeader = req.headers['authorization']
        //if we have authHeader, split the value as an array and return the 2nd element authHeader.split(' ')[1] else return undefined
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({
        success: false,
    })

    //  Verify the token
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
        if (err) return res.status(403).json({
            success: false,
        })
        res.status(201).json({
            success: true,
        })
    })
})

// login
router.post('/user/login', async(req, res) => {
    const { email, password } = req.body
    const user = await Person.find({ email });

    if (user.length < 1) return res.status(401).json({
        success: false,
        error: 'You provided wrong set of credentials.'
    });
    if (await bcrypt.compare(password, user[0].password)) {
        const tokens = generateAccessToken(user[0].id)
        res.status(200).json({
            success: true,
            tokens
        });
    } else {
        res.status(401).json({
            success: false,
            error: 'You provided wrong set of credentials.'
        });
    }
})

//generate jwt token
function generateAccessToken(id) {
    const payload = { id: id }
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '168h' });
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' });
    return { accessToken, refreshToken };
}
module.exports = router