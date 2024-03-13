const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('POSTS')
})

router.get('/categorias', (req, res) => {
    res.send('CATEGORIAS')
})

module.exports = router
