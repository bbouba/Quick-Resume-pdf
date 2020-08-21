const { Person } = require('../Schema')

module.exports = function(req, res, next) {
    const newPerson = new Person(req.body)
    newPerson.validate((err) => {
        if (err) {
            return res.status(500).json({
                message: err.message
            })
        }
        next()
    })
}