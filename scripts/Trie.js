
import Node from '../scripts/Node'

export default class Trie {
  constructor() {
    this.root = new Node();
    this.wordCount = 0;
    this.suggestedWord = [];
  }

  insert (string) {
    let wordArray = [...string]
    let currentNode = this.root;
    let wordCheck = [];
    let letter = wordArray.shift();

    wordCheck.push(letter)

    while (letter) {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }

      currentNode = currentNode.children[letter];
      letter = wordArray.shift()

      wordCheck.push(letter)

    }

    if (!currentNode.isCompleteWord) {
      currentNode.isCompleteWord = true;
      this.wordCount++;
    }
  }

  count() {
    // this.wordCount++;
    return this.wordCount;
  }

  findNode (string) {
    let wordArray = [...string]
    let currentNode = this.root;
    let letter = wordArray.shift();

    while (letter && currentNode.children[letter]) {

      currentNode = currentNode.children[letter];

      letter = wordArray.shift();
    }

    return currentNode;
  }

  suggest(string) {
    this.suggestedWord = [];

    string = string.toLowerCase();

    let currentNode = this.findNode(string);

    this.suggDriller(currentNode, string, this.suggestedWord)
  
    return this.suggestedWord.sort(function (a, b) {
      return b.frequency - a.frequency
    }).map((suggestion) => suggestion.name)

  }

  suggDriller (currentNode, string) {
    if (currentNode.isCompleteWord) {

      this.suggestedWord.push({name: string, frequency: currentNode.frequency})

    }

    let currentKeys = Object.keys(currentNode.children);

    currentKeys.forEach((item) => {

      let childKey = string + item;

      this.suggDriller(currentNode.children[item], childKey, this.suggestedWord)
    })

  }

  populate (dictionary) {
    dictionary.forEach((word) => {
      this.insert(word);
    })
  }

  select(string) {

    let currentNode = this.findNode(string);

    if (currentNode.isCompleteWord) {
      currentNode.frequency++
    }
  }
}
