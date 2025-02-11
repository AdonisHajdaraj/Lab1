/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("vip").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("vip", (table) => {
            table.increments("id").primary();
            table.string("name", 255).notNullable();
            table.integer("nr").notNullable();
            table.text("qmimi").notNullable();
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("vip");
};
