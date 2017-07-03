"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var movement = require('../services/Movement')
var specialMovement = require('../services/SpecialMovement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(specialMovement)
    .use(movement);

const chaiSubset = require('chai-subset');
const expect = require('chai')
    .use(chaiSubset)
    .expect;

describe('Pawn moves test', () => {
    it('Pa2 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Pa2');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isPawn: true
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'a',
                    rank: '3'
                }, {
                    file: 'a',
                    rank: '4'
                }])
            expect(msg.moves)
                .not.include({
                    file: 'e',
                    rank: '1'
                })
            done();
        });
    });

    it('Pd3 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Pd4');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isPawn: true
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'd',
                    rank: '5'
                }])

            expect(msg.moves)
                .not.include({
                    file: 'e',
                    rank: '4'
                })
            done();
        });
    });
});

describe("Knight moves tests", () => {
    it('Nd4 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Nd4');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isKnight: true
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'b',
                    rank: '3'
                }, {
                    file: 'f',
                    rank: '3'
                }, {
                    file: 'c',
                    rank: '6'
                }])

            expect(msg.moves)
                .not.include({
                    file: 'g',
                    rank: '4'
                })
            expect(msg.moves)
                .to.have.lengthOf(8)
            done();
        });
    })

    it('Nb7 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Nb7');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p,
            isKnight: true
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'a',
                    rank: '5'
            }, {
                    file: 'c',
                    rank: '5'
            }, {
                    file: 'd',
                    rank: '6'
            }])
            expect(msg.moves)
                .not.include({
                    file: 'c',
                    rank: '4'
                })
            expect(msg.moves)
                .to.have.lengthOf(8)
            done();
        });
    })
});

describe('Legal squares test', () => {
    it('Na1 legal squares', (done) => {
        seneca.error(done);

        var p = new ChessPiece('Na1');
        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg.moves)
                .to.have.lengthOf(2)
            expect(msg.moves)
                .to.containSubset([{
                    file: 'b',
                    rank: '3'
        }, {
                    file: 'c',
                    rank: '2'
          }])

            expect(msg.moves)
                .not.include({
                    file: 'a',
                    rank: '3'
                });
            done();
        });
    });

    it('Nd4 legal squares', (done) => {
        seneca.error(done);

        var p = new ChessPiece('Nd4');
        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg.moves)
                .to.have.lengthOf(8)
            expect(msg.moves)
                .to.containSubset([{
                    file: 'e',
                    rank: '2'
                }, {
                    file: 'c',
                    rank: '6'
                }])
            expect(msg.moves)
                .not.include({
                    file: 'd',
                    rank: '4'
                });
            done();
        });
    });

});
