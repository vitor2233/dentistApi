const Marcacao = require("../models/Marcacao")
const Dentista = require("../models/Dentista")
const Usuario = require("../models/Usuario")

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

        var { data, idDentista, idUsuario } = req.body

        if (!req.body.data) {
            errors.push("Data é obrigatório");
        }
        if (!req.body.idDentista) {
            errors.push("Dentista é obrigatório");
        }
        if (!req.body.idUsuario) {
            errors.push("Usuário é obrigatório");
        }

        if (errors.length) {
            res.status(400).json({ "Erro": errors.join(", ") });
            return;
        }

        var result = await Usuario.findUser(idUsuario)

        if (!result) {
            return res.status(400).json({ "Erro": "Usuário inexistente" });
        }

        result = await Dentista.findDentist(idDentista)

        if (!result) {
            return res.status(400).json({ "Erro": "Dentista inexistente" });
        }
        else {
            result = await Marcacao.create({ data, idDentista, idUsuario })

            return res.json({
                "message": "successo",
                "data": result
            })
        }
    },

    async show(req, res) {
        var result = await Marcacao.findById(req.params.id)

        return res.json({
            "Resultado": "Sucesso",
            "data": result
        })
    },

    async update(req, res) {
        var { data } = req.body
        var { id } = req.params

        console.log(data)

        var result = await Marcacao.update({ data, id })

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