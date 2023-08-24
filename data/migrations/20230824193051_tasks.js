/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('task_id').primary();
        table.string('task_description').notNullable();
        table.string('task_notes');
        table.integer('task_completed').defaultTo(0);
        table.integer('project_id').notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
};
