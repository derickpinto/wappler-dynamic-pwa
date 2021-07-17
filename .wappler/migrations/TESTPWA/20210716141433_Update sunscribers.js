
exports.up = function(knex) {
  return knex.schema
    .createTable('subscription', function (table) {
      table.increments('id');
      table.string('endpoint');
      table.string('authKey');
      table.string('p256dh');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('subscription')
};
