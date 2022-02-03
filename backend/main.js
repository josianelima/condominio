const express = require('express')
const app = express()
const port = 10000
const authRoute = require('./routes/auth')
app

app.use(express.json())

app.use('/api/auth', authRoute)


app.listen(port, () => console.log("hey"))