function matchCase(text, pattern) {
    // Modified from 
    // http://stackoverflow.com/questions/17264639/replace-text-but-keep-case
    var result = '';

    for(var i = 0; i < text.length; i++) {
        var c = text.charAt(i);
        var p = pattern.charCodeAt(i);
        
        if (isNaN(p)) {
            p = pattern.charCodeAt(i - 1);
        }

        if(p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
}


function handle_text(node) {
    var text = node.nodeValue;
    text = text.replace(/\bcuck/gi, function (match) {
        return matchCase('smurf', match);
    });
    node.nodeValue = text;
}

function walk(node) {
    // Thanks Stack Overflow for this helpful function:
    // http://stackoverflow.com/a/5904945

    var child, next;

    switch (node.nodeType) {
        case 1:  // Element
        case 9:  // Document
        case 11: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;
        case 3: // Text node
            handle_text(node);
            break;
    }
}

function main() {
    walk(document.body);
}

function timeout_trigger(callback, time) {
    var timeout = null;
    return function () {
        if (!timeout) {
            setTimeout(function () {
                callback();
                timeout = null;
            }, time);
        }
    }
}

function load_observer() {
    var trigger = timeout_trigger(main, 500);
    var observer = new MutationObserver(trigger);

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

(function () {
    main();
    load_observer();
})();