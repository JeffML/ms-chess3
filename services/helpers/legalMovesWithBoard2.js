module.exports = function (msg, msg2) {
    if (!msg.board) return msg2;

    const rangeChecks = {
        B: vectorChecks,
        R: vectorChecks,
        K: vectorChecks,
        Q: vectorChecks,
        P: simpleChecks,
        N: simpleChecks
    };

    var rangeCheck = rangeChecks[msg.piece.piece];
    return rangeCheck(msg, msg2)
}

function simpleChecks(msg, msg2) {
    const newMoves = [];

    for (const m of msg2.moves) {
        const p = msg.board.pieceAt(m)
        if (!p) {
            newMoves.push(m)
        } else if (p.color !== msg.piece.color) {
            m.hasCaptured = p;
            newMoves.push(m)
        }
    }
    return {
        moves: newMoves,
        moveVectors: [newMoves]
    };
}


function vectorChecks(msg, msg2) {
    for (const [j, v] of msg2.moveVectors.entries()) {
        for (const [i, m] of v.entries()) {
            const p = msg.board.pieceAt(m);
            if (p) {
                debugger;
                if (p.color === msg.piece.color) {
                    msg2.moveVectors[j] = v.slice(0, i);
                    break;
                } else {
                    msg2.moveVectors[j] = v.slice(0, i + 1);
                    Object.assign(msg2.moveVectors[j].slice(-1)[0], {
                        hasCaptured: p
                    })
                    break;
                }
            }
        }
    }

    return {
        moveVectors: msg2.moveVectors,
        moves: Array.prototype.concat(...msg2.moveVectors)
    }
}
