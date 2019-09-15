/* eslint-disable strict */
const xss = require('xss');
const table = 'waitline';

const LineService = {
  
  getFullLine(knex, user_id) {
    return knex.select(
      'id',
      'guest_name',
      'phone_number',
      'size',
      'user_id'
    )
      .from(table) 
      .where('user_id', user_id);
  },

  addNewGuest(knex, newGuest) {
    return knex
      .insert(newGuest)
      .into(table)
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex
      .from(table)
      .select('*')
      .where('id', id)
      .first();
  },

  deleteGuest(knex, id) {
    return knex(table)
      .where({id})
      .delete();
  },

  updateInfo(knex, id, newInfo) {
    return knex(table)
      .where({id})
      .update(newInfo);
  },

  serializeGuest(guest) {
    return {
      id: guest.id,
      guest_name: xss(guest.guest_name),
      phone_number: xss(guest.phone_number),
      size: xss(guest.size),
      user_id: guest.user_id,
    };
  }
};

module.exports = LineService;