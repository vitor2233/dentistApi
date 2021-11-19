const Usuario = require("../models/Usuario");
const bcrypt= require("bcrypt");
const saltRounds = 10;

module.exports = {
    async list(req, res) {
        var results = await Usuario.list()

        return res.json({
            "Resultado": "Sucesso",
            "data": results
        })
    },

    async show(req, res) {
        var result = await Usuario.findAdministrator(req.params.id)

        return res.json({
            "Resultado": "Sucesso",
            "data": result
        })
    },

    async post(req, res) {
        var errors = []

        var { nome, email, senha } = req.body
        senha = await bcrypt.hash(String(senha ? req.body.password : null), saltRounds);

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

        var result = await Usuario.create({ nome, email, senha })

        return res.status(201).json(`Usuário ${result.nome} cadastrado com sucesso!`)
    },

    async update(req, res) {
        var { nome, email, senha, isAdm } = req.body
        var { id } = req.params

        senha = await bcrypt.hash(String(senha ? req.body.password : null), saltRounds);

        var result = await Usuario.update({ nome, email, senha, isAdm, id })

        res.json({
            Resultado: "Sucesso",
            data: result,
            /* Modificado: this.changes */
        })

    },

    async delete(req, res) {
        await Usuario.delete(req.params.id)

        return res.json({
            "Resultado": "Excluido"
        })
    }
}