/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("puntoret")
    .del()
    .then(() => {
      return knex("puntoret").insert([
        { id: 1, name: "John", sname: "Doe", role: "Kamarier" },
        { id: 9, name: "Engjell", sname: "Berisha", role: "Menaxher" },
        { id: 12, name: "Michael", sname: "Jones", role: "Kuzhinier" },
        { id: 13, name: "Jessica", sname: "Brown", role: "Head Chef" },
      ]);
    });
};
