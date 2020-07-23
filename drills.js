const LinkedList = require('./ll.js');

// 1. Understanding Merge Sort

// 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
// Length: 16

//1.1) After 3 recursive calls to mergeSort
// 21, 1 || 26, 45 || 29, 28  2, 9 |<-L R->| 16, 49, 39, 27, 43, 34, 46, 40

//1.2) After 16 Recursive calls
//21 || 1 || 26 || 45 || 29 || 28 || 2 || 9 |<-L R->| 16 || 49 || 39 || 27 || 43 || 34 || 46 || 40

//1.3) First 2 lists to merge
// 1, 21

//1.4) which 2 lists on 7th merge
// 34, 43 

// L 21, 1, 26, 45, 29, 28, 2, 9 
// R 16, 49, 39, 27, 43, 34, 46, 40
// Length: 8 x2
// L 21, 1, 26, 45 || 29, 28, 2, 9
// R 16, 49, 39, 27 || 43, 34, 46, 40
// Length: 4 x 4
// L 21, 1 || 26, 45 || 29, 28 || 2, 9
// R  16, 49 || 39, 27 || 43, 34 || 46, 40
// Length: 2 x 8
// L 21 || 1 || 26 || 45 || 29 || 28 || 2 || 9
// R 16 || 49 || 39 || 27 || 43 || 34 || 46 || 40
// Length: 1 x 16
// L 1, 21 || 26, 45 || 28, 29 || 2, 9
// R 16, 49 || 27, 39 || 34, 43 || 40, 46
// Length: 2 x 8
// L 1, 21, 26, 45 || 2, 9 , 28, 29
// R 16, 27, 39, 49 || 34, 40, 43, 46
// Length: 4 x 4
// L 1, 2, 9, 21, 26, 28, 29, 45
// R 16, 27, 34, 39, 40, 43, 46, 49
// Length: 8 x 2
// 1, 2, 9, 16, 21, 26, 27, 29, 34, 39, 40, 43, 45, 46, 49

//2. Understanding Quicksort

// 3, 9, 1, 14, 17, 24, 22, 20 (first partition)
//2.1) Either 14 or 17. All numbers to the left are smaller than either 14
// or 17, and larger to the right

// 14, 17, 13, 15, 19, 10, 3, 16, 9, 12
//FROM FIRST
// L 13, 10, 3, 9, 12, 14
// R 17, 15, 19, 16
//L - L: 10, 3, 9, 12, 13
//L - R: 14

//Left side gets completely sorted,
// THEN
//Right side gets completely sorted,
//And then they meet in the middle <3

//FROM LAST
//L 10, 3, 9
//R 12, 14, 17, 13, 15, 19, 16
//L - L: 3
//L - R: 9, 10

//R -L: 12, 14, 15
//R- R: 16, 17, 19

// 10, 3, 9, 12, 19, 14, 17, 16, 13, 15
// 10, 3, 9, 12, 14, 13, 15, 16, 19, 17
// 10, 3, 9, 12, 14, 13, 15, 16, 19, 17

// 13, 10, 3, 9, 12, 14, 17, 15, 19, 16
// 10, 3, 9, 12, 13, 14, 17, 15, 19, 16

//Show Second Partioning
//2.2) Last item: 
//L - L: 3
//L - R: 9, 10

// First item: 
//L - L: 10, 3, 9, 12, 13
//L - R: 14

//3 Implementing Quicksort

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j]= tmp;
}

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if(array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
}

// console.log(qSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

//4. Implementing merge sort

function mSort(array) {
  if (array.length <= 1) {
    return array;
  }
  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mSort(left);
  right = mSort(right);
  return merge(left, right, array);
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }
  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

//console.log(mSort([89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]));

//5. Sorting a linked list using merge sort

