const {age, date} = require("../../lib/utils")

module.exports = {
    index(req, res){
        return res.render("students/index")
    },
    show(req, res){
        return
    },
    edit(req, res){
        return
    },
    create(req, res){
        return res.render("members/create")
    },
    post(req, res){
        const keys = Object.keys
        const data = req.body
        for(key of keys){
            if(data[key] == ""){
                return res.send("Please fill all the fields")
            }
        }
        return
    },
    put(req, res){
        const keys = Object.keys
        const data = req.body
        for(key of keys){
            if(data[key] == ""){
                return res.send("Please fill all the fields")
            }
        }
        return
    },
    delete(req, res){
        return
    }
}



























// const fs = require('fs')
// const { date, grade } = require("../utils")

// exports.index = function(req, res){
//     return res.render("students/index", {students: data.students})
// }

// exports.create =  function(req, res){
//     return res.render("students/create")
// }

// exports.show = function(req, res){
//     const { id } = req.params
//     const foundStudent = data.students.find(function(student){
//         return student.id == id
//     })
//         if(!foundStudent) return res.send("Student not found!")

//         const student = {
//             ...foundStudent,            
//             birth: date(foundStudent.birth).birthDay,
//             select: grade(foundStudent.select)
//         }
//         return res.render("students/show", {student})
// }

// exports.edit = function(req, res){
//     const { id } = req.params
//     const foundStudent = data.students.find(function(student){
//         return student.id == id
//     })
//     if(!foundStudent) return res.send("Student not found!")
//     const student = {
//         ...foundStudent,
//         birth: date(foundStudent.birth).iso
//     }    
//     return res.render("students/edit", {student})
// }

// exports.post = function(req, res){
//     const keys = Object.keys(req.body)

//     for (key of keys){
//         if(req.body[key] == ""){
//             return res.send("Preencha os campos!")
//         }
//     }
//     birth = Date.parse(req.body.birth)

//     let id = 1;
//     const lastStudent = data.students[data.students.length - 1]
//     if(lastStudent){
//         id = lastStudent.id + 1
//     }
//     // let array = data.students
//     // let maiorId = 0
//     // for(let i = 0; i < array.length; i++){
//     //     if(array[i].id > maiorId){
//     //         maiorId = array[i].id
//     //     }
//     // }
//     // const id = Number(maiorId + 1)

//     data.students.push({
//         id,
//         ...req.body,
//         birth 
//     })

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if (err) return res.send("Write file error")

//         return res.redirect("/students")
//     })
// }

// exports.put = function(req, res){
//     const {id} = req.body
//     let index = 0
//     const foundStudent = data.students.find(function(student, foundIndex){
//         if(id == student.id){
//             index = foundIndex
//             return true
//         }
//     })
//     if(!foundStudent) return res.send("Student not found!")
//     const student = {
//         ...foundStudent,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.students[index] = student

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return res.send("File write error!")

//         return res.redirect(`/students/${id}`)
//     })
// }

// exports.delete = function(req, res){
//     const {id} = req.body
//     const filteredItens = data.students.filter(function(student){
//         return student.id != id
//     })
//     data.students = filteredItens

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
//         if(err) return res.send("Write file error!")

//         return res.redirect("/students")
//     })
// }