module.exports = function (boardAndPiece, candidateMoves, reply) {
    const opposingColor = boardAndPiece.piece.color === 'W' ? 'black' : 'white';

    //temporarily remove the K to avoid cycles
    boardAndPiece.board.removePiece(boardAndPiece.piece);

    function canCastle(king, rook, intervening, opposing) {
        const canCastle = !king.hasMoved && rook && !rook.hasMoved;
        return canCastle;
    }

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

        const king = boardAndPiece.piece;
        // console.log(opposing.controlled)
        // add the removed K back in
        boardAndPiece.board.addPiece(king);
        const filteredMoves = candidateMoves.moves.filter(m =>
            !!!opposing.controlled.find(o => o.rank === m.rank && o.file === m.file)
        )

        const kingSq = king.position;
        const inCheck = !!opposing.controlled.find(o => o.rank === kingSq.rank && o.file === kingSq.file)

        king.inCheck = inCheck;

        king.canQSideCastle = king.canKSideCastle = !(king.inCheck || king.hasMoved);

        const rank = king.color === 'W' ? '1' : '8';
        let rook = boardAndPiece.board.pieceAt(`a${rank}`);
        let intervening = [`b${rank}`, `c${rank}`, `d${rank}`]

        king.canQSideCastle = canCastle(king, rook, intervening, opposing)

        rook = boardAndPiece.board.pieceAt(`h${rank}`);
        intervening = [`f${rank}`, `g${rank}`]

        king.canKSideCastle = canCastle(king, rook, intervening, opposing)

        king.checkMated = (inCheck && filteredMoves.length === 0)

        candidateMoves.moves = filteredMoves;
        delete candidateMoves.moveVectors; // no longer valid, and no longer needed
        // console.log(
        //     candidateMoves
        // )
        reply(null, candidateMoves)
    });
};
