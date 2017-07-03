module.exports = function diagonal(position, range = 7) {
    var moveVectors = [[], [], [], []];

    const cFile = position.file.charCodeAt()
    const cRank = position.rank.charCodeAt();

    for (var i = 1; i < range + 1; i++) {
        moveVectors[0].push({
            file: String.fromCharCode(cFile - i),
            rank: String.fromCharCode(cRank - i)
        });
        moveVectors[1].push({
            file: String.fromCharCode(cFile + i),
            rank: String.fromCharCode(cRank + i)
        });
        moveVectors[2].push({
            file: String.fromCharCode(cFile - i),
            rank: String.fromCharCode(cRank + i)
        });
        moveVectors[3].push({
            file: String.fromCharCode(cFile + i),
            rank: String.fromCharCode(cRank - i)
        });
    }
    return {
        moveVectors,
        moves: Array.prototype.concat(...moveVectors)
    };
}
