/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("login")
    .del()
    .then(() => {
      return knex("login").insert([
        { id: 1, name: "User", email: "user@gmail.com", password: "user1234", role: "user" },
        { id: 2, name: "u", email: "user@gmail.com", password: "uuuu1234", role: "user" },
        { id: 3, name: "s", email: "ss@gmail.com", password: "asasasasas", role: "user" },
        { id: 4, name: "Admin", email: "admin@gmail.com", password: "admin1234", role: "admin" },
      ]);
    });
};
