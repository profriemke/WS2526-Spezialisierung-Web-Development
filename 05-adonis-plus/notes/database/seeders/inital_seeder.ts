import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const demoUser = await User.updateOrCreate(
      { email: 'demouser@demo.de'},
      {fullName:'Danni Demo', password: '123'}
    )
        const riemke = await User.updateOrCreate(
      { email: 'riemke@hdm.de'},
      {fullName:'Riemke Riemky', password: '123'}
    )
        const hanna = await User.updateOrCreate(
      { email: 'hanna@hdm.de'},
      {fullName:'Hanna Hanna', password: '123'}
    )
  }
}