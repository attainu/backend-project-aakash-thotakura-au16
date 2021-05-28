
exports.game_get = (req, res) => {
	res.render('game')
}

exports.game_post = (req, res) => {
	
}

router.get('/game/g_sudoku', (req, res) => {
	res.render('game/g_sudoku')	
})

router.get('/game/g_tictactoe', (req, res) => {
	res.render('game/g_tictactoe')	
})