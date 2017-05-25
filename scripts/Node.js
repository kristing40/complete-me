export default class Node {
  constructor(letter = null, isCompleteWord = false, frequency = 0, children = {}) {
    this.letter = letter;
    this.isCompleteWord = isCompleteWord;
    this.frequency = frequency;
    this.children = children;

  }
}
