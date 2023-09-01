const express = require('express')

const app = express()

// middleware ya creado
app.use(express.json())

// middleware personalizado
app.use((req, res, next) => {
    console.log("Entre en el middleware personalizado")

    const {name} = req.body

    if(!name) {
        return res.send("entre al middleware y no lo dejo pasar al controlador porque no tiene name en el body")
    }

    next()
    
})

let usuarios = [
    {
        id: '1',
        name: 'Fernando'
    },
    {
        id: '2',
        name: 'Luis'
    }
]


const genNewId = () => {

    // buscar todas las ids
    // encuentra la mayor
    // le suma 1
    // y lo retorna convertido en string

    const id = Math.max(...usuarios.map((param) => +param.id)) + 1

    return id.toString()
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/usuarios', (req, res) => {
    res.json(usuarios)
})

app.get('/usuarios/:userId', (req, res) => {

    const userId = req.params.userId

    // buscar un usuario por su id
    const usuario = usuarios.find((param) => param.id === userId)

    res.json(usuario)
})

app.post('/usuarios', (req, res) => {

    const { name } = req.body

    const nuevoUsuario = {
        id: genNewId(),
        name
    }

    usuarios.push(nuevoUsuario)

    res.send(nuevoUsuario)
})

app.delete('/usuarios/:userId', (req, res) => {
    const { userId } = req.params

    usuarios = usuarios.filter((param) => param.id !== userId)

    res.json(usuarios)
})

app.put('/usuarios/:userId', (req, res) => {
    const { userId } = req.params

    const { name } = req.body

    usuarios = usuarios.map(usuario => {
        if(usuario.id === userId) {
            return {
                id: usuario.id,
                name
            }
        }

        return usuario
    })

    res.json(usuarios)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})


// API REST