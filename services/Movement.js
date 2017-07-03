const rankAndFile = require("./helpers/rankAndFileMoves")
const diagonal = require("./helpers/diagonalMoves")
const legalMovesWithBoard = require("./helpers/legalMovesWithBoard")

module.exports = function movement() {

    this.add({
        role: "movement",
        cmd: "rawMoves"
    }, (msg, reply) => {
        var err = null;
        var rawMoves = {};

        var pos = msg.piece.position;

        switch (msg.piece.piece) {
        case 'R':
            rawMoves = rankAndFile(pos);
            break;
        case 'B':
            rawMoves = diagonal(pos);
            break;
        case 'Q':
            var rfMoves = rankAndFile(pos);
            var dgMoves = diagonal(pos);
            var vectors = [...rfMoves.moveVectors, ...dgMoves.moveVectors]
            rawMoves = {
                moveVectors: vectors,
                moves: Array.prototype.concat(...vectors)
            }
            break;
        case 'K':
            var rfMoves = rankAndFile(pos, 1);
            var dgMoves = diagonal(pos, 1);
            var vectors = [...rfMoves.moveVectors, ...dgMoves.moveVectors]
            rawMoves = {
                moveVectors: vectors,
                moves: Array.prototype.concat(...vectors)
            }
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
            msg.moveVectors.forEach((vector, idx, arr) => {
                const newVector = vector.filter(move => {
                    return (move.rank >= 1 && move.rank <= 8) && (move.file >= 'a' && move.file <= 'h');
                })
                arr[idx] = newVector;
            })

            reply(null, {
                moveVectors: msg.moveVectors,
                moves: Array.prototype.concat(...msg.moveVectors)
            });
        });
    });

    this.add('role:movement,cmd:legalMoves', function (msg, reply) {
        this.prior(msg, function (err, msg2) {
            if (msg.board) {
                const boardMoves = legalMovesWithBoard(msg, msg2.moves);
                //FIXME this is wrong:
                reply(err, {
                    moves: boardMoves,
                    moveVectors: msg.moveVectors
                });
                return;
            }
            reply(err, msg2);
        });
    });
};
