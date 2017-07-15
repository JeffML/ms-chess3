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
    }, (err, msg) => {
        //FIXME: do something here
        // add the removed K back in 
        boardAndPiece.board.addPiece(boardAndPiece.piece);
        reply(err, candidateMoves)
    });
};
