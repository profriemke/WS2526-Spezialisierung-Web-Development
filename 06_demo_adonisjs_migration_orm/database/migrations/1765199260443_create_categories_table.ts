import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.text('description').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })

    this.schema.alterTable('todos', (table) => {
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable(this.tableName)
        .onDelete('CASCADE')

      table.index(['category_id'], 'todos_category_id_index')
    })
  }

  async down() {
    this.schema.alterTable('todos', (table) => {
      table.dropIndex(['category_id'], 'todos_category_id_index')
      table.dropForeign('category_id')
      table.dropColumn('category_id')
    })

    this.schema.dropTable(this.tableName)
  }
}