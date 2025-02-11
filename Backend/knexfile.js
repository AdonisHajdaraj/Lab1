module.exports = {
    development: {
      client: "mysql2",
      connection: {
        host: "localhost",
        user: "root",
        password: "",
        database: "hotel",
      },
      migrations: {
        directory: "./migrations",
      },
      seeds: {
        directory: "./seeds",
      },
    },
  };
  