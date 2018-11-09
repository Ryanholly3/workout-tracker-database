
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workout_users', function(table) {
        table.increments();
        table.string('name', 15);
        table.integer('age');
        table.string('gender', 6);
        table.integer('weight');
        table.string('image', 1000);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('workout_users');
};
