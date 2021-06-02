
exports.game_get = (req, res) => {
	res.render('game')
}

exports.game_sudoku_get = (req, res) => {
	res.render('game/g_sudoku')
}

exports.game_tictactoe_get = (req, res) => {
	res.render('game/g_tictactoe')
}

exports.game_post = (req, res) => {
	
}


