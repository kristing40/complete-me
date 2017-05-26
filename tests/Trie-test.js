import { expect } from 'chai'
import Trie from "../scripts/Trie"
import fs  from 'fs'

const text = "/usr/share/dict/words"
let dictionary = fs.readFileSync(text).toString().trim().split('\n')

let trie;

beforeEach (() => {
  trie = new Trie();
})

describe('Trie should be a function', () => {
  it('should be a function', () => {

    expect(trie).to.be.function;
  })

  it('should be able to insert a new letter', () => {
    trie.insert('w');

    expect(trie.root.children.w.letter).to.equal('w');
  })

  it('should be able to insert a new word', () => {
    trie.insert('who');

    expect(trie.root.children.w.letter).to.equal('w');
    expect(trie.root.children.w.children.h.letter).to.equal('h');
    expect(trie.root.children.w.children.h.children.o.letter).to.equal('o');
  })

  it('should be able to tell if a word is completed', () => {
    trie.insert('hello');

    expect(trie.root.children.h.children.e.children.l.children.l.children.o.isCompleteWord).to.equal(true)
  })

  it('should be able to find a word', () => {
    trie.insert('happy');

    expect(trie.findNode('happy').letter).to.equal('y')
  })

  it('should be able to make suggestions', () => {

    dictionary.forEach((word) => {
      trie.insert(word);
    })

    let suggestions = trie.suggest('pizz')

    console.log(suggestions)
    expect(suggestions).to.deep.equal([ 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ])
  })

  it('should be able to make suggestions', () => {

    dictionary.forEach((word) => {
      trie.insert(word);
    })

    let suggestions = trie.suggest('pizz')

    expect(suggestions).to.deep.equal([ 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ])

    trie.select('pizzicato')

    suggestions = trie.suggest('pizz')

    expect(suggestions).to.deep.equal([ 'pizzicato', 'pizza', 'pizzeria', 'pizzle' ])
  })

  it('should be able to count number of words', () => {
    expect(trie.count()).to.equal(0);

    trie.insert('pint');
    trie.insert('pin');
    trie.insert('pinnacle');
    trie.insert('pine');

    expect(trie.count()).to.equal(4)
  })

  it('should populate dictionary with word', () => {
    trie.populate(dictionary);
    let count = trie.count();

    expect(count).to.equal(235886);
  })

  it('should move selected word to front of suggested array', () => {

    trie.insert('pint');
    trie.insert('pin');
    trie.insert('pinnacle');
    trie.insert('pine');

    expect(trie.suggest('pi')).to.deep.equal(['pin', 'pint', 'pinnacle', 'pine'])
  })

  it('Should select a word from the suggest array and then return an array with the selected word first, if the same suggest is called', () => {

    trie.insert('dam');
    trie.insert('damp');
    trie.insert('damage');
    trie.insert('damaged');

    expect(trie.suggest('da')).to.deep.equal(['dam', 'damp', 'damage', 'damaged'])

    trie.select('damage');

    expect(trie.suggest('da')).to.deep.equal(['damage', 'dam', 'damp', 'damaged' ])
  })

  it('should add word to sorted array', () => {
    trie.insert('pine')
    trie.select('pine')


    expect(trie.root
      .children.p
      .children.i
      .children.n
      .children.e.frequency).to.deep.equal(1);
  })

  it('should update frequency', () => {
    trie.insert('hi')
    trie.select('hi')

    expect(trie.root
      .children.h
      .children.i
      .frequency).to.equal(1);
  })
})
