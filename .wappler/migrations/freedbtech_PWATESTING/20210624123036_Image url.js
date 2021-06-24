
exports.up = function(knex) {
  return knex.schema
    .table('comments', function (table) {
      table.string('image');
    })
};

exports.down = function(knex) {
  return knex.schema
    .table('comments', function (table) {
      table.dropColumn('image');
    })
};
