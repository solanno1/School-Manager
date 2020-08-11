const { date, grade} = require("../../lib/utils")
const Student = require("../models/Student")

module.exports = {
    index(req, res){
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 1
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(students) {                

                const pagination = {
                    total: Math.ceil(students[0].total / limit),
                    page
                }
                return res.render("students/index", { students, pagination, filter })
            }
        }
        Student.paginate(params)
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
            Student.teacherOptions(function(options){
                return res.render("students/edit", {student, teacherOptions: options})
            })
        })
    },
    create(req, res){
        Student.teacherOptions(function(options){
            return res.render("students/create", {teacherOptions: options})
        })
        
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
