const express = require('express')
const path = require('path')
const apiRoutes = require('./controller')
const upload = require('./config/multer-config')

const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', apiRoutes)

app.use(express.static('assets'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    })
})