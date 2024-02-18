const { Markov } = require('./markov');
const { fnMap, run } = require('./makeText');
const fs = require('fs');
const axios = require('axios');

describe('MarkovMachine class tests', function () {

    let mm;

    beforeEach(() => {
        mm = new Markov("the cat in the hat in the hat");
    });

    test('this.words is created correctly', function () {

        expect(mm.words).toEqual(['the', 'cat', 'in', 'the', 'hat', 'in', 'the', 'hat'])
    });

    test('this.chains is created correctly', function () {
        let expectedChain = {
            'the': ['cat', 'hat', 'hat'],
            'cat': ['in'],
            'in': ['the', 'the'],
            'hat': ['in', null]
        }
        expect(mm.chains).toEqual(expectedChain)
    });

    test('makeText output', function () {
        const text = mm.makeText();
        expect(typeof text).toEqual('string');
    });
})


