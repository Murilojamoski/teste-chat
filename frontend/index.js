// login elemento //
const login = document.querySelector(".log")
const loginform = login.querySelector(".loginform")
const loginInput = login.querySelector(".logininp")
//chat elemento
const chat = document.querySelector(".chat")
const chatform = chat.querySelector(".chatform")
const chatinput = chat.querySelector(".chatinp")
const chatmensagens = chat.querySelector(".mensagens")

const cores = ["aliceblue","blueviolet","violet","red","blue","gold","green","cornflowerblue","pink"]

const usuario = {
    id: "",
    nome: "",
    cor: ""
}

const scroll = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}

const criarsuamensagem = (conteudo) => {
    const div = document.createElement("div")
    div.classList.add("MinhaMsg")
    div.innerHTML = conteudo 
    return div 
}

const criaroutramensagem = (conteudo, remetente, cor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")
    div.classList.add("OutraMsg")
    span.classList.add("mandador")
    div.appendChild(span)

    span.style.color = cor
    span.innerHTML = remetente
    div.innerHTML += conteudo
    return div
}
let webSocket 
//codigo
const Logar = (evento) =>{
    evento.preventDefault() //empede de recaregar a pagina 
    usuario.nome = loginInput.value
    usuario.id = crypto.randomUUID() //cria um id unico para cada usuario
    usuario.cor = corandow()
    console.log(usuario)
    login.style.display = "none"
    chat.style.display = "flex"
    webSocket = new WebSocket("ws://localhost:8080") // conecta com nosso server
    webSocket.onmessage = processarMsg //quando receber mensagem
}

const processarMsg = ({ data })=> {
    const { userID, username, usercolor, conteudo} = JSON.parse(data)
    
    const mensagem = userID == usuario.id ? criarsuamensagem(conteudo) : criaroutramensagem(conteudo, username, usercolor)

    chatmensagens.appendChild(mensagem)

    scroll()

}

const corandow = () => {
    const randow = Math.floor(Math.random() * cores.length)
    return cores[randow]
}

const enviar = (evento)=> {
    evento.preventDefault()
    
    const mensagem = {
        userID: usuario.id,
        username: usuario.nome,
        usercolor: usuario.cor,
        conteudo: chatinput.value
    }

    webSocket.send(JSON.stringify(mensagem))

    chatinput.value = ""
}


loginform.addEventListener("submit", Logar)
chatform.addEventListener("submit", enviar)