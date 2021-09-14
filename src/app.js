const express = require('express')
const helmet = require('helmet')
const authRoutes = require('./Routes/auth')
const cors = require('cors')
const sequelize = require('./Models/DataBase')

const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors({
    origin:'*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use('/auth',authRoutes)

sequelize.authenticate().then(()=>{sequelize.sync(),console.log('Connection has been established successfully.')}).catch(e=>console.error(e))

app.listen(8080, console.log('server iniciado'))


