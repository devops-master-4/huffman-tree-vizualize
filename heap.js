/**
 * An array-based min heap implementation
 * @type {Array}
 */
var heap = [false]; // take up first space in array

/**
 * Resets the heap to an empty state
 */
function heapReset() {
	heap = [false];
}

/**
 * Adds an item to the heap
 * @param {Any} item - The item to be added to the heap
 */
function heapAdd(item) {
	heap.push(item);
	siftUp(heap.length - 1);
}

/**
 * Gets the minimum item from the heap
 * @return {Any} The minimum item from the heap
 */
function heapGet() {
	if (heap.length == 1) {
		return false;
	}
	if (heap.length == 2) {
		var result = heap[1];
		heap = [false];
		return result;
	}

	var result = heap[1];
	heap[1] = heap.pop();
	siftDown(1);
	return result;
}

/**
 * Prints the heap to the console in a tree format
 */
function heapDump() {
	var output = "";
	var breakPoint = 1;
	var count = 0;
	for (var i = 1; i < heap.length; i++) {
		output += heap[i]["freq"] + "\t";
		count++;
		if (count == breakPoint) {
			output += "\n";
			count = 0;
			breakPoint *= 2;
		}
	}
	console.log(output);
}

/**
 * Gets the length of the heap
 * @return {Number} The length of the heap
 */
function heapLength() {
	return heap.length - 1;
}

/**
 * Sifts an item up the heap to maintain the heap property
 * @param {Number} idx - The index of the item to sift up
 */
function siftUp(idx) {
	while (true) {
		if (getParent(idx) == -1) break;
		var parentIdx = getParent(idx);
		if (heap[idx]["freq"] < heap[parentIdx]["freq"]) {
			swap(idx, parentIdx);
			idx = parentIdx;
		}
		else {
			break;
		}
	}
}
/**
	*  @function siftDown
	*  @param {number} idx - The index of the element to be sifted down in the heap
	*  Sifts down an element in the heap. While the element has children, compares the frequency of the children to the frequency of the element, and swaps the element with the child with the lowest frequency, until it reaches its correct position in the heap.
 */

function siftDown(idx) {
	while (true) {
		var curr = heap[idx];
		var leftIdx = getLeftChild(idx);
		var rightIdx = getRightChild(idx);
		var leftObj = leftIdx == -1 ? null : heap[leftIdx];
		var rightObj = rightIdx == -1 ? null : heap[rightIdx];

		if (leftIdx == -1 && rightIdx == -1) {
			break;
		}
		else if (rightIdx == -1) {
			if (leftObj["freq"] < curr["freq"]) {
				swap(idx, leftIdx);
				idx = leftIdx;
			}
			else {
				break;
			}
		}
		else if (leftIdx == -1) {
			if (rightObj["freq"] < curr["freq"]) {
				swap(idx, rightIdx);
				idx = rightIdx;
			}
			else {
				break;
			}
		}
		else if (leftObj["freq"] < rightObj["freq"] && leftObj["freq"] < curr["freq"]) {
			swap(idx, leftIdx);
			idx = leftIdx;
		}
		else if (rightObj["freq"] < leftObj["freq"] && rightObj["freq"] < curr["freq"]) {
			swap(idx, rightIdx);
			idx = rightIdx;
		}
		else if (leftObj["freq"] == rightObj["freq"] && leftObj["freq"] < curr["freq"]) {
			swap(idx, leftIdx);
			idx = leftIdx;
		}
		else {
			break;
		}
	}
}


function getParent(idx) {
	if (idx == 1) return -1;
	return parseInt(idx / 2);
}
function getLeftChild(idx) {
	if (2 * idx >= heap.length) return -1;
	return 2 * idx;
}
function getRightChild(idx) {
	if ((2 * idx) + 1 >= heap.length) return -1;
	return (2 * idx) + 1;
}
function swap(idx1, idx2) {
	var temp = heap[idx1];
	heap[idx1] = heap[idx2];
	heap[idx2] = temp;
}
