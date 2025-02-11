/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("dhomat").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("dhomat", (table) => {
            table.increments("id").primary();
            table.binary("image");
            table.string("name", 255).notNullable();
            table.text("pershkrimi");
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("dhomat");
};
