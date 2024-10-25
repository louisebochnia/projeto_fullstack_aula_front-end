const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcrypt')

const app = express() //construindo uma aplicação express
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String }
}))

const usuarioSchema = mongoose.Schema({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongo() {
    await mongoose.connect(`mongodb+srv://louisebochnia:mongo123@cluster0.uiuhf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

// let filmes = [
//     {
//         titulo: "Your Name", 
//         sinopse: "Mitsuha é a filha do prefeito de uma pequena cidade, mas sonha em tentar a sorte em Tóquio. Taki trabalha em um restaurante em Tóquio e deseja largar o seu emprego. Os dois não se conhecem, mas estão conectados pelas imagens de seus sonhos."
//     },
//     {
//         titulo: "Howl's Moving Castle", 
//         sinopse: "Uma bruxa lança uma terrível maldição sobre a jovem Sophie transformando-a em uma velha. Desesperada, ela embarca em uma odisseia em busca do mago Howl, um misterioso feiticeiro que pode ajudá-la a reverter o feitiço."
//     }
// ]

app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()

    res.json(filmes)
})

app.post('/filmes', async (req, res) => {
    //obter os dados que o cliente enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse

    //construir um objeto filme de acordo com a classe Filme definida
    const filme = new Filme({ titulo: titulo, sinopse: sinopse })

    //salva o filme criado
    await filme.save()

    //busca pela lista de filmes atualizada
    const filmes = await Filme.find()

    res.json(filmes)
})

app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password

        // criptografia da senha
        const passwordCriptografada = await bcrypt.hash(password, 10)

        const usuario = new Usuario({ login: login, password: passwordCriptografada })

        const respMongo = await usuario.save()
        console.log(respMongo)
        res.status(201).end()
    }
    catch (e) {
        console.log(e)
        res.status(409).end()
    }
})

app.listen(3000, () => {
    try {
        conectarAoMongo()
        console.log("server up & running, conexão ok")
    }
    catch (e) {
        console.log('erro de conexão', e)
    }
})
