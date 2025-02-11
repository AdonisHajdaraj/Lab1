/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("users")
    .del()
    .then(() => {
      return knex("users").insert([
        { id: 1, name: "admin", email: "admin@gmail.com", password: "admin123", role: "admin" },
      ]);
    });
};
