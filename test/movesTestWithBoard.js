"use strict";

const Board = require('../Board');

const movement = require('../services/Movement');
const specialMovement = require('../services/SpecialMovement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(movement)
    .use(specialMovement)

const chaiSubset = require('chai-subset');
const expect = require('chai')
    .use(chaiSubset)
    .expect;

describe('Bishop Legal moves with friendlies test', () => {
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

    it('Bd4 legal moves with friendlies', (done) => {
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

describe('Rook Legal moves with friendlies test', () => {
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

    it('Rd4 legal with friendlies moves', (done) => {
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

describe('Queen Legal moves with friendlies test', () => {
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

    it('Qd4 legal moves with friendlies', (done) => {
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
            // console.log({
            //     moves: msg
            // })
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(20)
            expect(msg)
                .to.containSubset([{
                    file: 'd',
                    rank: '2'
                }, {
                    file: 'g',
                    rank: '7'
                }])
            expect(msg)
                .to.not.include({
                    file: 'c',
                    rank: '3'
                })
            expect(msg)
                .to.not.include({
                    file: 'd',
                    rank: '8'
                })
            done();
        });
    });
});

describe('King Legal moves with friendlies test', () => {
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
                .to.deep.have.same.members([
                    {
                        file: 'c',
                        rank: '4'
                }, {
                        file: 'e',
                        rank: '5'
                }, {
                        file: 'c',
                        rank: '5'
                }, {
                        file: 'e',
                        rank: '4'
                }, {
                        file: 'e',
                        rank: '3'
                }, {
                        file: 'd',
                        rank: '3'
                }
            ])
            done();
        });
    });
});

describe('Knight Legal moves with friendlies test', () => {
    it('Nd4 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Nd4', 'Pc5', 'Pe6', 'Pf3']
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
                .to.be.null
            expect(msg)
                .to.have.lengthOf(6)
            expect(msg)
                .to.deep.contain.members([{
                    file: 'c',
                    rank: '6'
                }, {
                    file: 'e',
                    rank: '2'
                }, {
                    file: 'b',
                    rank: '5'
                }]);
            done();
        });
    });

    it('Na1 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Na1', 'Pb3', 'Pe6', 'Pf3']
        })
        var p = board.pieceAt('a1');

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
                .to.deep.have.same.members([{
                    file: 'c',
                    rank: '2'
                }])
            done();
        });
    });
})

describe('Pawn Legal moves with friendlies test', () => {
    it('Pd4 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Pd4', 'Nd6', 'Pe4', 'Pc5']
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
                .to.deep.have.same.members([{
                    file: 'd',
                    rank: '5'
                }]);
            done();
        });
    });

    it('Pa2 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Pa2', 'Pb3', 'Qa4']
        })
        var p = board.pieceAt('a2');

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
                .to.have.lengthOf(1)
            expect(msg)
                .to.deep.have.same.members([{
                    file: 'a',
                    rank: '3'
                }]);
            done();
        });
    });

    it('Pf2 legal moves', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Pf2', 'Pb3', 'Qa4', 'Nf5']
        })
        var p = board.pieceAt('f2');

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
                .to.have.lengthOf(2)
            expect(msg)
                .to.deep.have.same.members([{
                    file: 'f',
                    rank: '3'
                }, {
                    file: 'f',
                    rank: '4'
                }]);
            done();
        });
    });
})
