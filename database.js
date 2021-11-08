var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    } else {
        db.run(
            `CREATE TABLE dentista (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome text, 
                email text UNIQUE, 
                senha text
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    var insert = 'INSERT INTO dentista (nome, email, senha) VALUES (?,?,?)'
                    db.run(insert, ["Vitor", "vitor@email.com", "vitor123"])
                }
            });
    }
    if (err) {
        console.error(err.message);
        throw err
    } else {
        db.run(
            `CREATE TABLE userAdm (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome text, 
                email text UNIQUE, 
                senha text
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    var insert = 'INSERT INTO userAdm (nome, email, senha) VALUES (?,?,?)'
                    db.run(insert, ["Vitor adm", "vitor@adm.com", "vitor123"])
                }
            });
    }
    if (err) {
        console.error(err.message);
        throw err
    } else {
        db.run(
            `CREATE TABLE marcacao (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data text, 
                idDentista INTEGER
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                } else {
                    var insertMarcacao = 'INSERT INTO marcacao (data, idDentista) VALUES (?,?)'
                    db.run(insertMarcacao, ['07/11/2021', 1])
                }
            });
    }
});

module.exports = db;