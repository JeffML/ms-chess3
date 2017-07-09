module.exports = function (msg, msg2) {
    if (!msg.board) return msg2;

    const rangeChecks = {
        B: vectorChecks,
        R: vectorChecks,
        K: vectorChecks,
        Q: vectorChecks,
        P: pawnChecks,
        N: knightChecks
    };

    var rangeCheck = rangeChecks[msg.piece.piece];
    return rangeCheck(msg, msg2)
}

function knightChecks(msg, msg2) {
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

function pawnChecks(msg, msg2) {
    function upperLeft(p) {
        const dir = p.color === 'W' ? 1 : -1;
        const cFile = p.position.file.charCodeAt() + dir;
        const cRank = p.position.rank.charCodeAt() + dir;
        const pos = {
            file: String.fromCharCode(cFile),
            rank: String.fromCharCode(cRank)
        }

        pos.hasCaptured = msg.board.pieceAt(pos);

        return pos.hasCaptured && pos.hasCaptured.color !== p.color ? pos : null;
    }

    function upperRight(p) {
        const dir = p.color === 'W' ? 1 : -1;
        const cFile = p.position.file.charCodeAt() - dir;
        const cRank = p.position.rank.charCodeAt() - dir;
        const pos = {
            file: String.fromCharCode(cFile),
            rank: String.fromCharCode(cRank)
        }

        pos.hasCaptured = msg.board.pieceAt(pos);

        return pos.hasCaptured && pos.hasCaptured.color !== p.color ? pos : null;
    }

    const capturable = [upperLeft(msg.piece), upperRight(msg.piece)];

    const newMoves = [];
    for (const m of msg2.moves) {
        const p = msg.board.pieceAt(m)
        if (!p) {
            newMoves.push(m)
        }
    }

    if (capturable[0] && msg.board.pieceAt(capturable[0])) {
        newMoves.push(capturable[0])
    }

    if (capturable[1] && msg.board.pieceAt(capturable[1])) {
        newMoves.push(capturable[1])
    }


    //en passant check
    var ep = msg.board.epPossibleOnPawn;

    if (ep) {
        const epf = ep.position.file.charCodeAt();
        const epr = ep.position.rank.charCodeAt();

        const mf = msg.piece.position.file.charCodeAt();
        const mr = msg.piece.position.rank.charCodeAt();

        if (epr === mr && (epf === mf + 1 || epf === mf - 1)) {
            const epCapture = {
                file: String.fromCharCode(epf),
                rank: String.fromCharCode(epr + (msg.piece.color === 'W' ? 1 : -1)),
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
