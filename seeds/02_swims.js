
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "swim"; ALTER SEQUENCE swim_id_seq RESTART WITH 7;')
    .then(function () {
      return knex('swim').insert([
        {
          id: 1,
          date: "11/6/18",
          distance: 5000,
          difficulty: 10,
          notes: "ryan - terrible run...",
          workout_users_id: 1
        }, {
          id: 2,
          date: "11/7/18",
          distance: 6000,
          difficulty: 4,
          notes: "ryan - Great run...",
          workout_users_id: 1
        }, {
          id: 3,
          date: "11/6/18",
          distance: 3500,
          difficulty: 6,
          notes: "logan - Great run...",
          workout_users_id: 2
        }, {
          id: 4,
          date: "11/7/18",
          distance: 4000,
          difficulty: 5,
          notes: "logan - Terrible run...",
          workout_users_id: 2
        }, {
          id: 5,
          date: "11/6/18",
          distance: 4000,
          difficulty: 10,
          notes: "priscilla - Great run...",
          workout_users_id: 3
        }, {
          id: 6,
          date: "11/7/18",
          distance: 4000,
          difficulty: 4,
          notes: "priscilla - alright run...",
          workout_users_id: 3
        }
      ]);
    });
};
