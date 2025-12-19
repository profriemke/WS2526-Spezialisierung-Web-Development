import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Category from '#models/category'
import Note from '#models/note'

export default class extends BaseSeeder {
  async run() {
    const demoUser = await User.updateOrCreate(
      { email: 'demo@todos.test' },
      { fullName: 'Demo User', password: '123' }
    )

    const thorstenUser = await User.updateOrCreate(
      { email: 'riemke-gurzki@hdm-stuttgart.de' },
      { fullName: 'Thorsten Riemke', password: '123' }
    )

    const shoppingCategory = await Category.updateOrCreate(
      { name: 'Einkauf', userId: thorstenUser.id },
      { description: 'Einkaufsliste', userId: thorstenUser.id }
    )

    const workCategory = await Category.updateOrCreate(
      { name: 'Arbeit', userId: thorstenUser.id },
      { description: 'Arbeitsbezogene Aufgaben', userId: thorstenUser.id }
    )

    await Note.updateOrCreate(
      { title: 'Wocheneinkauf planen', categoryId: shoppingCategory.id },
      {
        content: 'Check Vorräte, dann Einkaufsliste finalisieren',
        userId: thorstenUser.id,
        categoryId: shoppingCategory.id,
      }
    )

    await Note.updateOrCreate(
      { title: 'Sprint-Demo vorbereiten', categoryId: workCategory.id },
      {
        content: 'Slides anpassen und Testlauf durchführen',
        userId: thorstenUser.id,
        categoryId: workCategory.id,
      }
    )
  }
}