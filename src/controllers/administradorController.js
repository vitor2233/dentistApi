const Administrador = require("../models/Administrador");

module.exports = {
    async list(req, res) {
        var results = await Administrador.list()

        return res.json({
            "Resultado": "Sucesso",
            "data": results
        })
    },

    async show(req, res) {
        var result = await Administrador.findAdministrator(req.params.id)

        return res.json({
            "Resultado": "Sucesso",
            "data": result
        })
    },

    async post(req, res) {
        var errors = []

        var { nome, email, senha } = req.body

        if (!senha) {
            errors.push("Senha é obrigatória");
        }
        if (!email) {
            errors.push("Email é obrigatório");
        }
        if (!nome) {
            errors.push("Nome é obrigatório");
        }
        if (errors.length) {
            res.status(400).json({ "Erro": errors.join(",") });
            return;
        }

        var result = await Administrador.create({ nome, email, senha })

        return res.status(201).json(`Administrador ${result.nome} cadastrado com sucesso!`)
    },

    async update(req, res) {
        var { nome, email, senha } = req.body
        var { id } = req.params

        senha = senha ? req.body.password : null

        var result = await Administrador.update({ nome, email, senha, id })

        res.json({
            Resultado: "Sucesso",
            data: result,
            /* Modificado: this.changes */
        })

    },

    async delete(req, res) {
        await Administrador.delete(req.params.id)

        return res.json({
            "Resultado": "Excluido"
        })
    }
}