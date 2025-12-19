import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Category from '#models/category'
import { title } from 'process'
import Note from '#models/note'

const createNoteValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(2).maxLength(255),
        content: vine.string().trim().minLength(1),
    })
)

export default class NotesController {
    public async overview({ view, auth }: HttpContext) {
        const categories = await Category.query()
            .where('user_id', auth.user!.id)
            .preload('notes', (notesQuery) => {
                notesQuery.orderBy('updated_at', 'desc')
            })

        return view.render('pages/notes/overview', { categories })
    }

    public async create({ params, view, auth, response }: HttpContext) {
        const category = await Category.query()
            .where('id', params.categoryId)
            .andWhere('user_id', auth.user!.id)
            .first()

        if (!category) {
            return response.redirect('/notes')
        }
        return view.render('pages/notes/create', { category })
    }

    public async store({ params, request, auth, response, session }: HttpContext) {
        // hier fehlt Validierung
        const note = new Note();
        note.title = request.input('title');
        note.content = request.input('content');
        note.categoryId = params.categoryId;
        await note.save();
        session.flash('success', 'Notiz erstellt')
        return response.redirect('/notes')
    }
}