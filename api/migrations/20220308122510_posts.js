/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
  await knex.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("description").notNullable()
    table.dateTime("createdAt").defaultTo(knex.fn.now())
    table.integer("usersId").notNullable()
    table.foreign("usersId").references("id").inTable("users")
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  knex.schema.dropTable("posts")
}
