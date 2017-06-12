"use strict";

var Board = require('../Board');

var movement = require('../services/Movement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(movement);

var expect = require('chai')
    .expect;

describe('Bishop Legal moves test', () => {
    it('Ba1 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Ba1', 'Pc3', 'Nf6']
        })
        var Ba1 = board.pieceAt('a1');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: Ba1,
            board: board
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(1)
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '2'
                });
            expect(msg)
                .to.not.include({
                    file: 'h',
                    rank: '8'
                })
            expect(msg)
                .not.include({
                    file: 'a',
                    rank: '1'
                });
            done();
        });
    });

    it('Bd4 legal moves', (done) => {
        seneca.error(done);
        var board = new Board({
            white: ['Bd4', 'Nd3', 'Rc3', 'Pf6']
        })

        var p = board.pieceAt('d4');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(7)
            expect(msg)
                .to.include({
                    file: 'e',
                    rank: '5'
                });
            expect(msg)
                .to.include({
                    file: 'g',
                    rank: '1'
                })
            expect(msg)
                .not.include({
                    file: 'g',
                    rank: '7'
                });
            done();
        });
    });
});

describe('Rook Legal moves test', () => {
    it('Ra1 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Ra1', 'Pc3', 'Nf6', 'Qg1']
        })
        var p = board.pieceAt('a1');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(12)
            expect(msg)
                .to.include({
                    file: 'a',
                    rank: '2'
                });
            expect(msg)
                .to.not.include({
                    file: 'h',
                    rank: '1'
                })
            expect(msg)
                .not.include({
                    file: 'b',
                    rank: '2'
                });
            done();
        });
    });

    it('Rd4 legal moves', (done) => {
        seneca.error(done);
        var board = new Board({
            white: ['Rd4', 'Nd3', 'Rc3', 'Pf6']
        })

        var p = board.pieceAt('d4');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(11)
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '5'
                });
            expect(msg)
                .to.include({
                    file: 'g',
                    rank: '4'
                })
            expect(msg)
                .not.include({
                    file: 'd',
                    rank: '2'
                });
            done();
        });
    });
});

describe('Queen Legal moves test', () => {
    it('Qg2 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Qg2', 'Pg5', 'Rc3', 'Bd5']
        })
        var p = board.pieceAt('g2');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            // console.log({
            //     moves: msg
            // })
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(15)
            expect(msg)
                .to.include({
                    file: 'a',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'h',
                    rank: '1'
                })
            expect(msg)
                .not.include({
                    file: 'g',
                    rank: '6'
                });
            expect(msg)
                .to.include({
                    file: 'e',
                    rank: '4'
                })
            expect(msg)
                .not.include({
                    file: 'b',
                    rank: '7'
                });
            done();
        });
    });

    it('Qd4 legal moves', (done) => {
        seneca.error(done);
        var board = new Board({
            white: ['Qd4', 'Pg5', 'Rc3', 'Bd5']
        })

        var p = board.pieceAt('d4');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            console.log({
                moves: msg
            })
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(20)
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'g',
                    rank: '7'
                })
            expect(msg)
                .not.include({
                    file: 'c',
                    rank: '3'
                });
            expect(msg)
                .not.include({
                    file: 'd',
                    rank: '8'
                });
            done();
        });
    });
});

describe('King Legal moves test', () => {
    it('Kd4 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Kd4', 'Pg5', 'Rc3', 'Bd5']
        })
        var p = board.pieceAt('d4');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            // console.log({
            //     moves: msg
            // })
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(6)
            expect(msg)
                .to.include({
                    file: 'c',
                    rank: '4'
                });
            expect(msg)
                .to.include({
                    file: 'e',
                    rank: '5'
                })
            expect(msg)
                .not.include({
                    file: 'd',
                    rank: '5'
                });
            expect(msg)
                .to.not.include({
                    file: 'c',
                    rank: '3'
                })
            expect(msg)
                .include({
                    file: 'c',
                    rank: '5'
                });
            done();
        });
    });
})
