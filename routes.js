const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')


routes.get('/', function(req, res){
    return res.redirect("/teachers")
})

routes.get('/teachers', function(req, res){
    return res.render("teachers/index")
})

routes.get('/teachers/:id', teachers.show)

routes.get('/teachers/create', function(req, res){
    return res.render("teachers/create")
})


routes.get('/members', function(req, res){
    return res.send("members")
})

routes.post("/teachers", teachers.post)

module.exports = routes