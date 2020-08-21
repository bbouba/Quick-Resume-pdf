const express = require('express')
const pdf = require('html-pdf')
const cors = require('cors')

const pdfTemplate = require('./documents/index')

const app = express()

app.use(express.json())
const port = process.env.PORT || 5000;
app.use(cors())

//  Post PDF generator and fetching of the data   
app.post('/createPdf', (req, res) => {

    pdf.create(pdfTemplate(req.body)).toFile('result.pdf', (err, data) => {
        if (err) {
            res.send(Promise.reject())
        }
        res.send(Promise.resolve())
    })
})

app.get('/fetch-pdf', (req, res) => {
    console.log("hello")
    res.sendFile(`${__dirname}/result.pdf`)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})