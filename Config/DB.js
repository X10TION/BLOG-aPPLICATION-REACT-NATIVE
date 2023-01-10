const mongoose = require('mongoose')
require('dotenv').config()

mongoose
.connect("mongodb+srv://POSTBLOG123:POSTBLOG123@cluster0.8kw415n.mongodb.net/?retryWrites=true&w=majority")
.then(() => console.log("database connected sccefully "))
.catch((err) => console.log("database conncetion failed:", err.message || err))