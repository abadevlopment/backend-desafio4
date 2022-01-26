const express = require('express')
const { Router} = express
const productos = require('./api/productos')

const app = express()
const router = Router()

const PORT = 8080 || process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const ArrayProductos = [
    {
        title: "Pan",
        price: 25.45,
        thumbnail: "url1",
        id: 1
      },
      {
        title: "Aceite",
        price: 74.56,
        thumbnail: "url2",
        id: 2
      },
      {
        title: "Azucar",
        price: 45.67,
        thumbnail: "url3",
        id: 3
      }
]


const prod = new productos (ArrayProductos)

router.get('', (req, res) => {
    prod.getAll().then(resp => res.send(resp))
})

router.get('/:id', (req, res) => {
    const stringId = req.params.id
    const numberId = parseInt(stringId.substring((stringId.length), 1))
    prod.getById(numberId).then(resp => res.send(resp))
})

router.post('', (req, res) => {
    const product = req.body
    console.log(req.body);
    // res.send(title)
    // console.log(req);
    prod.save(product).then(resp => res.send(resp))
})

router.put('/:id', (req, res) => {
    const stringId = req.params.id
    const numberId = parseInt(stringId.substring((stringId.length), 1))
    prod.updateById(numberId, {title: 'Huevos', price: 20, thumbnail: 'url6'}).then(resp => res.send(resp))
})

router.delete('/:id', (req, res) => {
    const stringId = req.params.id
    const numberId = parseInt(stringId.substring((stringId.length), 1))
    prod.deleteByID(numberId).then(resp => res.send(resp))
})



app.use('/api/productos',router)
app.use('/static',express.static('public'))

app.listen(PORT, () => {
    try {
        console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`)
    } catch {
        console.log(`Servidor no encontrado en el puerto http://localhost:${PORT}`)
    }
})