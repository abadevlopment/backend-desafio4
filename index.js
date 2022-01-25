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

// class productos {
//     constructor(array){
//         this.array = array
//     }

//     async getAll() {
//         try {
//             const All = this.array
//             const Lectura = JSON.stringify(All,null,2)
//             return Lectura
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async getById(data) {
//         try {
//             const All = this.array
//             const Result = All.filter( res => res.id === data)
//             if ((Result.length) > 0) {
//                 return JSON.stringify(Result,null,2)
//             } else {
//                 return JSON.stringify({ error : 'producto no encontrado' },null,2)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async save(product){
//         try {
//             const All = this.array
//             const Id = All.length == 0 ? 1 : All[All.length-1].id +1
//             const Add = {id: Id, title: product.title, price: product.price, thumbnail: product.thumbnail}
//             All.push(Add)
//             return JSON.stringify(Add,null,2)

//         } catch {
//             console.log(error);
//         }
//     }
    
//     async updateById(id, object) {
//         try {
//             const All = this.array
//             const Filter = All.filter( res => res.id === id)
//             const Index = All.findIndex(res => res.id === id)
//             if ((Filter.length) > 0) {
//                 const Delete = All.splice(Index, 1);
//                 const Update = {id: id, title: object.title, price: object.price, thumbnail: object.thumbnail }
//                 All.push(Update)

//                 return (`Modificado:  ${JSON.stringify(Delete,null,2)} por: ${JSON.stringify(Update,null,2)}`)
//             } else {
//                 return JSON.stringify({ error : 'producto no encontrado' },null,2)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     async deleteByID(data) {
//         try {
//             const All = this.array
//             const Index = All.findIndex(res => res.id == data)
//             if (Index != -1) {
//                 const Delete = All.splice(Index, 1);
//                 return (`Actualizado:  ${JSON.stringify(All,null,2)}  Eliminado el producto: ${JSON.stringify(Delete,null,2)}` )

//             } else {
//                 return JSON.stringify({ error : 'producto no encontrado' },null,2)
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     }
// }

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