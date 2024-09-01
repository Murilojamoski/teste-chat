const { WebSocketServer } = require("ws") //puxa nossa biblioteca web
const dotenv = require("dotenv") // puxa a nossa variavel ambiente(serve para as portas)

dotenv.config() // permite usar a variavel do .env

const wss = new WebSocketServer({port: process.env.PORT || 8080}) //liga o servidor

wss.on("connection", (ws)=>{  //quando alguem conectar 
    ws.on("error", console.error) // caso tenha erro ele manda pro console

    ws.on("message", (data)=>{ // quando alguem manda mensagem
        console.log(data.toString())
        wss.clients.forEach((clients) => clients.send(data.toString())) // manda mensagem para todos os clientes (E converte pra string)
    })

    console.log("conecto familia")
})