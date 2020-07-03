const fs = require('fs')
const data = require("./data.json")
const { age } = require("./utils")




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
    const id = Number(data.teachers.length + 1)


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
            created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at)
        }
        
        return res.render("teachers/show", {teacher})
}
