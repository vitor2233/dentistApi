var db = require("../config/database");

module.exports = {
    async create(data) {
        var sql = 'INSERT INTO servico (tipoServico, preco, idDentista) VALUES (?,?,?)'
        var params = [data.tipoServico, data.preco, data.idDentista]


        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err, result) {
                if (err) {
                    throw new Error(err)
                }
                resolve(data)
            });
        })

    },

    async list() {
        var sql = "select * from servico"
        var params = []

        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err) {
                    throw new Error(err)
                }
                resolve(rows)
            });
        })
    },

    async findService(id) {
        var sql = "SELECT * FROM servico WHERE id = ?"
        var params = [id]

        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) {
                    throw new Error(err)
                }
                resolve(row)
            })
        })
    },

    async update(data) {
        var sql = `UPDATE servico set 
    tipoServico = COALESCE(?,tipoServico), 
    preco = COALESCE(?,preco), 
    idDentista = COALESCE(?,idDentista) 
    WHERE id = ?
    `

        console.log(data)
        var params = [data.tipoServico, data.preco, data.idDentista, data.id]

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err, result) {
                if (err) {
                    throw new Error(err)
                }
                resolve(data)
            });
        })
    },

    async delete(id) {
        var sql = 'DELETE FROM servico WHERE id = ?'
        var params = [id]

        return db.run(sql, params, function (err, result) {
            if (err) {
                throw new Error(err)
            }
        });
    }
}