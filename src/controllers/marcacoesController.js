const Marcacao = require("../models/Marcacao")
const Dentista = require("../models/Dentista")

module.exports = {
    async list(req, res) {
        const results = await Marcacao.list()

        return res.json({
            "message": "success",
            "data": results
        })
    },

    async post(req, res) {
        var errors = []

        var { data, idDentista } = req.body

        if (!req.body.data) {
            errors.push("Data é obrigatório");
        }
        if (!req.body.idDentista) {
            errors.push("Dentista é obrigatório");
        }

        if (errors.length) {
            res.status(400).json({ "Erro": errors.join(", ") });
            return;
        }

        var result = await Dentista.findDentist(idDentista)

        if (!result) {
            return res.status(400).json({ "Erro": "Dentista inexistente" });
        }
        else {
            result = await Marcacao.create({ data, idDentista })

            return res.json({
                "message": "successo",
                "data": result
            })
        }
    },

    async update(req, res) {
        var { data, idDentista } = req.body
        var { id } = req.params

        var result = await Marcacao.update({ data, idDentista, id })

        return res.json({
            Resultado: "Sucesso",
            data: result
        })
    },

    async delete(req, res) {
        await Marcacao.delete(req.params.id)

        return res.json({
            "Resultado": "Marcação Excluida"
        })
    }
}