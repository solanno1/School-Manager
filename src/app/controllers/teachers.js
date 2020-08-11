const Teacher = require('../models/Teacher')
const { age, graduation, date } = require("../../lib/utils")
const Intl = require('intl')

module.exports = {
    index(req, res) {
       

        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 5
        let offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                for (teacher of teachers) {
                    teacher.subjects_taught = teacher.subjects_taught.split(',')
                }

                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }
                return res.render("teachers/index", { teachers, pagination, filter })
            }
        }
        Teacher.paginate(params)
    },
    show(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("Teacher not found!")


            teacher.subjects_taught = teacher.subjects_taught.split(',')


            teacher.age = age(teacher.birth),
                teacher.created_at = Intl.DateTimeFormat("pt-BR").format(teacher.created_at),
                teacher.education_level = graduation(teacher.education_level)


            return res.render("teachers/show", { teacher })
        })
    },
    edit(req, res) {
        Teacher.find(req.params.id, function (teacher) {
            if (!teacher) return res.send("Teacher not found!")
            teacher.birth = date(teacher.birth).iso

            return res.render("teachers/edit", { teacher })
        })
    },
    create(req, res) {
        return res.render("teachers/create")
    },
    post(req, res) {
        const keys = Object.keys(req.body)
        const data = req.body
        for (key of keys) {
            if (data[key] == "") {
                return res.send("Please, fill all fields")
            }
        }
        Teacher.create(data, function (teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    put(req, res) {
        const keys = Object.keys(req.body)
        const data = req.body
        for (key of keys) {
            if (data[key] == "") {
                return res.send("Please fill all the fields")
            }
        }
        Teacher.update(data, function () {
            return res.redirect(`/teachers/${data.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, function () {
            return res.redirect("/teachers")
        })
    }
}















// exports.show = function (req, res) {
//     const { id } = req.params
//     const teacher = data.teachers.find(function (teacher) {
//         return teacher.id == id
//     })
//     if (!teacher) return res.send("Teacher not found!")

//     const teacher = {
//         ...teacher,
//         age: age(teacher.birth),
//         created_at: Intl.DateTimeFormat("pt-BR").format(teacher.created_at),
//         education_level: graduation(teacher.education_level)
//     }
//     return res.render("teachers/show", { teacher })
// }

// exports.edit = function (req, res) {
//     const { id } = req.params
//     const teacher = data.teachers.find(function (teacher) {
//         return teacher.id == id
//     })
//     if (!teacher) return res.send("Teacher not found!")
//     const teacher = {
//         ...teacher,
//         birth: date(teacher.birth)
//     }
//     return res.render("teachers/edit", { teacher })
// }

// exports.post = function (req, res) {
//     const keys = Object.keys(req.body)

//     for (key of keys) {
//         if (req.body[key] == "") {
//             return res.send("Preencha os campos!")
//         }
//     }
//     let { avatar_url, name, birth, select, aula, services } = req.body
//     birth = Date.parse(birth)
//     const created_at = Date.now()

//     let array = data.teachers
//     let maiorId = -1
//     for (let i = 0; i < array.length; i++) {
//         if (array[i].id > maiorId) {
//             maiorId = array[i].id
//         }
//     }

//     const id = Number(maiorId + 1)


//     data.teachers.push({
//         id,
//         avatar_url,
//         name,
//         select,
//         birth,
//         services,
//         aula,
//         created_at,
//     })

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
//         if (err) return res.send("Write file error")

//         return res.redirect("/teachers")
//     })
// }

// exports.put = function (req, res) {
//     const { id } = req.body
//     let index = 0
//     const teacher = data.teachers.find(function (teacher, foundIndex) {
//         if (id == teacher.id) {
//             index = foundIndex
//             return true
//         }
//     })
//     if (!teacher) return res.send("Teacher not found!")
//     const teacher = {
//         ...teacher,
//         ...req.body,
//         birth: Date.parse(req.body.birth),
//         id: Number(req.body.id)
//     }

//     data.teachers[index] = teacher

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
//         if (err) return res.send("File write error!")

//         return res.redirect(`/teachers/${id}`)
//     })
// }

// exports.delete = function (req, res) {
//     const { id } = req.body
//     const filteredItens = data.teachers.filter(function (teacher) {
//         return teacher.id != id
//     })
//     data.teachers = filteredItens

//     fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
//         if (err) return res.send("Write file error!")

//         return res.redirect("/teachers")
//     })
// }
