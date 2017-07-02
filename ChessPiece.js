'use strict';

const pieces = [
    'K',
    'Q',
    'R',
    'B',
    'N',
    'P'];


class ChessPiece {
    constructor(
        notation, {
            color = 'W',
            hasMoved = false,
            inCheck = false
        } = {}) {
        const piece = notation[0];
        const file = notation[1];
        const rank = notation[2];
        this.color = color;
        this.hasMoved = hasMoved;
        this.inCheck = inCheck;

        if (!pieces.includes(piece)) {
            throw Error("invalid piece", piece);
        }

        if (file < 'a' || file > 'h') {
            throw Error("invalid file")
        }
        if (rank < 1 || rank > 8) {
            throw Error("invalid rank");
        }
        if (piece === 'P' && rank < 2) {
            throw Error("pawns cannot be on first rank");
        }

        this.mustPromote = (piece === 'P' && rank === 8)
        this.piece = piece;
        this.position = {
            file,
            rank
        }
    }

    denote() {
        return color === 'B' ? '...' : '' + this.piece + this.position.file + this.position.rank;
    }
}

module.exports = {
    pieces,
    ChessPiece
}
