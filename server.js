const express = require('express');
const userCtrl = require('./usersCtrl')

const app = express()

app.use(express.json())

app.get('/api/user', userCtrl.getUsers)
app.get('/api/user/:userId', userCtrl.getUser)
app.get('/api/admin', userCtrl.getAdmin)
app.get('/api/nonadmin', userCtrl.getNonAdmin)
app.get('/api/type/:userType', userCtrl.getType)
app.put('/api/user/:userId', userCtrl.updateUser)
app.post('/api/user', userCtrl.addUser)
app.delete('/api/user/:userId', userCtrl.deleteUser)

app.listen(3000, () => console.log('I am running on port 3000'))