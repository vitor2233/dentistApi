const express = require("express")

const router = express.Router()

const dentistaController = require("./controllers/dentistaController")
const marcacoesController = require("./controllers/marcacoesController")

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

module.exports = router