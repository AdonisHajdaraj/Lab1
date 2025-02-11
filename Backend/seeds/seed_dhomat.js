/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex("dhomat")
    .del()
    .then(() => {
      return knex("dhomat").insert([
        { id: 2, image: null, name: "Dhoma Standarte", pershkrimi: "Dhomat standard në hotele janë të përshtatshme për një qëndrim komod." },
        { id: 3, image: null, name: "Dhoma Eksklusive", pershkrimi: "Dhomat ekskluzive në hotele janë për ata që kërkojnë një përvojë të veçantë dhe të privilegjuar gjatë qëndrimit të tyre..." },
        { id: 4, image: null, name: "Dhoma Familjare", pershkrimi: "Dhomat familjare në hotele janë të dizajnuara për të ofruar një qëndrim të rehatshëm dhe të këndshëm për familjet..." },
        { id: 5, image: null, name: "Dhoma Vip", pershkrimi: "Dhomat VIP në hotele janë për mysafirët që dëshirojnë një përvojë të jashtëzakonshme dhe të veçantë gjatë qëndrimit të tyre..." },
        { id: 6, image: null, name: "Dhoma Suite", pershkrimi: "Dhomat suite janë përkufizuar nga luksi, eleganca dhe komoditeti..." },
      ]);
    });
};
