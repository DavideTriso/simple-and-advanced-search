# SIMPLE AND ADVANCED SEARCH

Filter arrays of strings by matching a query string on the client.
Useful for combo-box widgets and similar.

## Dependencies

**No dependencies**

## SIMPLE SEARCH

Simple search performs a simple search by matching exactly the passed query string (case-insensitive).


### Arguments:

* **stringsCollection** (type: array): the set of strings to search for a match.
* **queryString** (type: string): the query string.


### Output:

The function returns an array with the indexes of the matched strings (position of the item in the stringsCollection array).


### Usage example:

```javascript

var stringsCollection = ['string1', 'string2', 'string3'], //the set of string to search for a match
  queryString = 'string2'; //the query string

var searchResult = simpleSearch(stringsCollection, queryString); //search ...

console.log(searchResult); // output: [1]

```


## ADVANCED SEARCH

Advanced search performs an advanced search by calculating the Levenshtein distance for each pair of query string word and word of the strings to search (case-insensitive).


### Arguments:

* **stringsCollection** (type: array): the set of strings to search for a match.
* **queryString** (type: string): the query string.
* **minDistance** (type: float > 0 and < 1): the minimum Levenshtein distance for a word pair to be considered as a match. 
* **minAverageDistance** (type: float > 0 and < 1): the minimum average Levenshtein distance of the matched words for the string to be considered as a match.


### Output

The function returns an array of objects containing the indexes of the matched strings and other useful informations about the match.

* **index**: the index of the matched string (position of the item in the stringsCollection array).
* **wordMatchesCount**: the number of matched words.
* **averageDistance**: the sum of the matched word's distances divided by the number of matched words.
* **wordMatchesPercentage**: the number of matched words divided by the number of words of the query string.
* **matchedWords**: an array containing the matched words.


### Usage example:

```javascript

var stringsCollection = ['string1', 'string2', 'string3'], //the set of string to search for a match
  queryString = 'sring2'; //the query string

var searchResult = advancedSearch(stringsCollection, queryString, 0.7, 0.7); //search ...

console.log(searchResult); //output: {index: 2, wordMatchesCount: 1, averageDistance: 0.XXX, wordMatchesPercentage: 0.XXX, matchedWords: ['string2']}

```

## DEMOS

Open the **simle-search/demo.html** and **advanced-search/demo.html** files in the browser and check the console for a real-world demo.


## EXECUTION TIME


* MacBook Pro 15" 2016, **2.5 GHz Intel Core i7**, 16GB 1600 MHz DDR3.
* Chrome version 60.0.3112.113 (Official Build) (64-bit)
* Items in array: 65592 (names of cities).
* Query string: 'bolzano'.



CUP Throttling | Simple search execution time | Advanced search execution time
---------------|------------------------------|---------------------------------
No throttling | > 10 ms | > 140 ms
5x slowdown | > 50 ms | > 820 ms
20x slowdown | > 190 ms | > 3200 ms

## LICENSE

**Simple and Advanced search** is licensed under the terms of the **MIT license**.

See [LICENSE.md](LICENSE.md) for detailed informations.