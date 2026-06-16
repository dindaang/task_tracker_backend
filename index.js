const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql2')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "task_tracker"
})

db.connect((err) => {
    if(err){
        console.log(`database connection failed`)
        console.log(err)
    }else{
        console.log(`connected to MySql`)
    }
})

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// port app
const port = 3000;
app.get('/', (req, res) => {
    res.send(`Hello`);
})

app.get('/task', (req, res) => {
    const sql = `SELECT * FROM task`;

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        const data = result.map(task => ({
            ...task,
            status: task.status === 1
        }));

        res.json(data);
    });
});

app.post('/task_add', (req, res) => {
    const { title, description, status } = req.body;

    const sql = "INSERT INTO task (title, description, status) values (?, ?, ?)"

    db.query(sql, [ title, description, status ], (err, result) => {
        if(err){
            return res.status(500).json(err);
        }
        res.json({
            message: `Task berhasil disimpan`,
        });
    });
});

app.put('/task_update', (req, res) => {
    const { title, description, status, idtask } = req.body;

     const sql = "UPDATE task SET title = ?, description = ?, status = ? WHERE idtask = ?";

    db.query(sql, [ title, description, status, idtask ], (err, result) => {
        if(err){
            return res.status(500).json(err);
        }
        res.json({
            message: `Task berhasil diupdate`,
        });
    });
});

app.delete('/task_delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM task WHERE idtask = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({
            message: "Task Berhasil dihapus",
            result
        });
    });
});

app.listen(port, () => {
    console.log(`Server start on port ${port}`)
})

