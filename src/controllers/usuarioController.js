const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');

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

    async login(req, res) {
        var errors = []

        var { email, senha } = req.body;

        if (!senha) {
            errors.push("Senha é obrigatória");
        }
        if (!email) {
            errors.push("Email é obrigatório");
        }
        if (errors.length) {
            res.status(400).json({ "Erro": errors.join(",") });
            return;
        }

        result = await Usuario.findLogin(email, senha);
        if (!result) {
            return res.status(400).json({ "Erro": "Email ou senha inválidos" });
        } else {
            var token = jwt.sign({ user: result.name, isAdm: result.isAdm }, process.env.SECRET, {
                expiresIn: 3000
            });
            res.status(200).send({ auth: true, token: token });
        }
    },

    async post(req, res) {
        var errors = []

        var { nome, email, senha, isAdm } = req.body

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

        var result = await Usuario.create({ nome, email, senha, isAdm })

        return res.status(201).json(`Usuário ${result.nome} cadastrado com sucesso!`)
    },

    async update(req, res) {
        var { nome, email, senha } = req.body
        var { id } = req.params

        senha = senha ? req.body.password : null

        var result = await Usuario.update({ nome, email, senha, id })

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