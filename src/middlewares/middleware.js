const jwt = require('jsonwebtoken');

module.exports = {
    verifyIfUserIsAdm(req, res, next) {
        var authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401);
        if (!token) return res.status(401).send({ auth: false, message: 'Sem token.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                console.log(err);
                return res.status(500).send({ auth: false, message: 'Erro ao verificar token.' });
            }

            if (decoded.user.isAdm) {
                next();
            } else {
                return res.status(401).send({ auth: false, message: 'Sem autorização.' });
            }

        });
    },
    verifyIfIsNormalUser(req, res, next) {
        var authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401);
        if (!token) return res.status(401).send({ auth: false, message: 'Sem token.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                console.log(err);
                return res.status(500).send({ auth: false, message: 'Erro ao verificar token.' });
            }

            if (decoded.user) {
                next();
            } else {
                return res.status(401).send({ auth: false, message: 'Sem autorização.' });
            }

        });
    },
    verifyDentist(req, res, next) {
        var authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401);
        if (!token) return res.status(401).send({ auth: false, message: 'Sem token.' });

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                console.log(err);
                return res.status(500).send({ auth: false, message: 'Erro ao verificar token.' });
            }

            if (decoded.dentist) {
                next();
            } else {
                return res.status(401).send({ auth: false, message: 'Sem autorização.' });
            }

        });
    },

};