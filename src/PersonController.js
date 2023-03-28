const knex = require("./database/knex");

class PersonController {
    async create(req, res) {
        const { nome, dt_nasc, idade, cep, rua, numero, bairro } = req.body;

        const [id] = await knex("pessoas").insert({
            nome,
            idade,
            dt_nasc
        })

        await knex("endereco").insert({
            id_pessoa: id,
            cep,
            rua,
            numero,
            bairro
        })

        return res.status(200).json("Inserido")
    }

    async show(req, res) {
        const { id } = req.params;

        const pessoa = await knex("pessoa").where({id});
        const endereco = await knex("endereco").where({id_pessoa: id})

        return res.json({
            pessoa,
            endereco
        });
    }

    async update(req, res) {
        const { nome, dt_nasc, idade, cep, rua, numero, bairro } = req.body;
        const { id } = req.params;


        await knex("pessoas").update({nome, dt_nasc, idade}).where({id});
        await knex("endereco").update({cep, rua, numero, bairro}).where({id_pessoa: id});

        return res.status(200).json("Atualizado")
    }

    async delete(req, res) {
        const { id } = req.params;

        await knex("pessoas").where({id}).delete();
        await knex("enderecos").where({id_pessoa:id}).delete();  

    }
}

module.exports = PersonController;