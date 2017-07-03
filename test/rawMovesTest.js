"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var movement = require('../services/Movement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(movement);

const chaiSubset = require('chai-subset');
const expect = require('chai')
    .use(chaiSubset)
    .expect;

describe('Raw moves test', () => {
    it('Ba1 raw moves', function (done) {
        seneca.error(done)

        var Ba1 = new ChessPiece('Ba1');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: Ba1
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'b',
                    rank: '2'
            }, {
                    file: 'h',
                    rank: '8'
            }])
            expect(msg.moves)
                .not.include({
                    file: 'a',
                    rank: '1'
                })
            expect(msg.moves)
                .to.have.length.above(7)
            done();
        });
    });

    it('Rd4 raw moves', function (done) {
        seneca.error(done)

        var Rd4 = new ChessPiece('Rd4');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: Rd4
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'd',
                    rank: '2'
            }, {
                    file: 'd',
                    rank: '8'
            }])
            expect(msg.moves)
                .not.include({
                    file: 'd',
                    rank: '4'
                })
            expect(msg.moves)
                .to.have.length.above(14)
            done();
        });
    });

    it('Qb7 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Qb7');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p
        }, (err, msg) => {
            debugger;
            expect(msg.moves)
                .to.containSubset([{
                    file: 'b',
                    rank: '3'
            }, {
                    file: 'd',
                    rank: '5'
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
                .to.have.length.above(14)
            done();
        });
    })

    it('Kb7 raw moves', function (done) {
        seneca.error(done)

        var p = new ChessPiece('Kb7');
        seneca.act({
            role: "movement",
            cmd: "rawMoves",
            piece: p
        }, (err, msg) => {
            expect(msg.moves)
                .to.containSubset([{
                    file: 'b',
                    rank: '8'
                        }, {
                    file: 'a',
                    rank: '7'
                        }, {
                    file: 'c',
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
