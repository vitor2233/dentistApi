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
router.get("/", dentistaController.index)
router.get("/api/dentistas", dentistaController.list)
router.get("/api/dentista/:id", dentistaController.show)
router.post("/api/dentista", dentistaController.post)
router.patch("/api/dentista/:id", dentistaController.update)
router.delete("/api/dentista/:id", dentistaController.delete)

//Consultório
router.get("/api/consultorio", consultorioController.list)
router.get("/api/consultorio/:id", consultorioController.show)
router.post("/api/consultorio", consultorioController.post)
router.patch("/api/consultorio/:id", consultorioController.update)
router.delete("/api/consultorio/:id", consultorioController.delete)

//Serviço
router.get("/api/servico", servicoController.list)
router.get("/api/servico/:id", servicoController.show)
router.post("/api/servico", servicoController.post)
router.patch("/api/servico/:id", servicoController.update)
router.delete("/api/servico/:id", servicoController.delete)

//Dentista Consultorio
router.get("/api/dentistaConsultorio", dentistaHasConsultorioController.list)
router.post("/api/dentistaConsultorio", dentistaHasConsultorioController.post)
router.patch("/api/dentistaConsultorio/:id", dentistaHasConsultorioController.update)
router.delete("/api/dentistaConsultorio/:id", dentistaHasConsultorioController.delete)

//Marcações
router.get("/api/marcacoes", marcacoesController.list)
router.get("/api/marcacao/:id", marcacoesController.show)
router.post("/api/marcacao", marcacoesController.post)
router.patch("/api/marcacao/:id", marcacoesController.update)
router.delete("/api/marcacao/:id", marcacoesController.delete)

// Usuário
router.get("/api/usuario", verifyIfUserIsAdm, usuarioController.list)
router.get("/api/usuario/:id", usuarioController.show)
router.post("/api/usuario/login", usuarioController.login)
router.post("/api/usuario", usuarioController.post)
router.patch("/api/usuario/:id", usuarioController.update)
router.delete("/api/usuario/:id", usuarioController.delete)

module.exports = router