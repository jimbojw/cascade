## ( cascade )

JavaScript library for working with objects.

It works by returning a function with each call and doing something intelligent based on the functions arguments.

### developed by

* Jim R. Wilson (jimbojw)

### license

hexlib is released under [The MIT License](http://www.opensource.org/licenses/mit-license.php).

## usage

Various examples on how to use cascade.

### calling methods

<pre>
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

sum.num === 30; // true!
</pre>

### setting members

<pre>
// setup - simple object
var obj = {
    val: 0
};

// execute cascade
( cascade )
    ( obj )
        ( "val", 1 )
        ( "foo", 10 );

obj.val === 1 && obj.foo === 10; // true
</pre>

### call an external function as a method

<pre>
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

obj.val === 5; // true
</pre>

### traverse down an object structure

<pre>
// setup - nested objects
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

obj.sum.num === 20; // true
</pre>

### traverse back up

<pre>
// setup - nested objects
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

obj.sum.num === 40; // true
</pre>

### extract literal result (unwrap)

<pre>
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

obj.val === result; // true
</pre>

### using down to traverse into the structure

<pre>
( cascade )
    ( document.body )
        ( "getElementsByTagName", "p" )
        [ "down" ]
            ( "item", 0 )
            [ "down" ]
                ( "innerHTML", "hello" );

// innerHTML of the first p tag is now "hello"
</pre>

### using args to grab an argument

<pre>
( cascade )
    ( document.body )
        ( "appendChild", document.createElement("span") )
        [ "args" ]( 0 )
            ( "innerHTML", "hi" );

// <span>hi</span> has been added to the body
</pre>

