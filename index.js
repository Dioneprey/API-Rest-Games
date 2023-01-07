const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database")
const cors = require("cors")
const jwt = require("jsonwebtoken")

// JWT 

const JWTSecret = "seilaeissomesmo"
function auth(req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken != undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]

        jwt.verify(token, JWTSecret,(err, data)=> {
            if(err){
                res.status(401)
                res.json({err:"Token inválido"})
            } else {
                req.token = token
                req.loggedUser = {id: data.id, email: data.email}
                next()
            }
        })
    } else{
        res.status(401)
        res.json({err: "Token inválido"})
    }
}

// DATABASE
const Games = require("./gameDB")
const Users = require("./usersDB")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!")
    }).catch((err) => {
        console.log(err)
    })

app.get("/games", auth, (req, res) => {
    Games.findAll().then(game => {  
        res.status(200)                    
        res.json(game)        
    })
})

app.get("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        Games.findByPk(id).then(game => {
            res.status(200)
            res.json(game)            
        })
    }

})

app.post("/game", auth, (req, res) => {

    var { title, price, year } = req.body

    if (isNaN(title) && title != undefined && !isNaN(price) && !isNaN(year)) {
        Games.create({
            title: title,
            price: price,
            year: year
        }).then(() => {
            res.status(200)  
        })
    } else {
        res.sendStatus(400)        
    }
})

app.delete("/game/:id", auth, (req, res) => {
    if (isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        Games.findByPk(id).then((game) => {
            if (game != undefined) {
                Games.destroy({
                    where: {
                        id: id
                    }
                }).then(() => {
                    res.status(200)  
                })
            } else {
                res.sendStatus(400)  
            }
        })
    }
})

app.put("/game/:id", auth,(req, res) => {

    if (isNaN(req.params.id)) { // Se ID não for um número: Requisição Inválida
        res.sendStatus(400)  
    } else {
        var id = parseInt(req.params.id)

        Games.findByPk(id).then((game) => { // Se ID for um número, pesquisar o dado com o mesmo ID
            if (game != undefined) {
                var { title, price, year } = req.body
                console.log(title + price + year)
                Games.update({ title: title, year: year, price: price },
                    {
                        where: {
                            id: id
                        }
                    }).then(() => {
                        res.status(200)  
                    })
            } else {
                res.sendStatus(404)  
            }
        })
    }
})

app.post("/auth",(req,res) => {
    
    var {email,password} = req.body

    if(email != undefined) {
        Users.findOne({ where: { email: email}}).then(user =>  {
            if(user.password == password ) {

                jwt.sign({id: user.id, email: user.email}, JWTSecret,{expiresIn:'24h'},(err, token) => {
                    if(err){
                        res.status(400)
                        res.json({err:"Falha interna"})                        
                    } else {
                        res.status(200)
                        res.json({token: token})
                    }
                })
            } else {
                res.status(401).send({
                    erro: "Senha errada"
                })                
            }            
        }).catch((err) => {
            res.status(401).send({
                erro: "Email inválido"
            })    
        })
    } else {
        res.status(400)  
        res.json("Email inválido")
    }

})




app.listen(8080, () => {
    console.log("API RODANDO!")
})