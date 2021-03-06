const Consultorio = require("../models/Consultorio")
const Dentista = require("../models/Dentista")
const DentistaHasConsultorio = require("../models/DentistaHasConsultorio")

module.exports = {
    async list(req, res) {
        const results = await DentistaHasConsultorio.list()

        return res.json({
            success: true,
            data: results
        })
    },

    async listByUser(req, res) {
        const results = await DentistaHasConsultorio.listByUser(req.params.id)

        return res.json({
            success: true,
            data: results
        })
    },

    async post(req, res) {
        var errors = []

        var { idDentista, idConsultorio } = req.body

        if (!idDentista) {
            errors.push("Dentista é obrigatório");
        }
        if (!idConsultorio) {
            errors.push("Consultorio é obrigatório");
        }

        if (errors.length) {
            res.status(400).json({ success: false, erro: errors.join(", ") });
            return;
        }

        var resultConsultorio = await Consultorio.findConsultorio(idConsultorio)

        if (!resultConsultorio) {
            return res.status(400).json({ success: false, erro: "Consultório inexistente" });
        }

        var resultDentist = await Dentista.findDentist(idDentista)

        if (!resultDentist) {
            return res.status(400).json({ "Erro": "Dentista inexistente" });
        }
        else {
            result = await DentistaHasConsultorio.create({ idDentista, idConsultorio })

            return res.json({
                success: true,
                data: result
            })
        }
    },

    async update(req, res) {
        var { idDentista, idConsultorio } = req.body
        var { id } = req.params

        var result = await DentistaHasConsultorio.update({ idDentista, idConsultorio, id })

        return res.json({
            success: true,
            data: result
        })
    },

    async delete(req, res) {
        await DentistaHasConsultorio.delete(req.params.id)

        return res.json({
            success: true,
            message: "Removido"
        })
    }
}