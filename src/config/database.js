var sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    } else {
        db.run(
            `CREATE TABLE IF NOT EXISTS dentista (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome text, 
                email text UNIQUE, 
                senha text
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
    }
    if (err) {
        console.error(err.message);
        throw err
    } else {
        db.run(
            `CREATE TABLE IF NOT EXISTS administrador (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome text, 
                email text UNIQUE, 
                senha text
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
    }
    if (err) {
        console.error(err.message);
        throw err
    } else {
        db.run(
            `CREATE TABLE IF NOT EXISTS marcacao (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data text, 
                idDentista INTEGER
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
    }
});

module.exports = db;