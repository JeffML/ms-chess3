"use strict";

const Board = require('../Board');

const movement = require('../services/Movement');
const specialMovement = require('../services/SpecialMovement')
const squaresControl = require('../services/squareControl')

const seneca = require('seneca')({
        log: 'silent'
    })
    .use(movement)
    .use(specialMovement)
    .use(squaresControl)

const chaiSubset = require('chai-subset');
const expect = require('chai')
    .use(chaiSubset)
    .expect;

describe('controlled by, Board 1', () => {

    var board = new Board({
        white: ['Kf6', 'Pf7'],
        black: ['Kf3', 'Ne3', 'Bg3']
    })

    it('White controlled', (done) => {
        seneca.error(done);

        seneca.act({
            role: "board",
            cmd: "squaresControlledBy",
            board: board,
            color: 'white'
        }, (err, msg) => {
            expect(err)
                .to.be.null;
            expect(msg.controlled)
                .to.deep.equal( [{ 
                    file:   'e',
                     rank:   '6' 
                },       { 
                    file:   'g',
                     rank:   '6' 
                },       { 
                    file:   'f',
                     rank:   '5' 
                },       { 
                    file:   'e',
                     rank:   '5' 
                },       { 
                    file:   'g',
                     rank:   '7' 
                },       { 
                    file:   'e',
                     rank:   '7' 
                },       { 
                    file:   'g',
                     rank:   '5' 
                },       { 
                    file:   'f',
                     rank:   '8' 
                }] );

            done();
        });
    });

    it('Black controlled', (done) => {
        seneca.error(done);

        seneca.act({
            role: "board",
            cmd: "squaresControlledBy",
            board: board,
            color: 'black'
        }, (err, msg) => {
            console.log(msg.controlled)
            expect(err)
                .to.be.null;
            expect(msg.controlled)
                .to.deep.equal([{
                        file: 'f',
                        rank: '4'
                    },
                    {
                        file: 'f',
                        rank: '2'
                    },
                    {
                        file: 'e',
                        rank: '2'
                    },
                    {
                        file: 'g',
                        rank: '4'
                    },
                    {
                        file: 'e',
                        rank: '4'
                    },
                    {
                        file: 'g',
                        rank: '2'
                    },
                    {
                        file: 'c',
                        rank: '2'
                    },
                    {
                        file: 'd',
                        rank: '1'
                    },
                    {
                        file: 'c',
                        rank: '4'
                    },
                    {
                        file: 'f',
                        rank: '1'
                    },
                    {
                        file: 'd',
                        rank: '5'
                    },
                    {
                        file: 'f',
                        rank: '5'
                    },
                    {
                        file: 'e',
                        rank: '1'
                    },
                    {
                        file: 'h',
                        rank: '4'
                    },
                    {
                        file: 'e',
                        rank: '5'
                    },
                    {
                        file: 'd',
                        rank: '6'
                    },
                    {
                        file: 'c',
                        rank: '7'
                    },
                    {
                        file: 'b',
                        rank: '8'
                    },
                    {
                        file: 'h',
                        rank: '2'
                    }]);

            done();
        });
    });
})
