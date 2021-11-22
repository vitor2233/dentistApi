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
        resolve(result)
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

  async findById(id) {
    var sql = 'SELECT * FROM marcacao WHERE id = ?'
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
    var sql = `UPDATE marcacao set 
    data = COALESCE(?,data)
    WHERE id = ?
    `
    var params = [data.data, data.id]

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