const { initDatabaseConnection } = require('../config/database')
const express = require('express');
const router = express.Router()
const { login_get, login_post }  = require('../controller/login')
const { register_get, register_post } = require('../controller/register')
const { notepad_get, notepad_post }  = require('../controller/notepad')
const { events_get, events_post }  = require('../controller/events')
const { gallery_get, gallery_post }  = require('../controller/gallery')
const { game_get, game_sudoku_get, game_tictactoe_get, game_post }  = require('../controller/game')
const { books_get, books_post, booksdata_get }  = require('../controller/books')
const { record_get, record_post }  = require('../controller/record')



router.get('/', (req, res) => {	
	res.render('ds-main')
})


router.route('/login').get(login_get)
// router.route('/login').post(login_post)


router.route('/register').get(register_get)
router.route('/register').post(register_post)


router.route('/notepad').get(notepad_get)
router.route('/notepad').post(notepad_post)


router.route('/events').get(events_get)
router.route('/events').post(events_post)


router.route('/gallery').get(gallery_get)
router.route('/gallery').post(gallery_post)


router.route('/game').get(game_get)
router.route('/game/g_sudoku').get(game_sudoku_get)
router.route('/game/g_tictactoe').get(game_tictactoe_get)
router.route('/game').post(game_post)


router.route('/record').get(record_get)
router.route('/record').post(record_post)


router.route('/books').get(books_get)
router.route('/books').get(booksdata_get)
router.route('/books').post(books_post)


module.exports = router;