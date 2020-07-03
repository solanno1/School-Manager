module.exports = {
    age: function(timestamp){
        const todayDate = new Date()
        const birthDate = new Date(timestamp)

        let yearAge = todayDate.getFullYear() - birthDate.getFullYear()
        let monthAge = todayDate.getMonth() - birthDate.getMonth()

        if(monthAge <= 0 && todayDate.getDate() < birthDate.getDate()){
            yearAge = yearAge - 1
        }
        return yearAge
    }
}



// mes07 - mes11 = -4
// dia02 - dia13 = -11

// 
