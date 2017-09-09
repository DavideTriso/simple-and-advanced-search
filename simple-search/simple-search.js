/*
MIT License

Copyright (c) 2017 Davide Trisolini

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function (root, factory) {
  var pluginName = 'simpleSearch';

  if (typeof define === 'function' && define.amd) {
    define([], factory(pluginName));
  } else {
    root[pluginName] = factory(pluginName);
  }
}(this, function (pluginName) {
  /*
   * Perform a simple search by matching exactly the string passed from user.
   * The function uses the javascript search() method to filter results from the array of values passed
   * and returns an array with the indexes of the maches, or false when no macht is found
   */
  function performSimpleSearch(stringsCollection, queryString) {
    var stringsCollectionLength = stringsCollection.length,
      matches = [],
      regex = new RegExp(queryString, 'gi');

    for (var i = 0; i < stringsCollectionLength; i = i + 1) {
      if (stringsCollection[i].search(regex) >= 0) {
        matches.push(i);
      }
    }

    return matches.length > 0 ? matches : false;
  }


  return performSimpleSearch;
}));