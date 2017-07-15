module.exports = function (boardAndPiece, candidateMoves, reply) {
    const opposingColor = boardAndPiece.piece.color === 'W' ? 'black' : 'white';

    boardAndPiece.board.removePiece(boardAndPiece.piece);


    // console.log('LMWK', opposingColor)
    // this.act({
    //     role: "board",
    //     cmd: "squaresControlledBy",
    //     board: boardAndPiece.board,
    //     color: opposingColor,
    // }, (err, msg) => {
    //     reply(err, candidateMoves)
    // });

    reply(null, candidateMoves)
};
