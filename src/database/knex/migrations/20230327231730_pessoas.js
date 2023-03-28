/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("pessoas", table => {
    table.increments("id");
    table.string("nome", 100).notNullable();
    table.integer("idade").unsigned().notNullable();
    table.date("dt_nasc").notNullable();
})

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("pessoas");
