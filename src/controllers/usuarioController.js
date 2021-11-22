const Usuario = require("../models/Usuario");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const saltRounds = bcrypt.genSaltSync(10);


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

        resultFromDb = await Usuario.findLogin(email);

        if (!resultFromDb) {
            return res.status(400).json({ success: false, erro: "Email ou senha inválidos" });
        } else {

            bcrypt.compare(senha, resultFromDb.senha, function (err, result) {
                
                if (err) {
                    // handle error
                    console.log(err)
                }
                if (result) {
                    var token = jwt.sign({ user: result.name, isAdm: result.isAdm }, process.env.SECRET, {
                        expiresIn: 3000
                    });
                    res.status(200).send({ auth: true, token: token });
                }
                else {
                    // response is OutgoingMessage object that server response http request
                    return res.status(400).json({ success: false, erro: "passwords do not match" });
                }

            });
            /* // console.log(isMatch)
            // if(!isMatch){
            //     console.log("deu ruim")
            // }
            // else{
            //     var token = jwt.sign({ user: result.name, isAdm: result.isAdm }, process.env.SECRET, {
            //         expiresIn: 3000
            //     });
            //     res.status(200).send({ auth: true, token: token });
            // } */

        }
    },

    async post(req, res) {
        var errors = []

        var { nome, email, senha, isAdm } = req.body
        senha = await bcrypt.hash(req.body.senha, saltRounds);

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

        return res.status(201).json(`Usuário ${result.id}, ${result.nome} cadastrado com sucesso!`)
    },

    async update(req, res) {
        var { nome, email, senha, isAdm } = req.body
        var { id } = req.params

        senha = await bcrypt.hash(req.body.senha, saltRounds);

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