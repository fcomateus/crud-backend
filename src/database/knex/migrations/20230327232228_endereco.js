/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("enderecos", table => {
    table.increments("id");
    table.integer("id_pessoa").notNullable()
    table.foreign("id_pessoa").references("id").inTable("pessoas");

    table.string("cep", 8).notNullable();
    table.string("rua", 60);
    table.string("numero", 6);
    table.string("bairro", 60);
})


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("enderecos");
