const express = require('express');
const api = express();
const db = require('./app/database');

api.use(express.json());

// rota para listar um unico cliente filtrando pelo id
api.get('/api/cliente', async (req, res) => {
    //Armazena o id do usuario passado atraves da Url
    const id = req.query.id
    if (!id) return res.status(400).send({ message: 'O id do usuário não foi informado.' });

    try {

        //Faz a busca dos clientes no banco de dados
        const cliente = await db.Clientes.findOne({ where: { id: id } });
        if (!cliente) res.status(400).send({ message: 'Nenhum cliente foi encontrado com o id informado -->' + id });

        //Retorna o array de clientes na chamada da API
        return res.json(cliente);

    } catch (error) {

        //Retorna uma menssagem de erro
        return res.status(400).send({ message: 'Ocorreu um erro na busca dos dados.', error });
    }
})

// rota para listar todos os clientes
api.get('/api/cliente/todos', async (req, res) => {

    try {

        //Faz a busca dos clientes no banco de dados
        const clientes = await db.Clientes.findAll();

        //Retorna o array de clientes na chamada da API
        return res.json(clientes);

    } catch (error) {

        //Retorna uma menssagem de erro
        return res.status(400).send({ message: 'Ocorreu um erro na busca dos dados.' });

    }

});

// rota para inserir um ou vários clientes
api.post('/api/cliente', async (req, res) => {
    //Armazena os atributos do cliente passado atraves Payload/Corpo da requisição
    const novoCliente = req.body;

    try {
        let clienteCriado;

        //Verifica se será criado um ou varios clientes na requisição
        if (Array.isArray(novoCliente)) {
            //Faz o insert de vários clientes no banco de dados
            clienteCriado = await db.Clientes.bulkCreate(novoCliente)
        } else {
            //Faz o insert de um único cliente no banco de dados
            clienteCriado = await db.Clientes.create(novoCliente)
        }

        return res.json(clienteCriado);
    } catch (error) {
        //Retorna uma menssagem de erro
        return res.status(400).send({ message: 'Ocorreu um erro na inserção do cliente.', error });
    }

})

// rota para atualizar os dados de um cliente 
api.put('/api/cliente/:id', async (req, res) => {
    //Armazena o id do usuario passado atraves da Url
    const id = req.params.id;
    if (!id) return res.status(400).send({ message: 'O id do usuário não foi informado.' });

    //Armazena os atributos do cliente passado atraves Payload/Corpo da requisição
    const cliente = req.body;

    try {
        //Atualiza os dados do cliente
        const clienteAlterado = await db.Clientes.update({ cliente }, { where: { id: id } });

        return res.json(clienteAlterado);
    } catch (error) {
        return res.status(400).send({ message: 'Ocorreu um erro na atualização do cliente.', error });
    }


});

// rota para deletar um cliente
api.delete('/api/cliente', async (req, res) => {
    //Armazena o id do usuario passado atraves da Url
    const id = req.query.id;
    if (!id) return res.status(400).send({ message: 'O id do usuário não foi informado.' });

    try {
        //Atualiza os dados do cliente
        const clienteDeletado = await db.Clientes.destroy({ where: { id: id } });
        if(!clienteDeletado) throw 'O cliente informado não foi econtrado.'

        return res.json(clienteDeletado);
    } catch (error) {
        return res.status(400).send({ message: 'Ocorreu um erro ao tentar deletar o cliente.', error });
    }
    
});

//Iniciar o servidor da API na porta 3000
api.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});