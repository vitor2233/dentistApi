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
        db.run(
            `CREATE TABLE IF NOT EXISTS consultorio (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome text,
                estado text, 
                cidade text,
                bairro text,
                rua text,
                numero text,
                complemento text,
                horaInicio text,
                horaFim text
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
        db.run(
            `CREATE TABLE IF NOT EXISTS usuario (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nome text, 
                    email text UNIQUE, 
                    senha text,
                    isAdm INTEGER
                )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
        db.run(
            `CREATE TABLE IF NOT EXISTS marcacao (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                data text, 
                idDentista INTEGER,
                idUsuario INTEGER
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
        db.run(
            `CREATE TABLE IF NOT EXISTS servico (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tipoServico text, 
                preco text,
                idDentista INTEGER
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
        db.run(
            `CREATE TABLE IF NOT EXISTS dentistaHasConsultorio (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                idDentista INTEGER, 
                idConsultorio INTEGER
            )`,
            (err) => {
                if (err) {
                    console.log(err)
                }
            });
    }
});

module.exports = db;