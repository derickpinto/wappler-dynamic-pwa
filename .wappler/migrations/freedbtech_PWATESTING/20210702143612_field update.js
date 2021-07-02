
exports.up = function(knex) {
  return knex.schema
    .table('comments', function (table) {
      table.string('datetime_id');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('comments', function (table) {
      table.dropColumn('datetime_id');
    })
};
