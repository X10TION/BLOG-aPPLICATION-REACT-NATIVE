require('dotenv').config()
require('express-async-errors')
require('./Config/DB')
const express = require('express')
const postRouter = require('./routes/Posts')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
const PORT = process.env.PORT

app.use((err, req, res, next) => {
    res.status(500).json({error: err.message})
})

app.use('/api/post', postRouter)


app.listen(PORT, () => {
    console.log(`Connected SERVER @${PORT}`)

})