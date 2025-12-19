/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import UsersController from '#controllers/users_controller'
import NotesController from '#controllers/notes_controller'

router.on('/').render('pages/home')
router.get('/login', [UsersController, 'login'])
router.post('/login', [UsersController, 'authenticate'])
router.get('/logout', [UsersController, 'logout'])

router.get('/notes', [NotesController, 'overview']).use(middleware.auth())
router.get('/categories/:categoryId/notes/create', [NotesController, 'create']).use(middleware.auth())
router.post('/categories/:categoryId/notes', [NotesController, 'store']).use(middleware.auth())