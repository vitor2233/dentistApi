var db = require("../config/database");

module.exports = {
    async create(data) {
        var sql = 'INSERT INTO administrador (nome, email, senha) VALUES (?,?,?)'
        var params = [data.nome, data.email, data.senha]


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
        var sql = "select * from administrador"
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

    async findAdministrator(id) {
        var sql = "SELECT * FROM administrador WHERE id = ?"
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
        var sql = `UPDATE administrador set 
    nome = COALESCE(?,nome), 
    email = COALESCE(?,email), 
    senha = COALESCE(?,senha) 
    WHERE id = ?
    `
        var params = [data.nome, data.email, data.senha, data.id]

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
        var sql = 'DELETE FROM administrador WHERE id = ?'
        var params = [id]

        return db.run(sql, params, function (err, result) {
            if (err) {
                throw new Error(err)
            }
        });
    }
}