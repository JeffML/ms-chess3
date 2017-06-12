'use strict';

const ChessPiece = require('./ChessPiece')
    .ChessPiece;

class Board {
    constructor(pieces) {
        this.boardPieces = {
            white: [],
            black: []
        };

        if (pieces.white) {
            this.boardPieces.white = pieces.white.map(p => {
                const cp = new ChessPiece(p, 'W');
                return cp;
            });
        }

        if (pieces.black) {
            this.boardPieces.black = pieces.black.map(p => {
                const cp = new ChessPiece(p, 'B');
                return cp;
            });
        }
    }

    pieceAt(position) {
        var file, rank;

        if (position instanceof Object) {
            file = position.file;
            rank = position.rank;
        } else {
            file = position[0];
            rank = position[1];
        }

        const wp = this.boardPieces.white.filter(p => {
            return p.position.file === file && p.position.rank === rank;
        });
        const bp = this.boardPieces.black.filter(p => {
            return p.position.file === file && p.position.rank === rank;
        });

        return wp.length ? wp[0] : bp.length ? bp[0] : null;
    }
}

module.exports = Board;
