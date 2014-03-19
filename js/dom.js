(function(xtag){
'use strict';

    var SVG_NS = 'http://www.w3.org/2000/svg';
    
    function html(name, attributes, children){
        return element(document.createElement(name), attributes, children);
    }

    function element(elem, attributes /* optional object */, children /* optional array, node, or string */){
        if (!children && attributes && (Array.isArray(attributes) || 
                           attributes.nodeName || 
                           typeof attributes === 'string')){
            children = attributes;
            attributes = null;
        }
        if (attributes){
            setAttributes(elem, attributes);
        }
        if (children){
            appendChildren(elem, children);
        }
        return elem;
    }

    function svg(name, attrs, children){
        return element(document.createElementNS(SVG_NS, name), attrs, children);
    }

    function setAttributes(elem, attributes){
        // keys must be strings
        // values can be strings, numbers, booleans, or functions
        if (attributes){
            Object.keys(attributes).forEach(function(key){
                if (attributes[key] === null || attributes[key] === undefined) return;
                if (typeof attributes[key] === 'function'){
                    var val = attributes[key](key, attributes);
                    if (val){
                        elem.setAttribute(key, val);
                    }
                }else{
                    elem.setAttribute(key, attributes[key]);
                }             
            });
        }
        return elem; // for chaining
    }

    function appendChildren(elem, children){
        // Children can be a single child or an array
        // Each child can be a string or a node
        if (children){
            if (!Array.isArray(children)){
                children = [children]; // convenience, allow a single argument vs. an array of one
            }
            children.forEach(function(child){
                if (child.nodeName){
                    elem.appendChild(child);
                }else{
                    // assumes child is a string
                    elem.appendChild(document.createTextNode(child));
                }
            });
        }
        return elem;
    }

    function remove(elem){
        elem.parentElement.removeChild(elem);
        return elem;
    }

    function randomId(){
        return 'id' + Math.floor(Math.random() * 1000000);
    }

   function closest(elem, selector){
        while(elem){
            if (xtag.matchesSelector(elem, selector)){
                return elem;
            }
            if (!elem.parentElement){
                throw new Error('Element has no parent, is it in the tree? %o', elem);
                //return null;
            }
            elem = elem.parentElement;
        }
        return null;
    }

    var eachFrameHandlers = [];
    function eachFrame(){
        eachFrameHandlers.forEach(function(handler){
            var time = Date.now();
            handler(time - handler.timestamp);
            handler.timestamp = time;
        });
        xtag.requestFrame(eachFrame);
    }
    xtag.requestFrame(eachFrame);
    xtag.addFrameHandler = function(handler){
        handler.timestamp = Date.now();
        eachFrameHandlers.push(handler);
    };


    xtag.addEvent(document, 'mousemove', function(evt){
        xtag.mouseX = evt.clientX;
        xtag.mouseY = evt.clientY;
    });

    xtag.mouseX = 0;
    xtag.mouseY = 0;

    xtag.html = html;
    xtag.svg = svg;
    xtag.remove = remove;
    xtag.closest = closest;
    xtag.randomId = randomId;
})(xtag);