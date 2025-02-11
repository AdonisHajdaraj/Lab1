/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("puntoret").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("puntoret", (table) => {
            table.increments("id").primary();
            table.string("name", 255).notNullable();
            table.string("sname", 255).notNullable();
            table.string("role", 255).notNullable();
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("puntoret");
};
