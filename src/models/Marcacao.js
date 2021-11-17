var db = require("../config/database");

module.exports = {
  async create(data) {
    var sql = 'INSERT INTO marcacao (data, idDentista, idUsuario) VALUES (?,?,?)'
    var params = [data.data, data.idDentista, data.idUsuario]

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
    var sql = "select * from marcacao"
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
    var sql = `UPDATE marcacao set 
    data = COALESCE(?,data), 
    idDentista = COALESCE(?,idDentista),
    idUsuario = COALESCE(?,idUsuario)
    WHERE id = ?
    `
    var params = [data.data, data.idDentista, data.idUsuario, data.id]

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
    var sql = 'DELETE FROM marcacao WHERE id = ?'
    var params = [id]

    return db.run(sql, params, function (err, result) {
      if (err) {
        throw new Error(err)
      }
    });
  }
}