# web

Some utilities and helpers I find useful.

### `index.html`

The simplest boilerplate to start with.

### `css/reset.css`

A bare-bones CSS reset.

### `js/dom.js`

Simple DOM utilities, including a couple of things I miss from jQuery and some polyfills.

* `dom.html(name, [attributes], [children])` Create an HTML element of type `name` and optionally set attributes using the `attributes` object as a source of key/value pairs, and optionally add child nodes where `children` can be a string (text node), an element, or an array of strings and/or elements.
* `dom.svg(name, [attributes], [children])` Like `html()` but in the SVG namespace.
* `dom.elemToObj(elem)` convert a DOM element to an object suitable for JSON serialization.
* `dom.remove(elem)` a shorthand function for removing an element
* `dom.insertAfter(elem)` the missing DOM method
* `dom.closest(elem, selector)` one of the most useful jQuery methods that isn't in the DOM, finds the nearest ancestor (including `elem`) which matches the selector
* `dom.find([elem], selector)` returns the first decendant element that matches selector. If `elem` isn't given, defaults to `document.body`.
* `dom.findAll([elem], selector)` returns all decendant elements that match selector as an array. If `elem` isn't given, defaults to `document.body`.
* `dom.matches(elem, selector)` returns true if `elem` matches selector. This just removes the namespace from a method that exists in modern browsers.
* `dom.addClass(elem, className)` conditionally adds a class if `elem` exists.
* `dom.removeClass(elem, className)` conditionally removes a class if `elem` exists.
* `dom.nextSibling(elem)` conditionally returns the next sibling element if `elem` exists.
* `dom.prevSibling(elem)` conditionally returns the previous sibling element if `elem` exists.
* `dom.toggleClass(elements)` `elements` can be a single element or array of elements, toggles the specified class on each.
* `dom.indexOf(elem)` returns the index of the given element in the array of the parent's child elements.

### `channel.js`

* `channel.on(channelName, elem)` registers element to receive updates on channelName.
* `channel.off(channelName, elem)` unregisters element to receive updates on channelName.
* `channel.once(channelName, elem)` registers element to recieve a one-time update on channelName.
* `channel.emit(channelName, data)` sends an arbitrary data object to every element listening on channelName. Each listener that has an `onChannel(channelName, data)` method will have it called with those arguments.
* `channel.emitAsync(channelName, data)` sends an arbitrary data object to every element listening on channelName, but doesn't wait until they process it. Each listener's `onChannel` method will be called as above.


