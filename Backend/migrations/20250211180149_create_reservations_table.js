/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable("reservations").then((exists) => {
        if (!exists) {
          return knex.schema.createTable("reservations", (table) => {
            table.increments("id").primary();
            table.string("name", 255).notNullable();
            table.integer("nr").notNullable();
            table.decimal("qmimi", 10, 2).notNullable();
            table.enu("reservation_status", ["0", "1"]).notNullable().defaultTo("0");
            table.date("from_date").defaultTo("0000-00-00");
            table.date("to_date").defaultTo("0000-00-00");
          });
        }
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("reservations");
};
