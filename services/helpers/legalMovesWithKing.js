module.exports = function (boardAndPiece, candidateMoves, reply) {
    const opposingColor = boardAndPiece.piece.color === 'W' ? 'black' : 'white';

    //temporarily remove the K to avoid cycles
    boardAndPiece.board.removePiece(boardAndPiece.piece);

    this.use(require('../SquareControl'))

    this.act({
        role: "board",
        cmd: "squaresControlledBy",
        board: boardAndPiece.board,
        color: opposingColor,
    }, (err, opposing) => {
        if (err) {
            reply(err);
            return;
        }
        console.log(opposing.controlled)
        // add the removed K back in
        boardAndPiece.board.addPiece(boardAndPiece.piece);
        const filteredMoves = candidateMoves.moves.filter(m =>
            !!!opposing.controlled.find(o => o.rank === m.rank && o.file === m.file)
        )

        candidateMoves.moves = filteredMoves;
        delete candidateMoves.moveVectors; // no longer valid, and no longer needed
        console.log(
            candidateMoves
        )
        reply(null, candidateMoves)
    });
};
