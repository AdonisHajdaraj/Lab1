/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("eksklusive")
    .del()
    .then(() => {
      return knex("eksklusive").insert([
        { id: 1, name: "Dhoma Eksklusive", nr: 35, qmimi: "250$" },
        { id: 2, name: "Dhoma Eksklusive", nr: 36, qmimi: "250$" },
        { id: 3, name: "Dhoma Eksklusive", nr: 37, qmimi: "250$" },
      ]);
    });
};
