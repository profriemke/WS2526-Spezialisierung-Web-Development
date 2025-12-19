import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
export default class UsersController {
    public async login({ view }: HttpContext) {
        return view.render('auth/login')
    }

    public async authenticate({ request, response, session, auth }: HttpContext) {

        const { email, password } = request.only(['email', 'password'])
        console.log('Authenticating user with email:', email, password)

        try {
            const user = await User.verifyCredentials(email, password)
            console.log('User authenticated:', user)
            await auth.use('web').login(user)

            session.flash('success', 'Erfolgreich eingeloggt')
            return response.redirect('/notes')
        } catch (error) {
            console.error('Login failed', error)
            session.flash('error', 'Ungültige Zugangsdaten')
        }
        return response.redirect().back()
    }

    public async logout({ response, session, auth }: HttpContext) {

        await auth.use('web').logout()
        session.flash('success', 'Erfolgreich ausgeloggt')
        return response.redirect('/login')
    }
}