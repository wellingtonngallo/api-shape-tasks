import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('boards', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description').notNullable();
    table.timestamp('createdDate').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();

    table.integer('sprint_id')
      .notNullable()
      .references('id')
      .inTable('sprints')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('boards');
}