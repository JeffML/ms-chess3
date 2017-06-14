module.exports = function (msg, moves) {
    if (!msg.board) return moves;

    const blockers = moves.filter(m => {
        return (msg.board.pieceAt(m))
    })

    var newMoves = [];
    const pp = msg.piece.position;

    const rangeChecks = {
        B: diagonalChecks,
        R: rankAndFileChecks,
        K: panopticonChecks,
        Q: panopticonChecks,
        P: pawnChecks,
        N: knightChecks
    };

    var rangeCheck = rangeChecks[msg.piece.piece];
    // console.error(msg.piece.piece, rangeCheck.name)
    newMoves = moves.filter(m => {
        return rangeCheck(m, blockers, pp);
    })
    return newMoves;
}

function pawnChecks(m, blockers, pp) {
    console.log({
        move: m,
        blockers,
        pp
    })
    const impedes = blockers.filter(b => {
        return b.file === pp.file &&
            (b.rank === m.rank ||
                b.rank > pp.rank && b.rank < m.rank);
    })
    return impedes.length === 0;
}

function knightChecks(m, blockers) {
    for (const b of blockers) {
        if (m.rank === b.rank && m.file === b.file) {
            return false;
        }
    }

    return true;
}

function panopticonChecks(m, blockers, pp) {
    return rankAndFileChecks(m, blockers, pp) && diagonalChecks(m, blockers, pp);
}

function rankAndFileChecks(m, blockers, pp) {
    let isGood = true;

    for (const b of blockers) {
        if (b.rank < pp.rank && b.file == pp.file && m.file == pp.file) {
            isGood = isGood && m.rank > b.rank;
        }
        if (b.rank > pp.rank && b.file == pp.file && m.file == pp.file) {
            isGood = isGood && m.rank < b.rank;
        }
        if (b.rank == pp.rank && b.file < pp.file && m.rank == pp.rank) {
            isGood = isGood && m.file > b.file;
        }
        if (b.rank == pp.rank && b.file > pp.file && m.rank == pp.rank) {
            isGood = isGood && m.file < b.file;
        }
    }

    return isGood;
}

function diagonalChecks(m, blockers, pp) {
    let isGood = true;

    for (const b of blockers) {
        if (b.rank > pp.rank && b.file > pp.file) {
            if (m.rank > pp.rank && m.file > pp.file) {
                isGood = isGood && (m.rank < b.rank && m.file < b.file);
            }
        }
        if (b.rank > pp.rank && b.file < pp.file) {
            if (m.rank > pp.rank && m.file < pp.file) {
                isGood = isGood && (m.rank < b.rank && m.file > b.file)
            }
        }
        if (b.rank < pp.rank && b.file > pp.file) {
            if (m.rank < pp.rank && m.file > pp.file) {
                isGood = isGood && (m.rank > b.rank && m.file < b.file)
            }
        }
        if (b.rank < pp.rank && b.file < pp.file) {
            if (m.rank < pp.rank && m.file < pp.file) {
                isGood = isGood && (m.rank > b.rank && m.file > b.file)
            }
        }
    }

    return isGood;
}
