"use strict";

var ChessPiece = require('../ChessPiece')
    .ChessPiece

var movement = require('../services/Movement')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(movement);

var expect = require('chai')
    .expect;

describe('Legal moves test', () => {
    it('Ba1 legal moves', (done) => {
        seneca.error(done);

        var Ba1 = new ChessPiece('Ba1');
        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: Ba1
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(7)
            expect(msg)
                .to.include({
                    file: 'b',
                    rank: '2'
                });
            expect(msg)
                .to.include({
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

    it('Rd4 legal moves', (done) => {
        seneca.error(done);

        var p = new ChessPiece('Rd4');
        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p
        }, (err, msg) => {
            // console.log("Rd4", {
            //     msg
            // })
            expect(err)
                .to.be.null;
            expect(msg)
                .to.have.lengthOf(14)
            expect(msg)
                .to.include({
                    file: 'd',
                    rank: '2'
                });
            expect(msg)
                .to.include({
                    file: 'h',
                    rank: '4'
                })
            expect(msg)
                .not.include({
                    file: 'e',
                    rank: '5'
                });
            done();
        });
    });
});
