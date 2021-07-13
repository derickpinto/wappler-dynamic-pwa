
exports.up = function(knex) {
  return knex.schema
    .table('comment', function (table) {
      table.string('datetime_id');
      table.string('image');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('comment', function (table) {
      table.dropColumn('datetime_id');
      table.dropColumn('image');
    })
};
