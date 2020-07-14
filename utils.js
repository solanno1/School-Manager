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
        
        return {
            day,
            month,
            year,
            iso: (`${year}-${month}-${day}`),
            birthDay: `${day}/${month}`
        }
        
        // (`${year}-${month}-${day}`)
    },
    grade: function(value){
        switch(value){
            case '5EF':
                return '5º Ano Ensino Fundamental'
            case '6EF':
                return '6º Ano Ensino Fundamental'
            case '7EF':
                return '7º Ano Ensino Fundamental'
            case '8EF':
                return '8º Ano Ensino Fundamental'    
            case '1EM':
                return '1º Ano Ensino Medio'
            case '2EM':
                return '2º Ano Ensino Medio'
            case '3EM':
                return '3º Ano Ensino Medio'
            // default: return 'Erro'
        }
    }
}