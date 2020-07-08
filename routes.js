const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')


routes.get('/', function(req, res){
    return res.redirect("/teachers")
})

routes.get('/teachers', function(req, res){
    return res.render("teachers/index")
})


routes.get('/teachers/create', function(req, res){
    return res.render("teachers/create")
})


routes.get('/teachers/:id', teachers.show)


routes.get('/members', function(req, res){
    return res.send("members")
})


routes.get('/teachers/:id/edit', teachers.edit)

routes.put('/teachers', teachers.put)

routes.delete('/teachers', teachers.delete)

routes.post("/teachers", teachers.post)

module.exports = routes