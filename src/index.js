const express = require('./express')
const app = express()

app.get('/', (req, res) => {
    res.end('hello express')
})

app.get('/xxx', (req, res) => {
    res.end('/xxx')
})

// app.all('*', (req, res) => {
//     res.end('not found')
// })

app.listen(3000, () => {
    console.log('express server start...')
})