const proffys = [
    { 
    name: "João Bispo",
    avatar: "https://avatars2.githubusercontent.com/u/43768058?s=460&u=674587f6f7767a469c56472c4314375e89a08b74&v=4"  , 
    whatsapp: 11000000000,
    bio: "Capaz de fazer abstrações mais rápido que o Frontier, João vai utilizar das Exatas e da Filosofia para te explicar porque o sentido da vida é 42.",
    subject: "Matemática", 
    cost: "424,24",
    weekday: [0],
    time_from: [720],
    time_to: [1220], 
    },

    { 
    name: "Átila Iamarino",
    avatar: "https://olz34z4bb51rsojq274o1g19-wpengine.netdna-ssl.com/wp-content/uploads/2020/05/Atila_Iamarino-300x300.jpg"  , 
    whatsapp: 11000000001,
    bio: "O biólogo mais popular do país vai ensinar desde o funcionamento de vacinas até como você pode fazer um sabre de luz. Tudo para evidenciar o quão incrível pode ser a ciência que estuda a vida",
    subject: "Biologia", 
    cost: "535,35",
    weekday: [1],
    time_from: [720],
    time_to: [1220], 
    },
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",  
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
} 

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0 

    if (isNotEmpty) { 
    data.subject = getSubject()
    proffys.push(data)
    }
    
    return res.render("give-classes.html", {subjects, weekdays})
}

const express = require('express')
const server = express()

const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server 
//configuração de arq. estáticos
.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding) 
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(5500)