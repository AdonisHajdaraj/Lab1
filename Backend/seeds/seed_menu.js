/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("menu")
    .del()
    .then(() => {
      return knex("menu").insert([
        { id: 2, name: "Veze", price: "1.59$" },
        { id: 3, name: "Pasta", price: "4.99$" },
        { id: 4, name: "Pica", price: "4.49$" },
      ]);
    });
};
