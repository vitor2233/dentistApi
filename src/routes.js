const express = require("express")

const router = express.Router()

const dentistaController = require("./controllers/dentistaController")
const marcacoesController = require("./controllers/marcacoesController")
const administradorController = require("./controllers/administradorController")


// Dentista
router.get("/", dentistaController.index)
router.get("/api/dentistas", dentistaController.list)
router.get("/api/dentista/:id", dentistaController.show)
router.post("/api/dentista", dentistaController.post)
router.patch("/api/dentista/:id", dentistaController.update)
router.delete("/api/dentista/:id", dentistaController.delete)

//Marcações

router.get("/api/marcacoes", marcacoesController.list)
router.post("/api/marcacao", marcacoesController.post)
router.patch("/api/marcacao/:id", marcacoesController.update)
router.delete("/api/marcacao/:id", marcacoesController.delete)

// Administrador
router.get("/api/administrador", administradorController.list)
router.get("/api/administrador/:id", administradorController.show)
router.post("/api/administrador", administradorController.post)
router.patch("/api/administrador/:id", administradorController.update)
router.delete("/api/administrador/:id", administradorController.delete)

module.exports = router