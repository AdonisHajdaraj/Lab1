/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("menu1").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("menu1", (table) => {
            table.increments("id").primary();
            table.string("name", 255).notNullable();
            table.string("price", 255).notNullable();
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("menu1");
};
