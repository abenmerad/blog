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
    table.integer("userId").notNullable()
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE")
  })

  await knex
    .insert([
      {
        title: "First post",
        description: "Hello ground world",
        userId: 1,
      },
      {
        title: "Nice",
        description: "One person suffered to make this message visible",
        userId: 1,
      },
      {
        title: "One more",
        description: "And why not ?",
        userId: 1,
      },
      {
        title: "Big hello to my friend Johnny Silverhand",
        description: "Johnny Silverhand, the best Netrunner in Night City.",
        userId: 1,
      },
    ])
    .into("posts")
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
  await knex.schema.dropTable("posts")
}
