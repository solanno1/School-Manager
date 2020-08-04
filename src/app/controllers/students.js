const { date, grade} = require("../../lib/utils")
const Student = require("../models/Student")

module.exports = {
    index(req, res){
        Student.all(function(students){
            return res.render("students/index", {students})
        })
    },
    show(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Student not found!")
            student.birth = date(student.birth).birthDay,
            student.grade = grade(student.grade)
            return res.render("students/show", {student})
        })
    },
    edit(req, res){
        Student.find(req.params.id, function(student){
            if(!student) return res.send("Student not found!")
            student.birth = date(student.birth).iso
            return res.render("students/edit", {student})
        })
    },
    create(req, res){
        return res.render("students/create")
    },
    post(req, res){
        const keys = Object.keys(req.body)
        const data = req.body
        for(key of keys){
            if(data[key] == ""){
                return res.send("Please fill all the fields")
            }
        }
        Student.create(data, function(student){
            return res.redirect(`/students/${student.id}`)
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        const data = req.body
        for(key of keys){
            if(data[key] == ""){
                return res.send("Please fill all the fields")
            }
        }
        Student.update(data, function(){
            return res.redirect(`/students/${data.id}`)
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect("/students")
        })
    }
}
