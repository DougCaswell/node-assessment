const userData = require('./userData.json')

module.exports = {
    getUsers: (req, res) => {
        const { age, email, favorites } = req.query
        if (!age && !email && !favorites) {
            res.status(200).send(userData)
        } else if (age) {
            res.status(200).send(userData.filter(user => user.age < age))
        } else if (email) {
            res.status(200).send(userData.filter(user => user.email === email))
        } else {
            res.status(200).send(userData.filter(user => user.favorites.includes(favorites)))
        }
    },
    getUser: (req, res) => {
        const { userId } = req.params
        const user = userData.filter(user => user.id === +userId)
        if (user[0]) {
            res.status(200).send(user[0])
        } else { res.status(404).send('Cannot find user') }
    },
    getAdmin: (req, res) => {
        res.status(200).send(userData.filter(user => user.type === 'admin'))
    },
    getNonAdmin: (req, res) => {
        res.status(200).send(userData.filter(user => user.type !== 'admin'))
    },
    getType: (req, res) => {
        const {userType} = req.params
        res.status(200).send(userData.filter(user => user.type === userType))
    },
    updateUser: (req, res) => {
        const update = req.body
        const {userId} = req.params
        const index = userData.findIndex(user => user.id === +userId)
        userData[index] = update
        res.status(200).send(userData)
    },
    addUser: (req, res) => {
        const newUser = req.body
        newUser.id = userData[userData.length - 1].id + 1
        userData.push(newUser)
        res.status(200).send(userData)
    },
    deleteUser: (req, res) => {
        const {userId} = req.params
        const index = userData.findIndex(user => user.id === +userId)
        userData.splice(index, 1)
        res.status(200).send(userData)
    }
}