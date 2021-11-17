var db = require("../config/database");

module.exports = {
    async create(data) {
        var sql = 'INSERT INTO dentistaHasConsultorio (idDentista, idConsultorio) VALUES (?,?)'
        var params = [data.idDentista, data.idConsultorio]

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
        var sql = "select * from dentistaHasConsultorio"
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

    async update(data) {
        var sql = `UPDATE dentistaHasConsultorio set 
        idDentista = COALESCE(?,idDentista),
        idConsultorio = COALESCE(?,idConsultorio)
        WHERE id = ?
        `
        var params = [data.idDentista, data.idConsultorio, data.id]

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
        var sql = 'DELETE FROM dentistaHasConsultorio WHERE id = ?'
        var params = [id]

        return db.run(sql, params, function (err, result) {
            if (err) {
                throw new Error(err)
            }
        });
    }
}