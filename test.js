/**
 * test.js - Test cases for cascade.js
 */

module("basic usage");

test("basic availability", function() {
    expect(1);
    ok(window.cascade, "cascade library available");
});

test("basic method usage", function() {
    
    expect(1);
    
    // setup - simple summation object
    var sum = {
        num: 0,
        add: function(n) {
            this.num += n;
        }
    };
    
    // execute cascade
    ( cascade )
        ( sum )
            ( "add", 10 )
            ( "add", 10 )
            ( "add", 10 );
    
    equals(sum.num, 30, "cascading sum executed");
    
});

test("setting properties", function() {
    
    expect(2);
    
    // setup - simple object
    var obj = {
        val: 0
    };
    
    // execute cascade
    ( cascade )
        ( obj )
            ( "val", 1 )
            ( "foo", 10 );
    
    equals(obj.val, 1, "property value set  ");
    equals(obj.foo, 10, "property value set  ");
    
});

test("calling function", function() {
    
    expect(1);
    
    // setup - simple object
    var obj = {
        val: 0
    };
    
    function setVal( x ) {
        this.val = x;
    }
    
    // execute cascade
    ( cascade )
        ( obj )
            ( setVal, 5 );
    
    equals(obj.val, 5, "call succeeded");
    
});

test("traverse properties", function() {
    
    expect(1);
    
    // setup - simple object
    var obj = {
        sum: {
            num: 0,
            add: function(n) {
                this.num += n;
            }
        }
    };
    
    // execute cascade
    ( cascade )
        ( obj )
            ( "sum" )
                ( "add", 10 )
                ( "add", 10 );
    
    equals(obj.sum.num, 20, "cascading sum executed");
    
});

test("traverse down and up", function() {
    
    expect(1);
    
    // setup - simple object
    var obj = {
        sum: {
            num: 0,
            add: function(n) {
                this.num += n;
            }
        }
    };
    
    // execute cascade
    ( cascade )
        ( obj )
            ( "sum" )
                ( "add", 10 )
                ( "add", 10 )
            [ "up" ]
            ( "sum" )
                ( "add", 10 )
                ( "add", 10 );
    
    equals(obj.sum.num, 40, "cascading sum executed");
    
});

test("retrieve using result", function() {
    
    expect(1);
    
    // setup - simple object
    var obj = {
        val: 42
    };
    
    // execute cascade
    var result = 
        ( cascade )
            ( obj )
                ( "val" )
                    [ "result" ];
    
    equals(obj.val, result, "retrieve result");
    
});

test("using 'down' to descend", function() {
    
    expect(3);
    
    // setup - simple summation objects with clone ability
    var sums = [
        {
            num: 0,
            add: function(n) {
                this.num += n;
            },
            clone: function() {
                var other = {};
                for (var k in this) {
                    other[k] = this[k];
                }
                sums[sums.length] = other;
                return other;
            }
        }
    ];
        
    // execute cascade
    ( cascade )
        ( sums[0] )
            ( "add", 10 )
            ( "clone" )
                [ "down" ]
                    ( "add", 10 )
                    ( "add", 10 );
    
    equals(sums[0].num, 10, "cascading sum executed");
    equals(sums.length, 2, "clone created");
    equals(sums[1].num, 30, "clone cascading sum executed");
    
});

test("using 'up' to ascend", function() {
    
    expect(3);
    
    // setup - simple summation objects with clone ability
    var sums = [
        {
            num: 0,
            add: function(n) {
                this.num += n;
            },
            clone: function() {
                var other = {};
                for (var k in this) {
                    other[k] = this[k];
                }
                sums[sums.length] = other;
                return other;
            }
        }
    ];
        
    // execute cascade
    ( cascade )
        ( sums[0] )
            ( "add", 10 )
            ( "clone" )
            [ "down" ]
                ( "add", 10 )
                ( "add", 10 )
            [ "up" ]
            ( "add", 10 );
    
    equals(sums[0].num, 20, "cascading sum executed");
    equals(sums.length, 2, "clone created");
    equals(sums[1].num, 30, "clone cascading sum executed");
    
});

module("dom interaction", {
    setup: function() {
        document.getElementById("dom-test").innerHTML = "";
    },
    teardown: function() {
        document.getElementById("dom-test").innerHTML = "";
    }
});

test("basic dom usage", function() {
    
    expect(1);
    
    // execute cascade
    ( cascade )
        ( document.getElementById("dom-test") )
            ( "appendChild", document.createElement("span") );
    
    var html = document.getElementById("dom-test").innerHTML;
    
    equals(html, "<span></span>", "span inserted");
    
});

test("advanced dom usage", function() {
    
    expect(1);
    
    // execute cascade
    ( cascade )
        ( document.getElementById("dom-test") )
            ( "appendChild",
                ( cascade )
                    ( document.createElement("span") )
                        ( "innerHTML", "hi" )
                        [ "result" ]
            )
            ( "appendChild", document.createElement("p") )
            ( "getElementsByTagName", "p" )
            [ "down" ]
                ( "item", 0 )
                [ "down" ]
                    ( "innerHTML", "there" );
                        
    
    var html = document.getElementById("dom-test").innerHTML;
    
    equals(html, "<span>hi</span><p>there</p>", "span and paragraph inserted");
    
});

test("advanced dom with args", function() {
    
    expect(1);
    
    // execute cascade
    ( cascade )
        ( document.getElementById("dom-test") )
            ( "appendChild", document.createElement("span") )
            [ "args" ]( 0 )
                ( "innerHTML", "hi" )
            [ "up" ]
            ( "appendChild", document.createElement("p") )
            ( "getElementsByTagName", "p" )
            [ "down" ]
                ( "item", 0 )
                [ "down" ]
                    ( "innerHTML", "there" );
                        
    
    var html = document.getElementById("dom-test").innerHTML;
    
    equals(html, "<span>hi</span><p>there</p>", "span and paragraph inserted");
    
});

