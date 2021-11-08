var express = require("express");
var app = express();
var db = require("./database.js");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var HTTP_PORT = 8000;

app.listen(HTTP_PORT, () => {
    console.log("Rodando");
});

app.get("", (req, res, next) => {
    res.json({ "Resultado": "OK" });
});

app.get("/api/dentistas", (req, res, next) => {
    var sql = "select * from dentista"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "Erro": err.message });
            return;
        }
        res.json({
            "Resultado": "Sucesso",
            "data": rows
        })
    });
});

app.get("api/dentista/:id", (req, res, next) => {
    var sql = "SELECT * FROM dentista WHERE id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "Erro": err.message })
        }
        res.json({
            "Resultado": "Sucesso",
            "data": row
        })
    })
});

//Requer validação
app.post("/api/dentista/", (req, res, next) => {
    var errors = []
    console.log(req.body)
    if (!req.body.senha) {
        errors.push("Senha é obrigatória");
    }
    if (!req.body.email) {
        errors.push("Email é obrigatório");
    }
    if (!req.body.nome) {
        errors.push("Nome é obrigatório");
    }
    if (errors.length) {
        res.status(400).json({ "Erro": errors.join(",") });
        return;
    }
    var data = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    }
    var sql = 'INSERT INTO dentista (nome, email, senha) VALUES (?,?,?)'
    var params = [data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "Erro": err.message })
            return;
        }
        res.json({
            "Resultado": "Sucesso",
            "data": data,
            "id": this.lastID
        })
    });
});

app.patch("/api/dentista/:id", (req, res, next) => {
    var data = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha ? req.body.password : null
    }
    db.run(
        `UPDATE dentista set 
           nome = COALESCE(?,nome), 
           email = COALESCE(?,email), 
           senha = COALESCE(?,senha) 
           WHERE id = ?`,
        [data.nome, data.email, data.senha, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "Erro": res.message })
                return;
            }
            res.json({
                Resultado: "Sucesso",
                data: data,
                Modificado: this.changes
            })
        });
});

app.delete("/api/dentista/:id", (req, res, next) => {
    db.run(
        'DELETE FROM dentista WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "Erro": res.message })
                return;
            }
            res.json({ "Resultado": "Excluido", Excluido: this.changes })
        });
})

app.get("/api/marcacoes", (req, res, next) => {
    var sql = "select * from marcacao"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.post("/api/marcacao/", (req, res, next) => {
    var errors = []
    if (!req.body.data) {
        errors.push("Data é obrigatório");
    }
    if (!req.body.idDentista) {
        errors.push("Dentista é obrigatório");
    }
    var data = {
        data: req.body.data,
        idDentista: req.body.idDentista
    }
    var verifyDentistSQL = 'SELECT * FROM dentista WHERE id = ?'
    var paramToVerifyDentist = [data.idDentista]

    db.get(verifyDentistSQL, paramToVerifyDentist, (err, row) => {
        if (err) {
            console.log("Erro ao buscar dentista")
            console.log(err);
        }
        if (!row) {
            res.status(400).json({ "Erro": "Dentista inexistente" });
            return;
        }

    });
    if (errors.length) {
        res.status(400).json({ "Erro": errors.join(", ") });
        return;
    }

    var sql = 'INSERT INTO marcacao (data, idDentista) VALUES (?,?)'
    var params = [data.data, data.idDentista]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data
        })
    });
});

app.patch("/api/marcacao/:id", (req, res, next) => {
    var data = {
        data: req.body.data,
        idDentista: req.body.idDentista
    }
    db.run(
        `UPDATE marcacao set 
           data = COALESCE(?,data), 
           idDentista = COALESCE(?,idDentista),
           WHERE id = ?`,
        [data.data, data.idDentista, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ "Erro": res.message })
                return;
            }
            res.json({
                Resultado: "Sucesso",
                data: data,
                Modificado: this.changes
            })
        });
});

app.delete("/api/marcacao/:id", (req, res, next) => {
    db.run(
        'DELETE FROM marcacao WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ "Erro": res.message })
                return;
            }
            res.json({ "Resultado": "Excluido", Excluido: this.changes })
        });
})

app.use(function (req, res) {
    res.status(404);
});