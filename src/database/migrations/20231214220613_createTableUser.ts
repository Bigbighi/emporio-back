import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const tableExists = await knex.schema.hasTable("users");
  if(!tableExists){
    await knex.schema.createTable("users", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
    });
  }
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users");
}

