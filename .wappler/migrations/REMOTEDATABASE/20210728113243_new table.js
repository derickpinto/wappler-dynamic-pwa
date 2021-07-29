
exports.up = function(knex) {
  return knex.schema
    .createTable('subscriptions', function (table) {
      table.increments('id');
      table.string('endpoint');
      table.string('authKey');
      table.string('9256dh');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('subscriptions')
};
