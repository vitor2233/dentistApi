var db = require("../config/database");

module.exports = {
    async create(data) {
        var sql = 'INSERT INTO usuario (nome, email, senha, isAdm) VALUES (?,?,?,?)'
        var params = [data.nome, data.email, data.senha, data.isAdm]


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
        var sql = "select * from usuario"
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
        var sql = "SELECT * FROM usuario WHERE id = ?"
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
        var sql = `UPDATE usuario set 
    nome = COALESCE(?,nome), 
    email = COALESCE(?,email), 
    senha = COALESCE(?,senha),
    isAdm = COALESCE(?,isAdm)
    WHERE id = ?
    `
        var params = [data.nome, data.email, data.senha, data.isAdm, data.id]

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
        var sql = 'DELETE FROM usuario WHERE id = ?'
        var params = [id]

        return db.run(sql, params, function (err, result) {
            if (err) {
                throw new Error(err)
            }
        });
    }
}