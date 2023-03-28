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

        const dados = await knex("pessoas")
        .select([
            "pessoas.id",
            "pessoas.nome",
            "pessoas.idade",
            "pessoas.dt_nasc"
        ])
        .where("pessoas.id", id)
        .innerJoin("enderecos", "pessoas.id", "enderecos.id_pessoa")

        return res.json({
            dados
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

        return res.json();
    }

    async index(req, res){
        const dados = await knex("pessoas")
        .select([
            "pessoas.id",
            "pessoas.nome",
            "pessoas.idade",
            "pessoas.dt_nasc"
        ]).innerJoin("enderecos", "pessoas.id", "enderecos.id_pessoa")

        return res.json({dados});
    }
}

module.exports = PersonController;