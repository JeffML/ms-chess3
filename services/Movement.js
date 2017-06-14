const rankAndFile = require("./helpers/rankAndFileMoves")
const diagonal = require("./helpers/diagonalMoves")
const legalMovesWithBoard = require("./helpers/legalMovesWithBoard")

module.exports = function movement() {

    this.add({
        role: "movement",
        cmd: "rawMoves"
    }, (msg, reply) => {
        var err = null;
        var rawMoves = [];

        var pos = msg.piece.position;

        switch (msg.piece.piece) {
        case 'R':
            rawMoves = rankAndFile(pos);
            break;
        case 'B':
            rawMoves = diagonal(pos);
            break;
        case 'Q':
            rawMoves = rankAndFile(pos)
                .concat(diagonal(pos));
            break;
        case 'K':
            rawMoves = rankAndFile(pos, 1)
                .concat(diagonal(pos, 1))
            break;
        default:
            err = "unhandled " + msg.piece.piece;
            console.error(err)
            break;
        };

        reply(err, rawMoves);
    });

    this.add({
        role: "movement",
        cmd: "legalMoves"
    }, (msg, reply) => {
        const isPawn = msg.piece.piece === 'P';
        const isKnight = msg.piece.piece === 'N';

        this.act({
            role: "movement",
            cmd: "rawMoves",
            piece: msg.piece,
            isPawn: isPawn,
            isKnight: isKnight
        }, (err, msg) => {
            const squared = [];

            msg.forEach((move) => {
                if (move.file >= 'a' && move.file <= 'h') {
                    if (move.rank >= 1 && move.rank <= 8) {
                        squared.push(move)
                    }
                }
            })

            reply(null, squared);
        });
    });

    this.add('role:movement,cmd:legalMoves', function (msg, reply) {
        this.prior(msg, function (err, moves) {
            if (msg.board) {
                const boardMoves = legalMovesWithBoard(msg, moves);
                reply(err, boardMoves);
                return;
            }
            reply(err, moves);
        });
    });
};
