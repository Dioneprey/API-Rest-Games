const express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

var DB = {
    
    games: [
        {
            id: 23,
            title: "Call of Duty MW",
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: "Sea of thieves",
            year: 2019,
            price: 40
        },
        {
            id: 2,
            title: "Minecraft",
            year: 2019,
            price: 30
        }
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200
    res.json(DB.games)
})

app.get("/game/:id", (req,res) => {
    
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined) {
            res.statusCode = 200
            res.json(game)
        } else {
            res.sendStatus(404)
        }
    }

})

app.post("/game", (req,res) => {
    
    var {title, price, year} = req.body

    if(isNaN(title) && title != undefined && !isNaN(price) && !isNaN(year)) {
        res.statusCode = 200
        console.log("Ok")
        DB.games.push({
            id: 2323,
            title,
            price,
            year
        })
    } else {
        res.statusCode = 400
        console.log("Bad request")
    }          
})

app.delete("/game/:id", (req,res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)
        var index= DB.games.findIndex(g => g.id == id) // Index onde gameID é igual a id passado

        if(index == -1){  // Se findIndex retornar -1, index não existe
            res.sendStatus(404)
        }else {
            DB.games.splice(index,1)
            res.sendStatus(200)
        }

    }
})

app.put("/game/:id",(req,res) => {

    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        var id = parseInt(req.params.id)

        var game = DB.games.find(g => g.id == id)

        if(game != undefined) {
            
            var {title, price, year} = req.body

            if(title != undefined){ // Se não for undefined, significa que passou um valor para ser alterado 
                if(isNaN(title)){
                    game.title = title
                }               
            } else if(price != undefined) {
                if(!isNaN(price)){
                    game.price = price
                }
                
            } else if(year != undefined) {
                if(!isNaN(year)) {
                    game.year = year
                }
                
            }

        } else {
            res.sendStatus(404)
        }
    }

})

app.listen(8080,() => {
    console.log("API RODANDO!")
})