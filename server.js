const express = require("express")
const app = express()
const port = 5003 || process.env.port
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
var cors = require('cors')
const db = require('./db')


const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions)); //設定 cores，預設非 same-origin 不能存取

app.use(session({
  secret: 'keyboard cat', //加密方式
  resave: true, //強制將 session 存回 session store
  saveUninitialized: true, //強制將未初始化的session存回 session store
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(flash())

app.set('view engine', 'ejs')

app.use((req, res, next) => {
  next()
})

app.get('/api', (req, res) => {
  res.send('Hello World!!!!!')
})
//getAll
app.get('/GET/users', (req, res) => {
  db.query('SELECT * FROM users', function (error, results) {
    if (error) throw error;
    console.log(results)
    res.send(results)
  });
})
//getOne
app.get('/GET/users/:id', (req, res) => {
  const id = req.params.id
  db.query('select * from users where id = ?', [id] , (error, results) => {
    if (error) throw error;
    console.log('The result is: ', results[0])
    res.send(results[0])
  })
})
//add
app.post('/POST/users', (req, res) => {
  const username = req.body.content.username
  const password = req.body.content.password
  const nickname = req.body.content.nickname
  const email = req.body.content.email
  db.query(`insert into users(username, password, nickname, email) values(?, ?, ?, ?)`, [username, password, nickname, email] , (error) => {
    if (error) {
      const response = {
        ok: false,
        message: error.toString()
      }
      const json = JSON.stringify(response)
      res.send(json)
    };
    const response = {
      ok: true,
      userData: {
        username,
        password,
        nickname,
        email
      }
    }
    const json = JSON.stringify(response)
    res.send(json)
  })
})
//delete
app.delete('/DELETE/users/:id', (req, res) => {
  const id = req.params.id
  db.query(`DELETE FROM users WHERE id = ?`, [id] , (error) => {
    if (error) throw error;
    console.log('delete success')
  })
})
//put
app.put('/PUT/users/:id', (req, res) => {
  const id = req.params.id
  const username = req.body.content.username
  const password = req.body.content.password
  db.query(`UPDATE users SET username = ?, password = ? WHERE id = ?`, [username, password, id] , (error) => {
    if (error) throw error;
    console.log('PUT success')
  })
})


app.listen(port, () => {
  console.log(`blog app listening at http://localhost:${port}`)
  db.connect()
})