/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("orari").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("orari", (table) => {
            table.increments("id").primary();
            table.string("name", 255).notNullable();
            table.string("role", 255).notNullable();
            table.string("h", 255).notNullable();
            table.string("m", 255).notNullable();
            table.string("me", 255).notNullable();
            table.string("e", 255).notNullable();
            table.string("p", 255).notNullable();
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orari");
};
