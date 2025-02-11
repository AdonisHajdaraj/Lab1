/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("users").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("users", (table) => {
            table.increments("id").primary();
            table.string("name", 100).notNullable();
            table.string("email", 100).notNullable().unique();
            table.string("password", 100).notNullable();
            table.string("role", 100).notNullable();
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("users");
};
