/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("menu1")
    .del()
    .then(() => {
      return knex("menu1").insert([
        { id: 2, name: "Burger", price: "2.49$" },
        { id: 3, name: "Veze", price: "0.99$" },
      ]);
    });
};
