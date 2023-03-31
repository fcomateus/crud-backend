const knex = require("./database/knex");

class PersonController {
    async create(req, res) {
        const { nome, dt_nasc, idade, cep, rua, numero, bairro } = req.body;

        //retornar o id do usuário inserido
        const [pessoa] = await knex("pessoas")
        .returning("id")
        .insert({
            nome,
            idade,
            dt_nasc
        })


        await knex("enderecos").insert({
            id_pessoa: pessoa.id,
            cep,
            rua,
            numero,
            bairro
        })

        return res.status(200).json("Inserido")
    }

    async show(req, res) {
        const { id } = req.params;

        //o knex retorna um array de objetos. Dessa forma,
        //cada objeto será uma posição do array "dados"
        const [dados] = await knex
        .select([
            "pessoas.id",
            "pessoas.nome",
            "pessoas.idade",
            "pessoas.dt_nasc",
            "enderecos.cep",
            "enderecos.rua",
            "enderecos.numero",
            "enderecos.bairro"
        ])
        .from("pessoas")
        .where("pessoas.id", id)
        .innerJoin("enderecos", "pessoas.id", "enderecos.id_pessoa")
        
        return res.json(dados);
    }

    async update(req, res) {
        const { nome, dt_nasc, idade, cep, rua, numero, bairro } = req.body;
        const { id } = req.params;

        await knex("pessoas").update({nome, dt_nasc, idade}).where({id});
        await knex("enderecos").update({cep, rua, numero, bairro}).where({id_pessoa: id});
        
        return res.status(200).json("Atualizado")
    }

    async delete(req, res) {
        const { id } = req.params;

        // deleção ON CASCADE faz com que na tabela "enderecos"
        // o registro associado seja deletado junto

        await knex("pessoas").where({id}).delete();
        
        return res.json("Deletado");
    }

    async index(req, res){
        const { nome } = req.query;

        const pessoas = await knex
        .select([
            "pessoas.id",
            "pessoas.nome",
            "pessoas.idade",
            "pessoas.dt_nasc",
            "enderecos.cep",
            "enderecos.rua",
            "enderecos.numero",
            "enderecos.bairro",
        ])
        .from("pessoas")
        .whereILike("pessoas.nome", `%${nome}%`)
        .innerJoin("enderecos", "pessoas.id", "enderecos.id_pessoa")
        .orderBy("pessoas.nome");

        return res.json(pessoas);
    }

}

module.exports = PersonController;