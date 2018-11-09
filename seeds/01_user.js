
exports.seed = function(knex, Promise) {
  return knex('workout_users').del()
    .then(function () {
      return knex('workout_users').insert([
        {
          id: 1,
          name: "Ryan",
          age: 26,
          gender: "male",
          weight: 170,
          image: "",
        },{
          id: 2,
          name: "Logan",
          age: 26,
          gender: "male",
          weight: 160,
          image: "",
        },{
          id: 3,
          name: "Priscilla",
          age: 56,
          gender: "female",
          weight: 150,
          image: "",
        }
      ]);
    });
};
