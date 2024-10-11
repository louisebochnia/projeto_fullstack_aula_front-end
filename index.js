const express = require ('express')
const app = express() //construindo uma aplicação express
app.use(express.json())

let filmes = [
    {
        titulo: "Your Name", 
        sinopse: "Mitsuha é a filha do prefeito de uma pequena cidade, mas sonha em tentar a sorte em Tóquio. Taki trabalha em um restaurante em Tóquio e deseja largar o seu emprego. Os dois não se conhecem, mas estão conectados pelas imagens de seus sonhos."
    },
    {
        titulo: "Howl's Moving Castle", 
        sinopse: "Uma bruxa lança uma terrível maldição sobre a jovem Sophie transformando-a em uma velha. Desesperada, ela embarca em uma odisseia em busca do mago Howl, um misterioso feiticeiro que pode ajudá-la a reverter o feitiço."
    }
]


// get url: http://localhost:3000/oi
app.get ('/oi', (req, res) => {
    res.send('oi ヽ（≧□≦）ノ')
})

app.get ('/filmes', (req, res) => {
    res.json(filmes)
})
app.post ('/filmes', (req, res) => {
    //obter os dados que o cliente enviou
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse

    //montar o json filme
    const filme = {titulo: titulo, sinopse: sinopse}

    //iserir o filme na lista de filmes
    filmes.push(filme)
    res.json(filmes)

})

app.listen(3000, () => console.log("server up & running"))