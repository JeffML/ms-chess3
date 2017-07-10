module.exports = function squareControl() {
    const getSquaresControlledBy = (board, pieceColor, cb) => {
        var pieces = board.boardPieces[pieceColor];

        const promises = pieces.map(p =>
            new Promise(resolve => {
                this.act({
                    role: "movement",
                    cmd: "legalMoves",
                    piece: p,
                    board: board
                }, (err, msg) => {
                    if (err) throw new Error("ack!")
                    resolve({
                        piece: p,
                        moves: msg
                    })
                });
            })
        );

        Promise.all(promises)
            .then(pieceMoves => {
                cb(pieceMoves)
            })
            .catch(err => console.error(err))

    }

    this.add({
        role: "board",
        cmd: "squaresControlledBy",
    }, (msg, reply) => {
        getSquaresControlledBy(msg.board, msg.color, pieceMoves => {
            debugger;
            const allMoves = pieceMoves.map(pms => pms.moves.moves)
            const response = {
                pieceMoves,
                controlled: Array.prototype.concat(...allMoves)
                    .filter((move, i, self) =>
                        self.findIndex(m => m.file === move.file && m.rank === move.rank) === i)
            }

            reply(null, response)
        })
    });
}
