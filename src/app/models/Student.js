const { date } = require("../../lib/utils")
const db = require("../../config/db")

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM students`, function (err, results) {
            if (err) throw `Database error! ${err}`
            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
        INSERT INTO students (
            avatar_url,
            name,
            birth,
            email,
            grade,
            workload,
            teacher_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.grade,
            data.workload,
            data.teacher
        ]
        db.query(query, values, function (err, results) {
            if (err) throw `Database error ${err}`
            callback(results.rows[0])
            console.log(results)
        })
    },
    find(id, callback) {
        db.query(`
            SELECT students.*, teachers.name AS teacher_name
            FROM students
            LEFT JOIN teachers ON (teachers.id = students.teacher_id)
            WHERE students.id = $1`, [id], function (err, results) {
            if (err) throw `Database error ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            email=($4),
            grade=($5),
            workload=($6),
            teacher_id=($7)
            WHERE id = $8
        `
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.grade,
            data.workload,
            data.teacher,
            data.id
        ]
        db.query(query, values, function (err, results) {
            if (err) throw `Database error ${err}`
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE from students WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database error ${err}`
            return callback()
        })

    },
    teacherOptions(callback){
        db.query(`SELECT name, id FROM teachers`, function (err, results) {
            if (err) throw `Database error ${err}`
            callback(results.rows)
        })
    }
}
