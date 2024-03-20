const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { reset } = require('nodemon')
require('../models/Categoria.js')
const Categoria = mongoose.model('categorias')
require('../models/Postagem.js')
const Postagem = mongoose.model('postagens')

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
    Postagem.find().lean().populate('categoria').sort({ data: 'desc' }).then((postagens) => {
        res.render('admin/postagens', { postagens: postagens })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao listar postagens')
        res.redirect('/admin')
        console.log(err)  
    })
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

router.post('/postagens/nova', (req, res) => {
    let erros = []

    if (!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({ texto: 'A postagem deve conter um título' })
    } 
    
    if (!req.body.slug || typeof req.body.sulg == undefined || req.body.slug == null) {
        erros.push({ texto: 'A postagem deve conter um slug' })
    }

    if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
        erros.push({ texto: 'A postagem deve conter uma descreção' })
    }

    if (!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({ texto: 'A postagem deve conter um conteúdo' })
    }
    
    if (req.body.categoria == '0') {
        erros.push({ texto: 'Categoria inválida, registre uma categoria' })
    }

    if (erros.length > 0) {
        res.render('admin/addpostagem', {erros: erros})
    } else  {
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao criar postagem')
            res.redirect('/admin/postagens')
            console.log(err)
        })
    }
})

router.get('/postagens/edit/:id', (req, res) => {

    Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {

        Categoria.find().lean().then((categorias) => {
            res.render('admin/editpostagens', { categorias: categorias, postagem: postagem })
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao listar categorias')
            res.redirect('/admin/postagens')
            console.log(err)
        })

    }).catch((err) => {
        req.flash('error_msg', 'Erro ao carregar formulário de edição')
        res.redirect('/admin/postagens')
        console.log(err)
    })
})

router.post('/postagens/edit', (req, res) => {
    Postagem.findOne({ _id: req.body.id }).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada com sucesso')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('error_msg', 'Erro ao editar postagem')
            res.redirect('/admin/postagens')
            console.log(err)
        })
    }).catch((err) => {
        req.flash('error_msg', 'Erro ao editar postagem')
        res.redirect('/admin/postagens')
        console.log(err)
    })
})

router.get('/postagens/deletar/:id', (req, res) => {
    Postagem.deleteOne({ _id: req.params.id }).then((() => {
        req.flash('success_msg', 'Postagem deletada com sucesso')
        res.redirect('/admin/postagens')
    })).catch((err) => {
        req.flash('error_msg', 'Erro ao deletar postagem')
        res.redirect('/admin/postagens')
        console.log(err)
    })
})

module.exports = router
