interface KnexConfig {
    [key: string]: {
        client: string;
        connection: {
            host: string;
            port: number;
            user: string;
            password: string;
            database: string;
        };
        migrations: {
            directory: string;
        };
        seeds: {
            directory: string;
        };
    };
}

const dbconfig: KnexConfig = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "admin",
      database: "emporio"
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    seeds: {
      directory: "./src/database/seeds"
    },
  }

};

export default dbconfig;