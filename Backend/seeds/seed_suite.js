/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("suite")
    .del()
    .then(() => {
      return knex("suite").insert([
        { id: 1, name: "Dhoma Suite", nr: 20, qmimi: "200$" },
        { id: 2, name: "Dhoma Suite", nr: 21, qmimi: "200$" },
        { id: 3, name: "Dhoma Suite", nr: 22, qmimi: "200$" },
      ]);
    });
};
