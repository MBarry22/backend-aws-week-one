const express = require("express");
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const pokemons = [
  {
    id: 1,
    name: "Pikachu",
    type: "electric ⚡️",
    level: 99,
    image: "/pikachu.webp"
  }
]

app.use(express.static('build'))


app.get("/api/pokemons", (req, res) => {
  console.log("GET /api/pokemons")
  res.send({pokemons: pokemons})
});

app.post("/api/pokemons", (req, res) => {
  const data = req.body
  console.log("POST /api/pokemons", data)
  data.id = pokemons.length+1
  let resp = {
    id: data.id,
    name: data.name,
    type: data.type,
    level: data.level
  }
  pokemons.push(resp)
  res.redirect(req.get('referer'))
})
app.get('*', (req, res) => {
  res.sendFile('build/index.html');
});

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`listening on port ${port}`))