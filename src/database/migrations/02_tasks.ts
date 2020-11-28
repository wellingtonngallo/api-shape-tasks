import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamp('createdDate').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();

    table.integer('board_id')
      .notNullable()
      .references('id')
      .inTable('boards')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('tasks');
}