const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { reset } = require('nodemon')
require('../models/Categoria.js')
const Categoria = mongoose.model('categorias')

// Rota padrão
router.get('/', (req, res) => {
    res.render('admin/index')
})

// Categorias
router.get('/categorias', (req, res) => {
    Categoria.find().lean().sort({ date: 'desc' }).then((categorias) => {
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar categorias, tente recarregar a página')
        res.redirect('/admin')
        console.log(err)
    })
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

router.get('/categorias/edit/:id', (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean().then((categoria) => {
        res.render('admin/editcategorias', { categoria: categoria })
    }).catch((err) => {
        req.flash('error_msg', 'Essa categoria não existe')
        res.redirect('/admin/categorias')
        console.log(err)
    })
})

router.post('/categorias/edit', (req, res) => {
    let erros = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({ texto: 'A categoria deve conter um nome' })
    } 
    
    if (!req.body.slug || typeof req.body.sulg == undefined || req.body.slug == null) {
        erros.push({ texto: 'A categoria deve conter um slug' })
    }

    if (erros.length > 0) {
        res.render('admin/editcategorias', {erros: erros})
    } else {
        Categoria.findOne({ _id: req.body.id }).then((categoria) => {
            categoria.nome  = req.body.nome
            categoria.slug  = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso')
                res.redirect('/admin/categorias')
            }).catch((err) => {
                req.flash('error_msg', 'Erro ao salvar categoria editada')
                res.redirect('/admin/categorias')
                console.log(err)
            })
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao editar categoria')
            res.redirect('/admin/categorias')
            console.log(err)
        })        
    }
})

router.post('/categorias/deletar', (req, res) => {
    Categoria.deleteOne({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Categoria apagar com sucesso')
        res.redirect('/admin/categorias')
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao apagar categoria')
        res.redirect('/admin/categorias')
        console.log(err)
    })
})

//Postagens
router.get('/postagens', (req, res) => {
    res.render('admin/postagens')
})

router.get('/postagens/add', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('admin/addpostagem', { categorias: categorias })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao renderizar formulário')
        res.redirect('/admin')
        console.log(err)        
    })    
})

module.exports = router
