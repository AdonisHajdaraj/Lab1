/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("vip")
    .del()
    .then(() => {
      return knex("vip").insert([
        { id: 2, name: "Dhoma Vip", nr: 31, qmimi: "150$" },
        { id: 3, name: "Dhoma Vip", nr: 32, qmimi: "150$" },
        { id: 4, name: "Dhoma Vip", nr: 33, qmimi: "150$" },
        { id: 25, name: "Dhoma Vip", nr: 30, qmimi: "150$" },
      ]);
    });
};
