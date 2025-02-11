/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("familjare")
  .del()
  .then(() => {
    return knex("familjare").insert([
      { id: 1, name: "DHOMA FAMILJARE", nr: 15, qmimi: "150$" },
      { id: 2, name: "Dhoma Familjare", nr: 16, qmimi: "150$" },
      { id: 3, name: "Dhoma Familjare", nr: 17, qmimi: "150$" },
    ]);
  });
};
