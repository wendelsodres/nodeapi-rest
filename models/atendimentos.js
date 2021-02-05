const { response } = require('express')
const moment = require('moment')
moment.locale('pt-br')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
    adiciona(atendimento, response){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm')

        const dataIsValid = moment(data).isSameOrAfter(dataCriacao)
        const customerName = atendimento.cliente.length > 5

        const validation = [
            {
                nome: 'data',
                valido: dataIsValid,
                message: 'Data deve ser maio ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: customerName,
                message: 'Cliente deve conter pelo menos 5 caracteres'
            }
        ]

        const erros = validation.filter(field => !field.valido)

        if(erros.length > 0){
            response.status(400).json(erros)
        }else {

            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO atendimentos SET ?'        
    
            conexao.query(sql,atendimentoDatado,(erro, results) => {
                if(erro){
                    response.status(400).json(erro)
                }else {
                    response.status(201).json(results.insertId)
                }
            })
        }
    }

    lista(response){
        const sql = 'SELECT * FROM atendimentos'

        conexao.query(sql, (erro, results) => {
            if(erro){
                response.status(400).json(erro)
            }else {
                response.status(200).json(results)
            }
        })
    }

    list(id, response){
        const sql = `SELECT * FROM atendimentos where id=${id}`

        conexao.query(sql, (erro, result) => {
            if(erro){
                response.status(400).json(erro)
            }else {
                response.status(200).json(result[0])
            }
        })
    }
}

module.exports = new Atendimento