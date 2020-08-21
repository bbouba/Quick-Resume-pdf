const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personalInfos = new Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    birthDate: { type: Date, required: true },
    gender: { type: { type: String, trim: true }, enum: ['female', 'male', 'other'] },
    otherProfile: { type: String, trim: true },
    profession: { type: String, trim: true, default: "Your Profession" },
    picture: { type: String, trim: true },
    contact: {
        address: { type: String, trim: true, default: "Your adress" },
        phone: { type: String, trim: true, default: "Telephone number" }
    },
    summary: [{ type: String, trim: true, default: "Some summary" }],
    interest: [{ type: String, trim: true, default: "Interest" }],
    works: [{
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        summary: String,
    }],
    educations: [{
        institution: String,
        area: String,
        startDate: Date,
        endDate: Date,
        summary: String,
    }],
    skills: [{
        name: String,
        summary: String,
    }],
});

personalInfos.path('email').validate(function(email) {

    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailRegex.test(email); // Assuming email has a text attribute

}, 'The e-mail is invalid.')

module.exports.mongoose = mongoose;
module.exports.Person = mongoose.model('person', personalInfos);