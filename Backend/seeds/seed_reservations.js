/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("reservations")
    .del()
    .then(() => {
      return knex("reservations").insert([
        { id: 1, name: "VIP", nr: 101, qmimi: 150, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 2, name: "VIP", nr: 102, qmimi: 150, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 3, name: "VIP", nr: 103, qmimi: 150, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 4, name: "STANDARTE", nr: 201, qmimi: 100, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 5, name: "STANDARTE", nr: 202, qmimi: 100, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 6, name: "STANDARTE", nr: 203, qmimi: 100, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 7, name: "FAMILJARE", nr: 301, qmimi: 200, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 8, name: "FAMILJARE", nr: 302, qmimi: 200, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 9, name: "FAMILJARE", nr: 303, qmimi: 200, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 10, name: "EKSKLUSIVE", nr: 401, qmimi: 250, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 11, name: "EKSKLUSIVE", nr: 402, qmimi: 250, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 12, name: "EKSKLUSIVE", nr: 403, qmimi: 250, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 13, name: "SUITE", nr: 501, qmimi: 300, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 14, name: "SUITE", nr: 502, qmimi: 300, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
        { id: 15, name: "SUITE", nr: 503, qmimi: 300, reservation_status: "0", from_date: "0000-00-00", to_date: "0000-00-00" },
      ]);
    });
};
