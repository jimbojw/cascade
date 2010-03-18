/**
 * cascade.js - Cascade library for concise call chaining.
 */
(function( exports ){

var
    slice = Array.prototype.slice;

/**
 * Cascade function.
 */
function cascade( obj ) {
    
    /**
     * Inner function.
     */
    function wrap( param ) {
        
        // handle the no-arguments case
        if (param === undefined) {
            // TODO: something intelligent when no args are passed
            return wrap;
        }
        
        var args = slice.call(arguments, 1);
            
        // handle the function argument case
        if (typeof param === "function") {
            var
                result = param.apply(obj, args),
                down = cascade(result);
            down.up = wrap;
            wrap.down = down;
            wrap.args = function( index ) {
                var result = cascade( args[index] );
                result.up = wrap;
                return result;
            }
            return wrap;
        }
        
        // handle the object argument case
        if (typeof param === "object") {
            // TODO: something intelligent when an object arg is passed
        }
        
        var member = obj[param];

        // handle the method case
        if (typeof member === "function") {
            var
                result = member.apply(obj, args),
                down = cascade(result);
            down.up = wrap;
            wrap.down = down;
            wrap.result = result;
            wrap.args = function( index ) {
                var result = cascade( args[index] );
                result.up = wrap;
                return result;
            }
            return wrap;
        }
        
        // handle the setter case
        if (args.length) {
            obj[param] = args[0];
            wrap.result = obj;
            return wrap;
        }
        
        // handle the getter case
        var down = cascade(member);
        down.result = member;
        down.up = wrap;
        return down;
        
    };
    
    return wrap;
}

// expose api
exports.cascade = cascade;

})(
    typeof exports === "object" ? exports : this
);

