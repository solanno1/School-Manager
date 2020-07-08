const fs = require('fs')
const data = require("./data.json")
const { age, graduation, date } = require("./utils")
const Intl = require('intl')

//show
exports.show = function(req, res){
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })
        if(!foundTeacher) return res.send("Teacher not found!")

        const teacher = {
            ...foundTeacher,
            age: age(foundTeacher.birth),
            services: foundTeacher.services.split(","),
            created_at: Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
            select: graduation(foundTeacher.select)
        }        
        return res.render("teachers/show", {teacher})
}


//edit
exports.edit = function(req, res){
    const { id } = req.params
    const foundTeacher = data.teachers.find(function(teacher){
        return teacher.id == id
    })
    if(!foundTeacher) return res.send("Teacher not found!")
    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }    
    return res.render("teachers/edit", {teacher})
}

//create
exports.post = function(req, res){
    const keys = Object.keys(req.body)

    for (key of keys){
        if(req.body[key] == ""){
            return res.send("Preencha os campos!")
        }
    }
    let {avatar_url, name, birth, select, aula, services} = req.body
    birth = Date.parse(birth)
    const created_at = Date.now()

    let array = data.teachers
    let maiorId = -1
    for(let i = 0; i < array.length; i++){
        if(array[i].id > maiorId){
            maiorId = array[i].id
        }
    }

    const id = Number(maiorId + 1)


    data.teachers.push({
        id,
        avatar_url,
        name,
        select,
        birth,
        services,
        aula,
        created_at,
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) return res.send("Write file error")

        return res.redirect("/teachers")
    })
}

exports.put = function(req, res){
    const {id} = req.body
    let index = 0
    const foundTeacher = data.teachers.find(function(teacher, foundIndex){
        if(id == teacher.id){
            index = foundIndex
            return true
        }
    })
    if(!foundTeacher) return res.send("Teacher not found!")
    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("File write error!")

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = function(req, res){
    const {id} = req.body
    const filteredItens = data.teachers.filter(function(teacher){
        return teacher.id != id
    })
    data.teachers = filteredItens

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })
}
