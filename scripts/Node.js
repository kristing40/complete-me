export default class Node {
  constructor(letter = null, isCompleteWord = false, children = {}) {
    this.letter = letter;
    this.isCompleteWord = isCompleteWord;
    this.children = children;
  }
}
