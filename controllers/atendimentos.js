const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, response) => {
        Atendimento.lista(response)
    })

    app.get('/atendimentos/:id', (req, response) => {
        const id = parseInt(req.params.id)

        Atendimento.list(id, response)
    })

    app.post('/atendimentos', (req, response) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento, response)
    });

    app.patch('/atendimentos/:id', (req,response) =>{
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id,valores,response)

    })

    app.delete('/atendimentos/:id', (req,response) => {
        const id = parseInt(req.params.id)

        Atendimento.delete(id, response)
    })
}