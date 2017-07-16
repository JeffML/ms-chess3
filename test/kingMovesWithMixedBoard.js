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

describe('King moves with foes test', () => {
    it('K in check test', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Ke1', 'Pe3', 'Nd4', 'Bd2', 'Bf1'],
            black: ['Kg5', 'Qh4']
        })
        var king = board.pieceAt('e1');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: king,
            board: board
        }, (err, msg) => {
            // console.log({
            //     moves: msg.moves
            // })
            expect(err)
                .to.be.null;
            expect(msg.moves)
                .to.have.lengthOf(2)
            expect(msg.moves)
                .to.deep.have.same.members([
                    {
                        file: 'e',
                        rank: '2'
                    }, {
                        file: 'd',
                        rank: '1'
                    }
                ])
            expect(king.inCheck)
                .to.be.true
            done();
        });
    });

    it('K in checkmate test', (done) => {
        seneca.error(done);

        var board = new Board({
            white: ['Kh1', 'Ph2', 'Ng1', 'Pg2'],
            black: ['Ke1', 'Nf2']
        })
        var king = board.pieceAt('h1');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: king,
            board: board
        }, (err, msg) => {
            // console.log({
            //     moves: msg.moves
            // })
            expect(err)
                .to.be.null;
            expect(msg.moves)
                .to.have.lengthOf(0)
            expect(king.checkMated)
                .to.be.true
            done();
        });
    });
});
