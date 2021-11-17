var db = require("../config/database");

module.exports = {
    async create(data) {
        var sql = 'INSERT INTO consultorio (estado, cidade, bairro, rua, numero, complemento, horaInicio, horaFim) VALUES (?,?,?,?,?,?,?,?)'
        var params = [data.estado, data.cidade, data.bairro, data.rua, data.numero, data.complemento, data.horaInicio, data.horaFim]


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
        var sql = "select * from consultorio"
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

    async findConsultorio(id) {
        var sql = "SELECT * FROM consultorio WHERE id = ?"
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
        var sql = `UPDATE consultorio set 
        estado = COALESCE(?,estado), 
        cidade = COALESCE(?,cidade), 
        bairro = COALESCE(?,bairro),
        rua = COALESCE(?,rua),
        numero = COALESCE(?,numero),
        complemento = COALESCE(?,complemento),
        horaInicio = COALESCE(?,horaInicio),
        horaFim = COALESCE(?,horaFim),
        WHERE id = ?
        `
        var params = [data.estado, data.cidade, data.bairro, data.rua, data.numero, data.complemento, data.horaInicio, data.horaFim, data.id]

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
        var sql = 'DELETE FROM consultorio WHERE id = ?'
        var params = [id]

        return db.run(sql, params, function (err, result) {
            if (err) {
                throw new Error(err)
            }
        });
    }
}