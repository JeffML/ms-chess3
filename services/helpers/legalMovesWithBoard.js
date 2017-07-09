module.exports = function (boardAndPiece, candidateMoves) {
    if (!boardAndPiece.board) return candidateMoves;

    const rangeChecks = {
        B: vectorChecks,
        R: vectorChecks,
        K: vectorChecks,
        Q: vectorChecks,
        P: pawnChecks,
        N: knightChecks
    };

    var rangeCheck = rangeChecks[boardAndPiece.piece.piece];
    return rangeCheck(boardAndPiece, candidateMoves)
}

function knightChecks(boardAndPiece, candidateMoves) {
    const newMoves = [];

    for (const m of candidateMoves.moves) {
        const p = boardAndPiece.board.pieceAt(m)
        if (!p) {
            newMoves.push(m)
        } else if (p.color !== boardAndPiece.piece.color) {
            m.hasCaptured = p;
            newMoves.push(m)
        }
    }
    return {
        moves: newMoves,
        moveVectors: [newMoves]
    };
}

function pawnChecks(boardAndPiece, candidateMoves) {
    function diag(lr, p) {
        const dir = p.color === 'W' ? 1 : -1;
        const cFile = p.position.file.charCodeAt() + lr * dir;
        const cRank = p.position.rank.charCodeAt() + lr * dir;
        const pos = {
            file: String.fromCharCode(cFile),
            rank: String.fromCharCode(cRank)
        }

        pos.hasCaptured = boardAndPiece.board.pieceAt(pos);

        return pos.hasCaptured && pos.hasCaptured.color !== p.color ? pos : null;
    }

    const LEFT = -1,
        RIGHT = 1;
    const capturable = [diag(LEFT, boardAndPiece.piece), diag(RIGHT, boardAndPiece.piece)];

    const newMoves = [];
    for (const m of candidateMoves.moves) {
        const p = boardAndPiece.board.pieceAt(m)
        if (!p) {
            newMoves.push(m)
        }
    }

    if (capturable[0] && boardAndPiece.board.pieceAt(capturable[0])) {
        newMoves.push(capturable[0])
    }

    if (capturable[1] && boardAndPiece.board.pieceAt(capturable[1])) {
        newMoves.push(capturable[1])
    }


    //en passant check
    var ep = boardAndPiece.board.epPossibleOnPawn;

    if (ep) {
        const epf = ep.position.file.charCodeAt();
        const epr = ep.position.rank.charCodeAt();

        const mf = boardAndPiece.piece.position.file.charCodeAt();
        const mr = boardAndPiece.piece.position.rank.charCodeAt();

        if (epr === mr && (epf === mf + 1 || epf === mf - 1)) {
            const epCapture = {
                file: String.fromCharCode(epf),
                rank: String.fromCharCode(epr + (boardAndPiece.piece.color === 'W' ? 1 : -1)),
                hasCaptured: ep
            }

            newMoves.push(epCapture)
        }
    }

    return {
        moves: newMoves,
        moveVectors: [newMoves]
    }
}

function vectorChecks(boardAndPiece, candidateMoves) {
    for (const [j, v] of candidateMoves.moveVectors.entries()) {
        for (const [i, m] of v.entries()) {
            const p = boardAndPiece.board.pieceAt(m);
            if (p) {
                debugger;
                if (p.color === boardAndPiece.piece.color) {
                    candidateMoves.moveVectors[j] = v.slice(0, i);
                    break;
                } else {
                    candidateMoves.moveVectors[j] = v.slice(0, i + 1);
                    Object.assign(candidateMoves.moveVectors[j].slice(-1)[0], {
                        hasCaptured: p
                    })
                    break;
                }
            }
        }
    }

    return {
        moveVectors: candidateMoves.moveVectors,
        moves: Array.prototype.concat(...candidateMoves.moveVectors)
    }
}
