
exports.up = function(knex) {
  return knex.schema
    .createTable('comment', function (table) {
      table.increments('id');
      table.string('name');
      table.string('message');
      table.string('image');
      table.string('datetime');
      table.string('datetime_id');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('comment')
};
