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

  it('should be able to insert a new letter into the dictionary', () => {
    trie.insert('w');

    expect(trie.root.children.w.letter).to.equal('w');
  })

  it('should be able to insert a new word into the dictionary', () => {
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

    expect(trie.findNode('hapyyy')).to.equal('Node does not exist')
  })

  it('should be able to make suggestions', () => {

    // dictionary.forEach((word) => {
    //   trie.insert(word);
    // })
    trie.insert('pint');
    trie.insert('pin');
    trie.insert('pinnacle');
    trie.insert('pine');
    trie.insert('prone');
    trie.insert('ponder');
    trie.insert('ponderosa')
    trie.insert('pony');
    trie.insert('positive');
  //  trie.select('positive');
  //   trie.select('pine');
    let suggestions = trie.suggest('po')

    console.log(suggestions )
  })

  it('should be able to count number of words', () => {
    expect(trie.count()).to.equal(0);

    trie.insert('pint');
    trie.insert('pin');
    trie.insert('pinnacle');
    trie.insert('pine');


    expect(trie.count()).to.equal(5)
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

    let suggestion = trie.suggest('pi');

    expect(suggestion).to.deep.equal(['pint', 'pin', 'pinnacle', 'pine'])
  })

  it('should add word to sorted array', () => {
    trie.insert('pine')
    trie.select('pine')

    console.log(trie.root.children)

    expect(trie.root
      .children.p
      .children.i
      .children.n
      .children.e.frequency).to.deep.equal(1);

  })
})
