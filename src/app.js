const express = require('express')
const helmet = require('helmet')
const authRoutes = require('./Routes/auth')
const homeRoutes = require('./Routes/Home')
const cardRoutes = require('./Routes/Card')
const historyRoutes = require('./Routes/HistoryCard')
const cors = require('cors')
const sequelize = require('./Models/DataBase')
const schedule = require('node-schedule')
const sheduleService = require('./Services/Schedule/HistoryCardSchedule')

const app = express()

app.use(express.json())

app.use(helmet())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


schedule.scheduleJob('50 * * * *', sheduleService.HistoryCardSchedule)
schedule.scheduleJob('55 * * * *', sheduleService.deleteExpiredCard)

app.use(homeRoutes)
app.use('/auth', authRoutes)
app.use('/card', cardRoutes)
app.use('/history-card', historyRoutes)

sequelize.authenticate().then(() => { sequelize.sync(), console.log('Connection has been established successfully.') }).catch(e => console.error(e))

app.listen(process.env.PORT || 8080, console.log('server iniciado'))


