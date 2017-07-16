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
        var p = board.pieceAt('e1');

        seneca.act({
            role: "movement",
            cmd: "legalMoves",
            piece: p,
            board: board
        }, (err, msg) => {
            console.log({
                moves: msg.moves
            })
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
            //expect(msg.mustMove).to.be.true
            done();
        });
    });
});
