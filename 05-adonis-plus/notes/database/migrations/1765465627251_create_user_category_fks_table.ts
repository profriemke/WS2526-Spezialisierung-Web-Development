import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {


  async up() {
  this.schema.alterTable('categories', (table) => {
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

  async down() {
   this.schema.alterTable('categories', (table) => {
     table.dropForeign('user_id')
     table.dropColumn('user_id')
   })
  }
}