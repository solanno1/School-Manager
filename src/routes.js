const express = require('express')
const routes = express.Router()
const teachers = require('../src/app/controllers/teachers')
const students = require('../src/app/controllers/students')


routes.get('/', function(req, res){
    return res.redirect("/teachers")
})

routes.get('/teachers', teachers.index)
routes.get('/teachers/create', teachers.create)
routes.get('/teachers/:id', teachers.show)
routes.get('/teachers/:id/edit', teachers.edit)
routes.put('/teachers', teachers.put)
routes.delete('/teachers', teachers.delete)
routes.post("/teachers", teachers.post)


routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.put('/students', students.put)
routes.delete('/students', students.delete)
routes.post("/students", students.post)



module.exports = routes