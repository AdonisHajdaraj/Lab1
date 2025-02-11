/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("standarte")
    .del()
    .then(() => {
      return knex("standarte").insert([
        { id: 1, name: "Dhoma Standarte", nr: 1, qmimi: "50$" },
        { id: 2, name: "Dhoma Standarte", nr: 2, qmimi: "50$" },
        { id: 3, name: "Dhoma Standarte", nr: 3, qmimi: "50$" },
      ]);
    });
};
