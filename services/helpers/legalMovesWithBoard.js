module.exports = function (msg, moves) {
    if (!msg.board) return moves;

    const blockers = moves.filter(m => {
        return (msg.board.pieceAt(m))
    })

    var newMoves = [];
    const pp = msg.piece.position;

    switch (msg.piece.piece) {
    case 'B':
        newMoves = moves.filter(m => {
            return diagonalChecks(m, blockers, pp);
        })
        return newMoves;
    case 'R':
        newMoves = moves.filter(m => {
            return rankAndFileChecks(m, blockers, pp)
        })
        return newMoves;
    case 'K':
    case 'Q':
        newMoves = moves.filter(m => {
            return panopticonChecks(m, blockers, pp)
        })
        return newMoves;
    }

}

function panopticonChecks(m, blockers, pp) {
    return rankAndFileChecks(m, blockers, pp) && diagonalChecks(m, blockers, pp);
}

function rankAndFileChecks(m, blockers, pp) {
    var isGood = true;

    for (var b of blockers) {
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
    var isGood = true;

    for (var b of blockers) {
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
