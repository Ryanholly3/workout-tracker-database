
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bike', function(table) {
        table.increments();
        table.string('date', 8);
        table.integer('distance');
        table.integer('difficulty');
        table.string('notes', 200);
        table.integer('user_id').references('user.id').unsigned().onDelete('cascade');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bike');
};
