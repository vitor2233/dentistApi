const Dentista = require("../models/Dentista");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const saltRounds = 10;



module.exports = {
    async index(req, res) {
        res.json({ "Resultado": "OK" });
    },

    async list(req, res) {
        var results = await Dentista.list()

        return res.json({
            success: true,
            data: results
        })
    },
    
    async listOnlyMarcacao(req, res) {
        var results = await Dentista.list()

        return res.json({
            success: true,
            data: results
        })
    },

    async show(req, res) {
        var result = await Dentista.findDentist(req.params.id)

        return res.json({
            success: true,
            data: result
        })
    },

    async showOnlyMarcacao(req, res) {
        var result = await Dentista.findDentist(req.params.id)

        return res.json({
            success: true,
            data: result
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
            res.status(400).json({ success: false, erro: errors.join(",") });
            return;
        }

        resultFromDb = await Dentista.findLogin(email);

        if (!resultFromDb) {
            return res.status(400).json({ success: false, erro: "Email ou senha inválidos" });
        } else {

            bcrypt.compare(senha, resultFromDb.senha, function (err, result) {

                if (err) {
                    // handle error
                    console.log(err)
                }
                if (result) {
                    resultFromDb.senha = null;
                    var token = jwt.sign({ dentist: resultFromDb }, process.env.SECRET, {
                        expiresIn: 3000
                    });
                    res.status(200).send({ auth: true, token: token });
                } else {
                    return res.status(400).json({ success: false, erro: "Email ou senha inválidos" });
                }

            });

        }
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

        senha = await bcrypt.hash(req.body.senha, saltRounds);

        var result = await Dentista.create({ nome, email, senha })

        return res.status(201).json({
            success: true,
            message: `Dentista ${result.nome} cadastrado com sucesso!`,
            data: result
        })
    },

    async update(req, res) {
        var { nome, email, senha } = req.body
        var { id } = req.params

        senha = await bcrypt.hash(req.body.senha, saltRounds);

        var result = await Dentista.update({ nome, email, senha, id })

        res.json({
            success: true,
            message: `Dentista ${result.nome} editado com sucesso`
            /* Modificado: this.changes */
        })

    },

    async delete(req, res) {
        await Dentista.delete(req.params.id)

        return res.json({
            success: true,
            message: "Excluido"
        })
    }
}