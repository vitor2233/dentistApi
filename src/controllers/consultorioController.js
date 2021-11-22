const Consultorio = require("../models/Consultorio");
const Dentista = require("../models/Dentista");

module.exports = {
    async list(req, res) {
        var results = await Consultorio.list()

        return res.json({
            "Resultado": "Sucesso",
            "data": results
        })
    },

    async show(req, res) {
        var result = await Consultorio.findConsultorio(req.params.id)

        return res.json({
            "Resultado": "Sucesso",
            "data": result
        })
    },

    async post(req, res) {
        var errors = []

        var { nome, estado, cidade, bairro, rua, numero, complemento, horaInicio, horaFim } = req.body

        if (!nome) {
            errors.push("Nome é obrigatório");
        }
        if (!estado) {
            errors.push("Estado é obrigatório");
        }
        if (!cidade) {
            errors.push("Cidade é obrigatório");
        }
        if (!bairro) {
            errors.push("Bairro é obrigatório");
        }
        if (!rua) {
            errors.push("Rua é obrigatório");
        }
        if (!numero) {
            errors.push("Número é obrigatório");
        }
        if (!complemento) {
            errors.push("Complemento é obrigatório");
        }
        if (!horaInicio) {
            errors.push("Hora de início é obrigatório");
        }
        if (!horaFim) {
            errors.push("Hora fim é obrigatório");
        }
        if (!idDentista) {
            errors.push("ID de dentista é obrigatório");
        }
        if (errors.length) {
            res.status(400).json({ "Erro": errors.join(",") });
            return;
        }

        /* var result = await Dentista.findDentist(idDentista)

        if (!result) {
            return res.status(400).json({ "Erro": "Dentista inexistente" });
        } */

        var result = await Consultorio.create({ nome, estado, cidade, bairro, rua, numero, complemento, horaInicio, horaFim })

        return res.status(201).json(`Consultório ${result.nome} cadastrado com sucesso!`)
    },

    async update(req, res) {
        var { nome, estado, cidade, bairro, rua, numero, complemento, horaInicio, horaFim } = req.body
        var { id } = req.params

        var result = await Consultorio.update({ nome, estado, cidade, bairro, rua, numero, complemento, horaInicio, horaFim, id })

        res.json({
            Resultado: "Sucesso",
            data: result,
        })

    },

    async delete(req, res) {
        await Consultorio.delete(req.params.id)

        return res.json({
            "Resultado": "Consultório excluido"
        })
    }
}