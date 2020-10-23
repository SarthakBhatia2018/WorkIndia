const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log(req.body);
    const { Username, password, passwordconfirm } = req.body;

    db.query('SELECT name from users where name=?', [Username], (error, result) => {
        if (error)
            console.log(error);
        if (result.length > 0) {
            return res.render('register', {
                message: 'That name exists'
            })
        }
        else if (password != passwordconfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }
        });

    res.send("Form Submitted");
}
