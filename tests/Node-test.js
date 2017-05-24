import { expect } from 'chai'
import Node from "../scripts/Node"

let node;

beforeEach (() => {


  node = new Node();
})

describe('Node should be a function', () => {
  it('should be a function', () => {
    expect(Node).to.be.function;
  })

  it('should be an object', () => {
    expect(Node).to.be.instanceOf;
  })

})
