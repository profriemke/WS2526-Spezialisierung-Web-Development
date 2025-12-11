import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {


  async up() {
  this.schema.alterTable('notes', (table) => {
    table
      .integer('category_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

  async down() {
   this.schema.alterTable('notes', (table) => {
     table.dropForeign('category_id')
     table.dropColumn('category_id')
   })
  }
}