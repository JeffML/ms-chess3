module.exports = function (boardAndPiece, candidateMoves, reply) {
    const opposingColor = boardAndPiece.piece.color === 'W' ? 'black' : 'white';

    //temporarily remove the K to avoid cycles
    boardAndPiece.board.removePiece(boardAndPiece.piece);

    function canCastle(king, rook, intervening, opposing) {
        // console.log("canCastle", arguments)

        const opposingControlled = [...opposing.controlled]
        const board = boardAndPiece.board;
        const canCastle = !candidateMoves.inCheck &&
            !king.hasMoved &&
            rook &&
            rook.color === king.color &&
            !rook.hasMoved;
        if (!canCastle) return false;

        const pieceInTheWay = !!intervening.find(sq => board.pieceAt(sq));
        if (pieceInTheWay) return false;

        const passThruCheck = !!intervening.find(sq =>
            opposingControlled.find(opp => (opp.rank === sq.rank && opp.file == sq.file))
        )
        if (passThruCheck) return false;

        return true;
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

        const additional = {}
        additional.inCheck = inCheck;

        additional.checkMated = (inCheck && filteredMoves.length === 0)

        const rank = additional.color === 'W' ? 1 : 8;
        let rook = boardAndPiece.board.pieceAt(`a${rank}`);
        let intervening = [`b${rank}`, `c${rank}`, `d${rank}`]

        additional.canQSideCastle = canCastle(king, rook, intervening, opposing)

        rook = boardAndPiece.board.pieceAt(`h${rank}`);
        intervening = [`f${rank}`, `g${rank}`]

        additional.canKSideCastle = canCastle(king, rook, intervening, opposing)

        candidateMoves.moves = filteredMoves;
        delete candidateMoves.moveVectors; // no longer valid, and no longer needed

        Object.assign(candidateMoves, additional);
        console.log(candidateMoves)
        reply(null, candidateMoves)
    });
};
