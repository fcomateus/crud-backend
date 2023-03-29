const knex = require("./database/knex");

class PersonController {
    async create(req, res) {
        const { nome, dt_nasc, idade, cep, rua, numero, bairro } = req.body;

        console.log(cep);
        //retornar o id do usuário inserido
        const [pessoa] = await knex("pessoas")
        .returning("id")
        .insert({
            nome,
            idade,
            dt_nasc
        })

        console.log("pessoa",pessoa);

        await knex("enderecos").insert({
            id_pessoa: pessoa.id,
            cep,
            rua,
            numero,
            bairro
        })

        console.log("Inserido");
        return res.status(200).json("Inserido")
    }

    async show(req, res) {
        const { id } = req.params;

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

        console.log(dados);
        // const mock = 
        //     {
        //         id: 1,
        //         nome:"João da Silva",
        //         idade:"32",
        //         dt_nasc:"20/06/1991",
        //         cep:"999999999",
        //         rua:"Rua das Flores",
        //         numero:"00",
        //         bairro:"Edson Queiroz"
        //     };
        
        
        console.log(dados);
        return res.json(dados);
    }

    async update(req, res) {
        const { nome, dt_nasc, idade, cep, rua, numero, bairro } = req.body;
        const { id } = req.params;

        await knex("pessoas").update({nome, dt_nasc, idade}).where({id});
        await knex("enderecos").update({cep, rua, numero, bairro}).where({id_pessoa: id});
        
        console.log("Atualizado");
        return res.status(200).json("Atualizado")
    }

    async delete(req, res) {
        const { id } = req.params;

        await knex("pessoas").where({id}).delete();
        
        //await knex("enderecos").where({id_pessoa:id}).delete();  
        
        console.log(`ID ${id} deletado`);

        return res.json("Deletado");
    }

    async index(req, res){
        const { nome } = req.query;

        console.log(nome);

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

        // const mock = [
        //     {
        //         id: 1,
        //         nome:"João da Silva",
        //         idade:"32",
        //         dt_nasc:"20/06/1991",
        //         cep:"999999999",
        //         rua:"Rua das Flores",
        //         numeror:"00",
        //         bairro:"Edson Queiroz"
        //     },
        //     {
        //         id: 2,
        //         nome:"Joaquina Pereira",
        //         idade:"20",
        //         dt_nasc:"15/10/2002",
        //         cep:"111111111",
        //         rua:"Rua das Folhas",
        //         numero:"01",
        //         bairro:"Jardim das Oliveiras"
        //     },{
        //         id: 3,
        //         nome:"Antonia Pereira",
        //         idade:"50",
        //         dt_nasc:"27/30/1967",
        //         cep:"111111111",
        //         rua:"Rua das Folhas",
        //         numero:"01",
        //         bairro:"Jardim das Oliveiras"
        //     },
        // ];

        console.log(pessoas);
        return res.json(pessoas);

    }

}

module.exports = PersonController;