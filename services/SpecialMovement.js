module.exports = function specialMovement() {
    function pawnMoves(position) {
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        var rawMoves = [
            {
                file: String.fromCharCode(cFile),
                rank: String.fromCharCode(cRank + 1)
            }];

        if (position.rank == 2) {
            rawMoves.push({
                file: String.fromCharCode(cFile),
                rank: String.fromCharCode(cRank + 2)
            })
        }

        return {
            moves: rawMoves,
            moveVectors: [rawMoves]
        };
    }

    function knightMoves(position) {
        const cFile = position.file.charCodeAt()
        const cRank = position.rank.charCodeAt();

        var rawMoves = [];

        [-2, 2].forEach(i => {
            [-1, 1].forEach(j => {
                rawMoves.push({
                    file: String.fromCharCode(cFile + i),
                    rank: String.fromCharCode(cRank + j)
                });
                rawMoves.push({
                    file: String.fromCharCode(cFile + j),
                    rank: String.fromCharCode(cRank + i)
                })
            });
        });

        return {
            moves: rawMoves,
            moveVectors: [rawMoves]
        };
    }

    this.add({
        role: "movement",
        cmd: "rawMoves",
        isPawn: true
    }, (msg, reply) => {
        if (msg.piece.piece !== 'P') {
            return ("piece was not a pawn")
        }

        var pos = msg.piece.position;
        reply(null, pawnMoves(pos));
    });

    this.add({
        role: "movement",
        cmd: "rawMoves",
        isKnight: true
    }, (msg, reply) => {
        if (msg.piece.piece !== 'N') {
            return ("piece was not a knight")
        }

        var pos = msg.piece.position;
        reply(null, knightMoves(pos));
    });
}
