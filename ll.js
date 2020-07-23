const _Node = require('./node');

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head);
  }

  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let dummyNode = this.head;
      while (dummyNode.next !== null) {
        dummyNode = dummyNode.next;
      }
      dummyNode.next = new _Node(item, null);
    }
  }

  insertBefore(item, target) {
    let currentNode = this.head;
    let previousNode = null;

    while((currentNode !== null) && (currentNode.value !== target)) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    if(currentNode === null) {
      console.log('Target not found.');
      return;
    }

    previousNode.next = new _Node(item, currentNode);
  }

  insertAfter(item, target) {
    let currentNode = this.head;
    let nextNode = this.head;

    while((currentNode !== null) && (currentNode.value !== target)) {
      currentNode = currentNode.next;
      nextNode = currentNode.next;
    }

    if(currentNode === null) {
      console.log('Target not found.');
      return;
    }

    currentNode.next = new _Node(item, nextNode);
  }

  insertAt(item, index) {
    let currentNode = this.head;
    let previousNode = null;

    for(let i = 0; i < index; i++) {
      if(currentNode === null) {
        console.log('Invalid index');
        return;
      }

      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    previousNode.next = new _Node(item, currentNode);
        
  }

  find(item) {
    // let currentNode = this.head;
    // if(this.head === null) {
    //     return null;
    // }
    // while(currentNode.next !== null) {
    //     if(currentNode.value === item) {
    //         return currentNode;
    //     }
    //     currentNode = currentNode.next;
    // }
    // return null;


    // Start at the head
    let currNode = this.head;
    // If the list is empty
    if (!this.head) {
      return null;
    }
    // Check for the item 
    while (currNode.value !== item) {
      /* Return null if it's the end of the list 
               and the item is not on the list */
      if (currNode.next === null) {
        return null;
      }
      else {
        // Otherwise, keep looking 
        currNode = currNode.next;
      }
    }
    // Found it
    return currNode;
  }

  remove(item) {
    // if (!this.head) {
    //     return null;
    // }

    // if (this.head.value === item) {
    //     this.head = this.head.next;
    //     return;
    // }

    // let currentNode = this.head;
    // let previousNode = this.head;

    // while(currentNode.value !== item) {
    //     if(currentNode === null) {
    //         return;
    //     } else {
    //         previousNode = currentNode
    //         currentNode = currentNode.next;
    //     }
    // }
    // return previousNode.next = currentNode.next;

    // If the list is empty
    if (!this.head) {
      return null;
    }
    // If the node to be removed is head, make the next node head
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }
    // Start at the head
    let currNode = this.head;
    // Keep track of previous
    let previousNode = this.head;

    while ((currNode !== null) && (currNode.value !== item)) {
      // Save the previous node 
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }

  display() {
    if(!this.head){
      console.log('List is empty');
    }

    let currentNode = this.head;

    while(currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }

  size() {
    if(!this.head){
      return 0;
    }

    let currentNode = this.head;
    let size = 0;

    while(currentNode !== null) {
      size++;
      currentNode = currentNode.next;
    }

    return size;
  }

  isEmpty() {
    if(!this.head) {
      return true;
    }
    return false;
  }

  findPrevious(item) {
    let currentNode = this.head;
    let previousNode = null;

    while((currentNode !== null) && (currentNode.value !== item)) {
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

    if(currentNode === null) {
      console.log('Target not found.');
      return null;
    }

    return previousNode;
  }

  findLast() {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;

    while(currentNode.next !== null) {
      currentNode = currentNode.next;
    }
        
    return currentNode;
  }

  reverse() {
    let prevNode = null;
    let currNode = this.head;
    let nextNode = null;

    while(currNode !== null) {
      nextNode = currNode.next;
      currNode.next = prevNode;
      prevNode = currNode;
      currNode = nextNode;
    }

    this.head = prevNode;
  }

  thirdToLast() {
    let currNode = this.findLast();
    for(let i = 0; i < 2; i++ ) {
      currNode = this.findPrevious(currNode.value);
    }

    return currNode;
  }

  middleOfList() {
    let slowNode = this.head;
    let fastNode = this.head;
    let lastNode = this.findLast();

    while(fastNode !== null || fastNode !== lastNode) {

      if(fastNode.next.next === null){
        return slowNode;
      }
      slowNode = slowNode.next;
      fastNode = fastNode.next.next;
            
    }

    return slowNode;
  }

  createCycle() {
    let lastNode = this.findLast();
    let prevNode = this.findPrevious(lastNode.value);
    lastNode.next = prevNode;
  }

  cycleList() {
    let currNode = this.head;
    let nextNode = null;

    while(currNode !== null) {
      nextNode = currNode.next;
      if(nextNode.next.value === currNode.value) {
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }


  // head - next
  // 1. split in half
  // 2. sort each half L/R
  // 3. merge the sorted halves

  //middle of list -> .next = null next = new head

  //merge (left, right, array)
  // let leftIndex = 0;
  // let rightIndex = 0;
  // need to set the smallest value to the head and then the next
  // to whatever is next smallest, etc
  /**
   * while(leftIndex)
   */










  // mergeSort(list) {
  //   console.log('list', list);
  //   if (list.next === null) {
  //     return list;
  //   }

  //   let count = 0;
  //   let countList = list;
  //   console.log('count list', countList);
  //   console.log('count list next', countList.next);
  //   let leftPart = list;
  //   let leftPtr = list;
  //   let rightPart = null;
  //   let rightPtr = null;

  //   while(countList.next !== null) {
  //     count++;
  //     countList = countList.next;
  //   }

  //   let mid = Math.floor(count / 2);
  //   let count2 = 0;

  //   while(count2 < mid) {
  //     count2++;
  //     leftPtr = leftPtr.next;
  //   }
  //   rightPart = new LinkedList(leftPtr.next);
  //   leftPtr.next = null;

  //   return this._mergeSort(this.mergeSort(leftPart), this.mergeSort(rightPart.head));
  // }

  // _mergeSort(left, right) {
  //   let result = new LinkedList();

  //   let resultPointer = result.head;
  //   let pointerLeft = left;
  //   let pointerRight = right;

  //   while (pointerLeft && pointerRight) {
  //     let tempNode = null;

  //     if (pointerLeft.node > pointerRight.node) {
  //       tempNode = pointerRight.node;
  //       pointerRight = pointerRight.next;
  //     }
  //     else {
  //       tempNode = pointerLeft.node;
  //       pointerLeft = pointerLeft.next;
  //     }

  //     if (result.head == null) {
  //       result.head = new _Node(tempNode);
  //       resultPointer = result.head;
  //     }
  //     else {
  //       resultPointer.next = new Node(tempNode);
  //       resultPointer = resultPointer.next;
  //     }
  //   }
  //   resultPointer.next = pointerLeft;
  //   while(resultPointer.next) {
  //     resultPointer = resultPointer.next;
  //     resultPointer.next = pointerRight;
  //   }
  //   return result.head;
  // }
}

module.exports = LinkedList;