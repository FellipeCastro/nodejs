const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria.js')
const Categoria = mongoose.model('categorias')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/posts', (req, res) => {
    res.send('POSTS')
})

router.get('/categorias', (req, res) => {
    res.render('admin/categorias')
})

router.get('/categorias/add', (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', (req, res) => {
    let erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'A categoria deve conter um nome' })
    } 
    
    if (!req.body.slug || typeof req.body.sulg == undefined || req.body.slug == null) {
        erros.push({ texto: 'A categoria deve conter um slug' })
    }

    if (erros.length > 0) {
        res.render('admin/addcategorias', {erros: erros})
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug,
        }

        new Categoria(novaCategoria).save().then(() => {
            req.flash('success_msg', 'Categoria cadastrada com sucesso')
            res.redirect('/admin/categorias')
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao cadastrar categoria, tente novamente')
            res.redirect('/admin')
            console.log(err)
        })
    }
})

module.exports = router
