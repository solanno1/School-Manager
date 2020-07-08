module.exports = {
    age: function (timestamp) {
        const todayDate = new Date()
        const birthDate = new Date(timestamp)

        let yearAge = todayDate.getFullYear() - birthDate.getFullYear()
        let monthAge = todayDate.getMonth() - birthDate.getMonth()

        if (monthAge <= 0 && todayDate.getDate() < birthDate.getDate()) {
            yearAge = yearAge - 1
        }
        return yearAge
    },
    graduation: function (value) {
        if (value == "Ensino Superior Completo") {
            return "Superior"
        }
        if (value == "Ensino Medio Completo") {
            return "Medio"
        }
    },
    date: function(timestamp){
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        
        return (`${year}-${month}-${day}`)
    }

}