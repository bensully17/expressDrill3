const express = require('express')
const app = express()
const students = require('./students')

const selectById = (students, id) => {
    for (let i = 0; i < students.data.length; i++) {
        if (students.data[i]['id'] == id) {
            return students.data[i]
        }
    }
}

app.listen(process.env.PORT || 3010)

app.get('/', (req, res, next) => {
    res.json(students)
    next()
})

app.get('/:id', (req, res, next) => {
    if (selectById(students, req.params.id) == null) {
        res.status(404).json({error: {
            "message": "No record found!"
        }})
    }
    else {
        res.json({"data": selectById(students, req.params.id)})
    }
})