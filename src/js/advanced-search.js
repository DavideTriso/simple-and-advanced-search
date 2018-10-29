/* MIT License

Copyright (c) 2018 Davide Trisolini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory();
  } else {
    // Browser globals (root is window) 
    root.advancedSearch = factory();
  }
}(this, function () {

  /** 
    * phraseToArray:
    * Build an array where each entry is a word of the phrase (string) passed as argument to the function
    * @param {string} string
    * @returns {(array|false)} - returns an array of strings if the passed argument is of type string, false otherwise
    */
  function phraseToArray(string) {
    if (typeof string === 'string') {
      return string.trim().split(' ');
    }
    return false;
  }

  /**
     * editDistance:
     * Credit to: https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
     * @param {string} str1 - one of the two strings to compare and check for a match
     * @param {string} str2 - one of the two strings to compare and check for a match
     * @returns {(array|false)} - returns an array of strings if the passed argument is of type string, false otherwise
     */
  function editDistance(str1, str2) {
    str1 = str1.toLowerCase(); //all lowercase
    str2 = str2.toLowerCase(); //all lowercase

    var costs = [];
    for (var i = 0; i <= str1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= str2.length; j++) {
        if (i == 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (str1.charAt(i - 1) != str2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[str2.length] = lastValue;
      }
    }
    return costs[str2.length];
  }

  /**
   * checkSimilarity: check the similarity of two words
   * @param {string} term: the term to check for similarity
   * @param {string} queryString: the query string 
   * @return {float}
   */
  function checkSimilarity(term, queryString) {
    var longer = term,
      shorter = queryString;

    if (term.length < queryString.length) {
      longer = queryString;
      shorter = term;
    }
    var longerLength = longer.length;

    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  /** 
   * AdvancedSearch: Perform an advanced search.
   * @param {array} stringsCollection: an array of strings; each entry can have multiple words and represent an 'article'.
   * 
   * 
  */
  function AdvancedSearch(stringsCollection, queryString, minDistance, minAverageDistance) {
    minDistance = minDistance || 0.4;
    minAverageDistance = minAverageDistance || 0.4;

    var stringsCollectionLenght = stringsCollection.length,
      queryWords = phraseToArray(queryString),
      queryWordsLength = queryWords.length,
      matches = []; // array with indexes of matched strings and match percentages

    //Loop over each entry in stringsCollection array
    for (var i = 0; i < stringsCollectionLenght; i = i + 1) {
      var words = phraseToArray(stringsCollection[i]),
        wordsLength = words.length,
        wordsMatchesCount = 0,
        wordsDistanceSum = 0,
        averageDistance = 0,
        matchedWords = [];

      //Loop over each word of each entry in stringsCollection array
      for (var j = 0; j < wordsLength; j = j + 1) {

        //Loop over each queryWord - word pair and perform match
        for (var k = 0; k < queryWordsLength; k = k + 1) {
          var distance = checkSimilarity(words[j], queryWords[k]);
          if (distance > minDistance) {
            wordsMatchesCount = wordsMatchesCount + 1;
            wordsDistanceSum = wordsDistanceSum + distance;
            matchedWords.push(words[j]);
          }
        }
      }

      //Calculate average distance of all matched words.
      //If average distance is lower than minAverageDistance we do not consider the phrase a match
      averageDistance = wordsMatchesCount > minAverageDistance
        ? wordsDistanceSum / wordsMatchesCount
        : false;

      //Push results to
      if (averageDistance) {
        matches.push({
          index: i,
          averageDistance: averageDistance,
          wordsMatchesCount: wordsMatchesCount,
          wordMatchesPercentage: wordsMatchesCount / queryWordsLength,
          matchedWords: matchedWords
        });
      }
    }
    return matches;
  }
  return AdvancedSearch;
}));
