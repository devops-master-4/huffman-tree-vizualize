/**
		Analyze the given text and count the frequency of each character
		@param {string} text - the text to be analyzed
		@returns {Object} - an object containing the frequency of each character in the text
*/
function analyse(text) {
	var freqs = {};

	for (var i = 0; i < text.length; i++) {
		var ch = text.charAt(i);
		if (!(ch in freqs)) {
			freqs[ch] = 1;
		}
		else {
			freqs[ch] += 1;
		}
	}
	return freqs;
}
/**
		Build a priority queue of characters based on their frequency
		@param {Object} freqs - an object containing the frequency of each character
		@returns {Object} - an object containing tree of each character
		*/
function buildPriorityQueue(freqs) {
	heapReset();
	var trees = {}
	for (var ch in freqs) {
		heapAdd({ "value": ch, "freq": freqs[ch] });
		trees[ch] = { "freq": freqs[ch], "left": null, "right": null };
	}
	return trees;
}
/**
		Build a Huffman tree based on the priority queue
		@param {Object} trees - an object containing tree of each character
		@returns {Object} - an object containing the root of the Huffman tree and the full tree
*/
function buildHuffmanTree(trees) {
	while (heapLength() >= 2) {
		var heapEntry1 = heapGet();
		var heapEntry2 = heapGet();

		var combinedFreq = heapEntry1["freq"] + heapEntry2["freq"];
		var combinedName = heapEntry1["value"] + heapEntry2["value"];

		trees[combinedName] = { "freq": combinedFreq, "left": heapEntry1["value"], "right": heapEntry2["value"] };
		heapAdd({ "value": combinedName, "freq": combinedFreq });
	}

	var lastItem = heapGet();
	return { "root": lastItem["value"], "fullTree": trees };
}
/**
		Encode the given input using Huffman encoding
		@param {string} input - the input to be encoded
		@returns {string} - the encoded string
		*/
function normalEncode(input) {
	var result = "";
	for (var i = 0; i < input.length; i++) {
		var charCode = input.charCodeAt(i);
		result += resolveChar(charCode);
	}
	return result;
}
/**
* Encodes the input string by formatting it with alternating background colors.
* @param {string} input - The input string to be encoded.
* @return {string} - The encoded string with alternating background colors.
*/
function normalEncodeFormatted(input) {
	var result = "";

	var colorIdx = 0;
	var colors = ["#F99", "#99F"];

	for (var i = 0; i < input.length; i++) {
		var charCode = input.charCodeAt(i);
		result += "<span style='background-color:" + colors[colorIdx] + "'>" + resolveChar(charCode) + "</span>";
		colorIdx = (colorIdx + 1) % 2;
	}
	return result;
}

/**
* Encodes the input string using a given tree object.
* @param {object} treeObj - The tree object used to encode the input string.
* @param {string} input - The input string to be encoded.
* @return {string} - The encoded string.
*/

function encode(treeObj, input) {
	var result = "";
	for (var i = 0; i < input.length; i++) {
		var ch = input.charAt(i);
		result += findChar(ch, treeObj);
	}

	return result;
}
/**
* Encodes the input string using a given tree object and formats it with alternating background colors.
* @param {object} treeObj - The tree object used to encode the input string.
* @param {string} input - The input string to be encoded.
* @return {string} - The encoded string with alternating background colors.
*/
function encodeFormatted(treeObj, input) {
	var result = "";

	var colorIdx = 0;
	var colors = ["#F99", "#99F"];

	for (var i = 0; i < input.length; i++) {
		var ch = input.charAt(i);
		result += "<span style='background-color:" + colors[colorIdx] + "'>" + findChar(ch, treeObj) + "</span>";
		colorIdx = (colorIdx + 1) % 2;
	}

	return result;
}
/**
		findChar is a function that takes in two parameters, ch and treeObj.
		The function starts at the root of treeObj and traverses the tree until it finds ch.
		The function returns a string of binary digits representing the path from the root of the tree to the ch.
		If the function does not find ch, it will log an error message.
		@param {string} ch - the character to find in the tree
		@param {object} treeObj - the Huffman tree object
		@returns {string} result - a string of binary digits representing the path from the root of the tree to the ch
		*/
function findChar(ch, treeObj) {
	var result = "";
	var pos = treeObj["root"];
	while (true) {
		if (pos == ch && result == "") {
			// Only happens when there is only one symbol
			return "0";
		}
		if (pos == ch) {
			break;
		}
		var curr = treeObj["fullTree"][pos];
		if (curr["left"] != null && curr["left"].includes(ch)) {
			pos = curr["left"];
			result += "0";
		}
		else if (curr["right"] != null && curr["right"].includes(ch)) {
			pos = curr["right"];
			result += "1";
		}
		else {
			console.log("FATAL ERROR, EVERYTHING BROKE! Tried to look for " + ch + ". Search space: ");
			if (curr["left"] != null) {
				console.log("\t" + curr["left"]);
			}
			if (curr["right"] != null) {
				console.log("\t" + curr["right"]);
			}
			break;
		}
	}
	return result;
}
/**
		resolveChar is a function that takes in one parameter, code.
		The function converts a numerical code into a binary representation of 8 digits.
		@param {number} code - the numerical code to convert
		@returns {string} output - a string of binary digits representing the code
*/
function resolveChar(code) {
	var output = "";
	for (var i = 0; i < 8; i++) {
		var mask = 1 << i;
		if (code & mask) {
			output += "1";
		}
		else {
			output += "0";
		}
	}
	return output;
}
