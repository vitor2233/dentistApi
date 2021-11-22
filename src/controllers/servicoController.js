const Servico = require("../models/Servico");
const Dentista = require("../models/Dentista");

module.exports = {
    async list(req, res) {
        var results = await Servico.list()

        return res.json({
            "Resultado": "Sucesso",
            "data": results
        })
    },

    async show(req, res) {
        var result = await Servico.findService(req.params.id)

        return res.json({
            "Resultado": "Sucesso",
            "data": result
        })
    },

    async post(req, res) {
        var errors = []

        var { tipoServico, preco, idDentista } = req.body

        if (!tipoServico) {
            errors.push("Tipo de serviço é obrigatório");
        }
        if (!preco) {
            errors.push("Preço é obrigatório");
        }
        if (!idDentista) {
            errors.push("Dentista é obrigatório");
        }
        if (errors.length) {
            res.status(400).json({ "Erro": errors.join(",") });
            return;
        }

        var result = await Dentista.findDentist(idDentista)

        if (!result) {
            return res.status(400).json({ "Erro": "Dentista inexistente" });
        }

        var result = await Servico.create({ tipoServico, preco, idDentista })

        return res.status(201).json(`Serviço ${result.tipoServico} cadastrado com sucesso!`)
    },

    async update(req, res) {
        var { tipoServico, preco, idDentista } = req.body
        var { id } = req.params

        var result = await Servico.update({ tipoServico, preco, idDentista, id })

        res.json({
            Resultado: "Sucesso",
            data: result,
        })

    },

    async delete(req, res) {
        await Servico.delete(req.params.id)

        return res.json({
            "Resultado": "Excluido"
        })
    }
}