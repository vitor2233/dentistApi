const express = require("express")
const jwt = require('jsonwebtoken');
const router = express.Router()
var { verifyIfIsNormalUser, verifyIfUserIsAdm, verifyDentist } = require("./middlewares/middleware");

const dentistaController = require("./controllers/dentistaController")
const marcacoesController = require("./controllers/marcacoesController")
const usuarioController = require("./controllers/usuarioController")
const consultorioController = require("./controllers/consultorioController")
const dentistaHasConsultorioController = require("./controllers/dentistaHasConsultorioController")
const servicoController = require("./controllers/servicoController")

// Dentista
router.get("/", verifyIfUserIsAdm, dentistaController.index)
router.get("/api/dentistas", verifyIfUserIsAdm, dentistaController.list)
router.get("/api/dentista/:id", verifyIfUserIsAdm, dentistaController.show)
router.post("/api/dentista/login", verifyIfUserIsAdm, dentistaController.login)
router.post("/api/dentista", verifyIfUserIsAdm, dentistaController.post)
router.patch("/api/dentista/:id", verifyIfUserIsAdm, dentistaController.update)
router.delete("/api/dentista/:id", verifyIfUserIsAdm, dentistaController.delete)

//Consultório
router.get("/api/consultorio", verifyIfUserIsAdm, consultorioController.list)
router.get("/api/consultorio/:id", verifyIfUserIsAdm, consultorioController.show)
router.post("/api/consultorio", verifyIfUserIsAdm, consultorioController.post)
router.patch("/api/consultorio/:id", verifyIfUserIsAdm, consultorioController.update)
router.delete("/api/consultorio/:id", verifyIfUserIsAdm, consultorioController.delete)

//Serviço
router.get("/api/servico", verifyDentist, servicoController.list)
router.get("/api/servico/:id", verifyDentist, servicoController.show)
router.post("/api/servico", verifyDentist, servicoController.post)
router.patch("/api/servico/:id", verifyDentist, servicoController.update)
router.delete("/api/servico/:id", verifyDentist, servicoController.delete)

//Dentista Consultorio
router.post("/api/dentistaConsultorio", verifyIfUserIsAdm, dentistaHasConsultorioController.post)
router.patch("/api/dentistaConsultorio/:id", verifyIfUserIsAdm, dentistaHasConsultorioController.update)
router.delete("/api/dentistaConsultorio/:id", verifyIfUserIsAdm, dentistaHasConsultorioController.delete)

//Marcações
router.get("/api/marcacoes", marcacoesController.list)
router.get("/api/marcacao/:id", marcacoesController.show)
router.post("/api/marcacao", marcacoesController.post)
router.patch("/api/marcacao/:id", marcacoesController.update)
router.delete("/api/marcacao/:id", marcacoesController.delete)

// Usuário
router.get("/api/usuario", usuarioController.list)
router.get("/api/usuario/:id", usuarioController.show)
router.post("/api/usuario/login", usuarioController.login)
router.post("/api/usuario", usuarioController.post)
router.patch("/api/usuario/:id", verifyIfUserIsAdm, usuarioController.update)
router.delete("/api/usuario/:id", verifyIfUserIsAdm, usuarioController.delete)

module.exports = router