/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("orari")
    .del()
    .then(() => {
      return knex("orari").insert([
        {
          id: 1,
          name: "Engjell",
          role: "Menaxher",
          h: "Paradite",
          m: "Paradite",
          me: "Paradite",
          e: "Paradite",
          p: "Paradite",
        },
        {
          id: 4,
          name: "Test",
          role: "Kamarier",
          h: "Paradite",
          m: "Masdite",
          me: "Paradite",
          e: "Masdite",
          p: "Paradite",
        },
        {
          id: 5,
          name: "Michael",
          role: "Chef",
          h: "Masdite",
          m: "Masdite",
          me: "Masdite",
          e: "Masdite",
          p: "Masdite",
        },
        {
          id: 6,
          name: "John",
          role: "Kamarier",
          h: "Paradite",
          m: "Paradite",
          me: "Paradite",
          e: "Paradite",
          p: "Paradite",
        },
      ]);
    });
};
