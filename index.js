const express = require('express')
const app = express()
const students = require('./students')

const selectById = (students, id) => {
    for (let i = 0; i < students.length; i++) {
        if (students[i]['ID'] == id) {
            return students[i]
        }
    }
}

app.listen(process.env.PORT || 3010, () => {
    console.log("Listening on port 3010.")
})

app.get('/', (req, res, next) => {
    res.json(students)
    next()
})

app.get('/:id', (req, res, next) => {
    if (selectById(students, req.params.id) == null) {
        res.json({error: {
            "message": "No record found!"
        }})
    }
    else {
        res.json(selectById(students, req.params.id))
    }
})