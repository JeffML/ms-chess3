'use strict';

const ChessPiece = require('./ChessPiece')
    .ChessPiece;

const colorMap = {
    W: 'white',
    B: 'black'
};

class Board {

    constructor(pieces, {
        onMove = 'W',
        lastMove = null
    } = {}) {
        this.boardPieces = {
            white: [],
            black: []
        };
        this.onMove = onMove;
        this.lastMove = lastMove;

        if (pieces.white) {
            this.boardPieces.white = pieces.white.map(p => {
                const cp = new ChessPiece(p, {
                    color: 'W'
                });
                return cp;
            });
        }

        if (pieces.black) {
            this.boardPieces.black = pieces.black.map(p => {
                const cp = new ChessPiece(p, {
                    color: 'B'
                });
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

        return wp.length ? wp[0] :
            bp.length ? bp[0] :
            null;
    }

    allPieces() {
        return [...this.boardPieces.white, ...this.boardPieces.black]
    }

    removePiece(piece) {
        const color = colorMap[piece.color]

        return this.boardPieces[color] = this.boardPieces[color].filter(p => p !== piece)
    }

    addPiece(piece) {
        const color = colorMap[piece.color]
        this.boardPieces[color].push(piece);
    }
}


module.exports = Board;
