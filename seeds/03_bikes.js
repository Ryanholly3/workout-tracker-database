
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "bike"; ALTER SEQUENCE bike_id_seq RESTART WITH 7;')
    .then(function () {
      return knex('bike').insert([
        {
          id: 1,
          date: "11/6/18",
          distance: 50000,
          difficulty: 10,
          notes: "ryan - terrible bike...",
          workout_users_id: 1
        }, {
          id: 2,
          date: "11/7/18",
          distance: 60000,
          difficulty: 4,
          notes: "ryan - Great bike...",
          workout_users_id: 1
        }, {
          id: 3,
          date: "11/6/18",
          distance: 35000,
          difficulty: 6,
          notes: "logan - Great bike...",
          workout_users_id: 2
        }, {
          id: 4,
          date: "11/7/18",
          distance: 40000,
          difficulty: 5,
          notes: "logan - Terrible bike...",
          workout_users_id: 2
        }, {
          id: 5,
          date: "11/6/18",
          distance: 40000,
          difficulty: 10,
          notes: "priscilla - Great bike...",
          workout_users_id: 3
        }, {
          id: 6,
          date: "11/7/18",
          distance: 40000,
          difficulty: 4,
          notes: "priscilla - alright bike...",
          workout_users_id: 3
        }
      ]);
    });
};
