// ----------
// PCL.js
// ----------

/**
 * Node-based procedural noise library with utilities for turning that
 * noise into useful data structures, such as textures. Based on the C++
 * library `libnoise` by Jason Bevins (http://libnoise.sourceforge.net/index.html).
 *
 * Nodes are broken down into four different categories:
 * {{#crossLink "PCL.GeneratorNode"}}Generators{{/crossLink}},
 * {{#crossLink "PCL.ModifierNode"}}Modifiers{{/crossLink}},
 * {{#crossLink "PCL.CombinerNode"}}Combiners{{/crossLink}},
 * and {{#crossLink "PCL.SelectorNode"}}Selectors{{/crossLink}}.
 *
 * __Generators__  
 * Generators have no inputs, and one output. They provide the base values for the 
 * rest of the node chain.
 * 
 * - {{#crossLink "PCL.ArgumentNode"}}ArgumentNode{{/crossLink}}
 * - {{#crossLink "PCL.ConstantNode"}}ConstantNode{{/crossLink}}
 *
 * __Modifiers__  
 * Modifiers have one input, and one output.
 * 
 * - {{#crossLink "PCL.AbsNode"}}AbsNode{{/crossLink}}
 * - {{#crossLink "PCL.ClampNode"}}ClampNode{{/crossLink}}
 * - {{#crossLink "PCL.CurveNode"}}CurveNode{{/crossLink}}
 * - {{#crossLink "PCL.InvertNode"}}InvertNode{{/crossLink}}
 * - {{#crossLink "PCL.ScaleBiasNode"}}ScaleBiasNode{{/crossLink}}
 * - {{#crossLink "PCL.TerraceNode"}}TerraceNode{{/crossLink}}
 *
 * __Combiners__  
 * Combiners have two inputs, and one output.
 * 
 * - {{#crossLink "PCL.AddNode"}}AddNode{{/crossLink}}
 * - {{#crossLink "PCL.DivideNode"}}DivideNode{{/crossLink}}
 * - {{#crossLink "PCL.MaxNode"}}MaxNode{{/crossLink}}
 * - {{#crossLink "PCL.MinNode"}}MinNode{{/crossLink}}
 * - {{#crossLink "PCL.MultiplyNode"}}MultiplyNode{{/crossLink}}
 * - {{#crossLink "PCL.PowerNode"}}PowerNode{{/crossLink}}
 * - {{#crossLink "PCL.SubtractNode"}}SubtractNode{{/crossLink}}
 *
 * __Selectors__  
 * Selectors have three inputs, and one output.
 * 
 * - {{#crossLink "PCL.BlendNode"}}BlendNode{{/crossLink}}
 * - {{#crossLink "PCL.SelectNode"}}SelectNode{{/crossLink}}
 *
 * @module PCL
 */

/**
 * The base static class to which PCL's classes are attached.
 *
 * @class PCL
 * @static
 */

var PCL = { 

    /**
     * The current PCL version
     *
     * @property VERSION
     * @type string
     * @readOnly
     * @static
     */
    VERSION: '1',

    /**
     * Whether or not THREE.js is available
     *
     * @property THREE_AVAILABLE
     * @type boolean
     * @readOnly
     * @static
     */
    THREE_AVAILABLE: (typeof THREE !== 'undefined')

};

/**
 * Information-level logging. By default simply binds `console.log`.
 * 
 * @method log
 * @static
 */

PCL.log = function() { console.log.apply( console, arguments ); };

/**
 * Warning-level logging. By default simply binds `console.warn`.
 * 
 * @method warn
 * @static
 */

PCL.warn = function() { console.warn.apply( console, arguments ); };

/**
 * Error-level logging. By default simply binds `console.error`.
 * 
 * @method error
 * @static
 */

PCL.error = function() { console.error.apply( console, arguments ); };

PCL.RBGFormat = 0;
PCL.RGBAFormat = 1;
PCL.GrayscaleFormat = 2;


// ----------
// math/Math.js
// ----------

PCL.Math = {};

PCL.Math.clamp = function( x, min, max ) {
    return Math.min( max, Math.max( min, x ) );
};

PCL.Math.mod = function( n, m ) {
    return ( ( ( n % m ) + m ) % m );
};

PCL.Math.uuid = function() {

    // From http://www.broofa.com/Tools/Math.uuid.js
    // uuidFast

    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    return function() {

        var uuid = new Array(36), rnd=0, r;

        for (var i = 0; i < 36; i++) {

            if ( i === 8 || i === 13 || i === 18 || i === 23 ) {
                uuid[i] = '-';
            } else if ( i === 14 ) {
                uuid[i] = '4';
            } else {

                if (rnd <= 0x02) {
                    rnd = 0x2000000 + (Math.random()*0x1000000) | 0
                };

                r = rnd & 0xf;
                rnd = rnd >> 4;
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];

            }

        }

        return uuid.join('');

    }

}();

PCL.Math.hashCode = function( string ) {

    // Implementation of Java's String.hashCode()
    // From http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/

    if ( typeof string !== "string" ) {
        string = string.toString();
    }

    var hash = 0;
    if (string.length == 0) return hash;
    for (var i = 0; i < string.length; i++) {
        hash = ((hash<<5)-hash)+string.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};


// ----------
// math/easing.js
// ----------

PCL.Math.getEasingFunction = function( type ) {

    switch (type) {
        
    }

};

PCL.Math.lerp = function( a, b, alpha ) {
    return a * (1 - alpha) + b * alpha;
};

PCL.Math.cerp = function( a, b, c, d, alpha ) {
    var p = (d - c) - (a - b),
        q = (a - b) - p,
        r = c - a,
        s = b;

    // a^3 * p + a^2 * q + a * r + s
    return s + alpha * ( r + alpha * ( q + alpha * p ) );
};


// ----------
// math/rng.js
// ----------

PCL.Math.LCG = (function() {
    var a = 1664525, 
        c = 1013904223,
        m = Math.pow(2, 32);
        
    function LCG( seed ) {
        if ( seed === undefined )
            seed = Date.now();
        this.setSeed( seed );
    };

    LCG.prototype = {
        setSeed: function( seed ) {
            this.seed = ( typeof seed === 'number' 
                ? seed 
                : PCL.Math.hashCode( seed )
            );
            this.xi = this.seed;
        },

        next: function() {
            return this.xi = (a * this.xi + c) % m;
        },

        random: function() {
            return Math.abs( this.next() / m );
        }
    };

    return LCG;
}());

// ----------
// core/BaseNode.js
// ----------

/**
 * The base class for all noise nodes.
 *
 * @class PCL.BaseNode
 * @constructor
 */

PCL.BaseNode = function() {

    /**
     * UUID for this node instance
     *
     * @property id
     * @type string
     */
    this.id = PCL.Math.uuid();

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default BaseNode
     */
    this.type = 'BaseNode';

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     */
    this.name = '';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 0
     */
    this.inputs = 0;

    /**
     * Array containing attached inputs
     *
     * @property inputNodes
     * @type Array<PCL.BaseNode>
     */
    this.inputNodes = [];

    /**
     * The node this one outputs into
     *
     * @property parent
     * @type PCL.BaseNode
     * @default null
     */
    this.parent = null;

};

PCL.BaseNode.prototype = {

    /**
     * Returns input node at index `i`
     *
     * @method getInput
     * @param i {Number} Index of the node to retrieve
     * @return {PCL.BaseNode}
     */
    getInput: function( i ) {

      if ( i > this.inputs ) {
         PCL.error( 'Input index out of range.' );
         return;
      }

      return this.inputNodes[ i ];

    },

    /**
     * Sets the input node at index `i` to `node`
     *
     * @method setInput
     * @param i {Number} Index of the node to set
     * @param node {PCL.BaseNode} The new input node
     */
    setInput: function( i, node ) {

        if ( i > this.inputs ) {
            PCL.error( 'Input index out of range.' );
            return;
        }

        if ( !(node instanceof PCL.BaseNode) ) {
            PCL.error( 'Input is not a PCL node.' );
            return;
        }

        if ( node.parent !== null ) {
            node.parent.removeInput( node );
        }

        node.parent = this;
        this.inputNodes[ i ] = node;

    },

    /**
     * Removes the input node at index `i`
     *
     * @method unsetInput
     * @param i {Number} Index of the node to unset
     */
    unsetInput: function( i ) {

        if ( this.inputNodes[ i ] ) {
            this.inputNodes[ i ].parent = null;
            this.inputNodes[ i ] = null;
        }

    },

    /**
     * Removes `node` from the input list
     *
     * @method removeInput
     * @param i {Number} Index of the node to unset
     */
    removeInput: function( node ) {

        for ( var i = 0; i < this.inputs; i++ ) {
            if ( this.inputNodes[i].id === node.id ) {
                this.unsetInput( i );
                return;
            }
        }

    },

    /**
     * Returns an array of input node values (indexed the same as the
     * actual input nodes)
     *
     * @method getInputValues
     * @param args {Array<Any>} Arguments to be passed through the node 
     *    chain (ex. x, y coordinates)
     * @return {Array<Number>} Values of the input nodes
     */
    getInputValues: function( args ) {

        var values = [];

        for ( var i = 0, node; i < this.inputs; i++ ) {
            node = this.inputNodes[ i ];
            values[i] = node.getValue.apply( node, args );
        }

        return values;

    },

    /**
     * Calculate the value of this node. Should call `getInputValues` and
     * use the results (with the exception of generators).
     *
     * @method getValue
     * @param [...arguments] {Any} Arguments to be passed up the node chain.
     *    Typically numbers.
     * @return {number} The value of the node chain for the given arguments.
     */
    getValue: function() {

        return 0;

    }

};



// ----------
// core/CombinerNode.js
// ----------

/**
 * Takes two inputs and combines them into a single output.
 *
 * @class PCL.CombinerNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.CombinerNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default CombinerNode
     */
    this.type = 'CombinerNode';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 2
     */
    this.inputs = 2;

};

PCL.CombinerNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.CombinerNode.constructor = PCL.CombinerNode;


// ----------
// core/GeneratorNode.js
// ----------

/**
 * @class PCL.GeneratorNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.GeneratorNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default GeneratorNode
     */
    this.type = 'GeneratorNode';

};

PCL.GeneratorNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.GeneratorNode.constructor = PCL.GeneratorNode;


// ----------
// core/ModifierNode.js
// ----------

/**
 * Takes one input, and performs some operation on it.
 *
 * @class PCL.ModifierNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.ModifierNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default ModifierNode
     */
    this.type = 'ModifierNode';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 1
     */
    this.inputs = 1;

};

PCL.ModifierNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.ModifierNode.constructor = PCL.ModifierNode;

PCL.ModifierNode.prototype.getInputValue = function( args ) {

    var node = this.inputNodes[0];
    return node.getValue.apply( node, args );

};


// ----------
// core/SelectorNode.js
// ----------

/**
 * Takes three inputs. The first two are the inputs to choose between, and the
 * third controls which is used.
 *
 * @class PCL.SelectorNode
 * @constructor
 * @extends PCL.BaseNode
 */

PCL.SelectorNode = function() {

    PCL.BaseNode.call( this );

    /**
     * The type of node (ex. BaseNode, GeneratorNode, ModifierNode, etc.)
     *
     * @property type
     * @type string
     * @default SelectorNode
     */
    this.type = 'SelectorNode';

    /**
     * Number of inputs to this node
     *
     * @property inputs
     * @type number
     * @default 3
     */
    this.inputs = 3;

    this.easing = PCL.EaseLinear;

};

PCL.SelectorNode.prototype = Object.create( PCL.BaseNode.prototype );
PCL.SelectorNode.constructor = PCL.SelectorNode;

Object.defineProperty( PCL.SelectorNode.prototype, 'easing', {

    get: function() { return this._easing; },
    set: function( v ) { 

        this._easing = v;
        this._easingfn = PCL.Math.getEasingFunction( v );

    }

});


// ----------
// extras/combiners/AddNode.js
// ----------

/**
 * Sums the values of the inputs.
 *
 * @class PCL.AddNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.AddNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default AddNode
     */
    this.name = 'AddNode';

};

PCL.AddNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.AddNode.constructor = PCL.AddNode;

/**
 * Performs `input[0] + input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.AddNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] + inputValues[1];

};


// ----------
// extras/combiners/DivideNode.js
// ----------

/**
 * Divides the first input by the second.
 *
 * @class PCL.DivideNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.DivideNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default DivideNode
     */
    this.name = 'DivideNode';

};

PCL.DivideNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.DivideNode.constructor = PCL.DivideNode;

/**
 * Performs `input[0] / input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.DivideNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] / inputValues[1];

};


// ----------
// extras/combiners/MaxNode.js
// ----------

/**
 * Returns the larger of the two inputs.
 *
 * @class PCL.MaxNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.MaxNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default MaxNode
     */
    this.name = 'MaxNode';

};

PCL.MaxNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.MaxNode.constructor = PCL.MaxNode;

/**
 * Performs `Math.max( input[0], input[1] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.MaxNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return Math.max( inputValues[0], inputValues[1] );

};


// ----------
// extras/combiners/MinNode.js
// ----------

/**
 * Returns the smaller of the two inputs.
 *
 * @class PCL.MinNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.MinNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default MinNode
     */
    this.name = 'MinNode';

};

PCL.MinNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.MinNode.constructor = PCL.MinNode;

/**
 * Performs `Math.min( input[0], input[1] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.MinNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return Math.min( inputValues[0], inputValues[1] );

};


// ----------
// extras/combiners/MultiplyNode.js
// ----------

/**
 * Multiplies the first input by the second.
 *
 * @class PCL.MultiplyNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.MultiplyNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default MultiplyNode
     */
    this.name = 'MultiplyNode';

};

PCL.MultiplyNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.MultiplyNode.constructor = PCL.MultiplyNode;

/**
 * Performs `input[0] * input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.MultiplyNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] * inputValues[1];

};


// ----------
// extras/combiners/PowerNode.js
// ----------

/**
 * Raises the first input to the power of the second.
 *
 * @class PCL.PowerNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.PowerNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default PowerNode
     */
    this.name = 'PowerNode';

};

PCL.PowerNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.PowerNode.constructor = PCL.PowerNode;

/**
 * Performs `Math.pow( input[0], input[1] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.PowerNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return Math.pow( inputValues[0] );

};


// ----------
// extras/combiners/SubtractNode.js
// ----------

/**
 * Subtracts the second input from the first.
 *
 * @class PCL.SubtractNode
 * @constructor
 * @extends PCL.CombinerNode
 */
PCL.SubtractNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default SubtractNode
     */
    this.name = 'SubtractNode';

};

PCL.SubtractNode.prototype = Object.create( PCL.CombinerNode.prototype );
PCL.SubtractNode.constructor = PCL.SubtractNode;

/**
 * Performs `input[0] - input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.SubtractNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return inputValues[0] - inputValues[1];

};


// ----------
// extras/generators/ArgumentNode.js
// ----------

/**
 * Returns the value of the first argument passed to the top-level
 * `getValue`. Useful for debugging purposes.
 *
 * @class PCL.ArgumentNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
PCL.ArgumentNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ArgumentNode
     */
    this.name = 'ArgumentNode';

};

PCL.ArgumentNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.ArgumentNode.constructor = PCL.ArgumentNode;

/**
 * Returns the value of the first argument.
 *
 * @method getValue
 * @param value {number} The value to be returned by this 'generator'.
 * @return {number} `value`
 */
PCL.ArgumentNode.prototype.getValue = function( value ) {

    return value

};


// ----------
// extras/generators/CheckerNode.js
// ----------

/**
 * Creates a simple checkered pattern in 2d.
 *
 * @class PCL.CheckerNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
PCL.CheckerNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default CheckerNode
     */
    this.name = 'CheckerNode';

};

PCL.CheckerNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.CheckerNode.constructor = PCL.CheckerNode;

/**
 * Returns 1 for black and 0 for white squares.
 *
 * @method getValue
 * @param value {number} The value to be returned by this 'generator'.
 * @return {number} `value`
 */
PCL.CheckerNode.prototype.getValue = function( x, y ) {

    return (x ^ y) & 1;

};


// ----------
// extras/generators/ConstantNode.js
// ----------

/**
 * Returns the value stored in its `ConstantNode.value` property.
 *
 * @class PCL.ConstantNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
 PCL.ConstantNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ConstantNode
     */
    this.name = 'ConstantNode';

    /**
     * The value to be returned by this node.
     *
     * @property value
     * @type number
     * @default 0
     */
    this.value = 0;

};

PCL.ConstantNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.ConstantNode.constructor = PCL.ConstantNode;

/**
 * Returns the value of `ConstantNode.value`.
 *
 * @method getValue
 * @return {number} `value`
 */
PCL.ConstantNode.prototype.getValue = function() {

    return this.value

};


// ----------
// extras/generators/FunctionNode.js
// ----------

/**
 * Returns the value returned by `FunctionNode.value` property.
 *
 * @class PCL.FunctionNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
 PCL.FunctionNode = function() {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default FunctionNode
     */
    this.name = 'FunctionNode';

    /**
     * The value to be returned by this node.
     *
     * @property value
     * @type function
     * @default 0
     */
    this.value = function() {
        return 0;
    };

};

PCL.FunctionNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.FunctionNode.constructor = PCL.FunctionNode;

/**
 * Returns the value of `FunctionNode.value` for the given arguments.
 *
 * @method getValue
 * @return {number} `value`
 */
PCL.FunctionNode.prototype.getValue = function() {

    return this.value.apply( this, arguments );

};


// ----------
// extras/generators/Worley2DNode.js
// ----------

/**
 * Returns the value returned by `Worley2DNode.value` property.
 *
 * @class PCL.Worley2DNode
 * @constructor
 * @extends PCL.GeneratorNode
 */
 PCL.Worley2DNode = function( seed ) {

    PCL.GeneratorNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default Worley2DNode
     */
    this.name = 'Worley2DNode';

    /**
     * The random seed used by the node.
     *
     * @property seed
     * @type any
     * @default `Date.now()`
     */
    this.seed = PCL.Math.hashCode( seed === undefined ? Date.now() : seed ).toString(36).replace(/-/, 'A');

    /**
     * The size of feature point containing grid squares. Average of 4 points per square.
     *
     * @property gridSize
     * @type number
     * @default 64
     */
    this.gridSize = 64;

    /**
     * The number of grid squares that exist before wrapping around. Set to 0 for no wrapping.
     *
     * @property wrapSize
     * @type number
     * @default 0
     */
    this.wrapSize = 0;

    /**
     * The distance function used to calculate point values.
     *
     * @property distance
     * @type Function
     * @default PCL.Worley2DNode.prototype.distanceEuclidean
     */
    this.distance = this.distanceEuclidean;

    /**
     * Stores the points generated in the last use of `getValue()`. By caching these points
     * the number of times they must be calculated is drastically reduced.
     *
     * @property _lastGrid
     * @type array
     * @private
     */
    this._lastGrid = [null, null, null];

};

PCL.Worley2DNode.prototype = Object.create( PCL.GeneratorNode.prototype );
PCL.Worley2DNode.constructor = PCL.Worley2DNode;

/**
 * Given a random number 0-1 returns the number of feature points based on
 * a poisson distribution (k = 1..9, lambda = 4).
 *
 * @method probLookup
 * @return {number}
 */
PCL.Worley2DNode.prototype.probLookup = function(prob) {
    if (prob < 0.07525283359435139) return 1;
    if (prob < 0.22575850078305418) return 2;
    if (prob < 0.42643272370132457) return 3;
    if (prob < 0.62710694661959500) return 4;
    if (prob < 0.78764632495421130) return 5;
    if (prob < 0.89467257717728880) return 6;
    if (prob < 0.95583043559047590) return 7;
    if (prob < 0.98640936479706940) return 8;
    return 9;
};

PCL.Worley2DNode.prototype.distanceEuclidean = function( ax, ay, bx, by ) {
    var dx = bx - ax,
        dy = by - ay;

    return Math.sqrt( dx * dx + dy * dy );
};

PCL.Worley2DNode.prototype.distanceManhattan = function( ax, ay, bx, by ) {
    var dx = bx - ax,
        dy = by - ay;

    return Math.abs( dx ) + Math.abs( dy );
};

/**
 * Returns the value of `Worley2DNode.value` for the given arguments.
 *
 * @method getValue
 * @return {number} `value`
 */
PCL.Worley2DNode.prototype.getValue = function( x, y ) {

    var ix = Math.floor( x / this.gridSize ),
        iy = Math.floor( y / this.gridSize ),
        points = [];

    if ( this._lastGrid[0] !== ix || this._lastGrid[1] !== iy ) {

        var lcg = new PCL.Math.LCG();

        var gridX, gridY, i, coordHash, npoints, pX, pY, d;
        for ( gridX = ix - 1; gridX < ix + 2; gridX++ ) {
            for ( gridY = iy - 1; gridY < iy + 2; gridY++ ) {

                if ( this.wrapSize > 0 ) {
                    coordHash = PCL.Math.hashCode( 
                        PCL.Math.mod( gridX, this.wrapSize ).toString() + 
                        this.seed + 
                        PCL.Math.mod( gridY, this.wrapSize ).toString() 
                    );
                } else {
                    coordHash = PCL.Math.hashCode( 
                        gridX.toString() + 
                        this.seed + 
                        gridY.toString() 
                    );
                }

                lcg.setSeed( coordHash );

                npoints = this.probLookup( lcg.random() );
                for ( i = 0; i < npoints; i++ ) {
                    pX = (gridX + lcg.random()) * this.gridSize;
                    pY = (gridY + lcg.random()) * this.gridSize;

                    points.push( [pX, pY] );
                }

            }
        }

        this._lastGrid = [ix, iy, points];

    } else {

        points = this._lastGrid[2];

    }

    var min = Infinity;
    for ( var i = 0, d; i < points.length; i++ ) {
        d   = this.distance( x, y, points[i][0], points[i][1] );
        min = Math.min( min, d );
    }

    return PCL.Math.clamp( min / this.gridSize, 0, 1 );

};


// ----------
// extras/modifiers/AbsNode.js
// ----------

/**
 * Returns the absolute value of the input node.
 *
 * @class PCL.AbsNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.AbsNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default AbsNode
     */
    this.name = 'AbsNode';

};

PCL.AbsNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.AbsNode.constructor = PCL.AbsNode;

/**
 * Performs `Math.abs( input[0] )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.AbsNode.prototype.getValue = function() {

    return Math.abs( this.getInputValue( arguments ) );

};


// ----------
// extras/modifiers/ClampNode.js
// ----------

/**
 * Clamps the value of the input node between `ClampNode.min` and `ClampNode.max`.
 *
 * @class PCL.ClampNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.ClampNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ClampNode
     */
    this.name = 'ClampNode';

    /**
     * The minimum value to be returned by this node.
     *
     * @property min
     * @type number
     * @default -1
     */
    this.min = -1;

    /**
     * The maximum value to be returned by this node.
     *
     * @property max
     * @type number
     * @default 1
     */
    this.max = 1;

};

PCL.ClampNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.ClampNode.constructor = PCL.ClampNode;

/**
 * Performs `PCL.Math.clamp( input[0], ClampNode.min, ClampNode.max )`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.ClampNode.prototype.getValue = function() {

   return PCL.Math.clamp( this.getInputValue( arguments ), this.min, this.max );

};


// ----------
// extras/modifiers/CurveNode.js
// ----------

/**
 * Maps an input to a curve defined by the given control points. Uses cubic
 * interpolation between control points to approximate the unique polynomial
 * through those points. See 
 * http://libnoise.sourceforge.net/docs/classnoise_1_1module_1_1Curve.html#_details
 * for examples (todo: make our own examples).
 *
 * Based on Jason Bevin's Curve module from libnoise.
 *
 * @class PCL.CurveNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.CurveNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default CurveNode
     */
    this.name = 'CurveNode';

    /**
     * The list of control points in the form of `[ input, output ]`.
     *
     * @property controlPoints
     * @type Array<Array<number>>
     * @default []
     */
    this.controlPoints = [];

};

PCL.CurveNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.CurveNode.constructor = PCL.CurveNode;

/**
 * Adds a control point to the array such that when given `input` this
 * node will produce `output`.
 *
 * @method addControlPoint
 * @param input {number}
 * @param output {number}
 */
PCL.CurveNode.prototype.addControlPoint = function( input, output ) {

    for ( var i = 0; i < this.controlPoints.length; i++ ) {
        if ( input < this.controlPoints[ i ] ) {
            this.controlPoints.splice( i, 0, [ input, output ] );
            return;
        }
    }
    this.controlPoints.push( [ input, output ] );

};

/**
 * Clears the control point array
 *
 * @method clearControlPoints
 */
PCL.CurveNode.prototype.clearControlPoints = function() {

    this.controlPoints = [];

};

/**
 * Makes evenly spaced control points on the domain [-1, 1] for the given 
 * array of output values. Requires at least 2 points.
 *
 * @method makeControlPoints
 * @param pointArray {Array<number>}
 */
PCL.CurveNode.prototype.makeControlPoints = function( pointArray ) {

    this.clearControlPoints();

    if ( pointArray.length < 2 ) {

        PCL.error( 'Control point count must be at least 2.' );

    }

    var stepSize = 2 / ( pointArray.length - 1 );
    var curValue = -1;

    for ( var i = 0; i < pointArray.length; i++ ) {
        this.addControlPoint( curValue, pointArray[ i ] );
        curValue += stepSize;
    }

};

/**
 * Maps the input node's value to a curve through the given control points.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.CurveNode.prototype.getValue = function() {

    var inputValue = this.getInputValue( arguments );
    var maxIndex = this.controlPoints.length - 1;
    var index;

    for ( index = 0; index < this.controlPoints.length; index++ ) {
        if ( inputValue < this.controlPoints[index][0] ) {
            break;
        }
    }

    if ( index < 1 ) {
        return this.controlPoints[0][1];
    }

    if ( index > maxIndex ) {
        return this.controlPoints[ maxIndex ][1];
    }

    var c0 = this.controlPoints[ PCL.Math.clamp( index - 2, 0, maxIndex ) ],
        c1 = this.controlPoints[ PCL.Math.clamp( index - 1, 0, maxIndex ) ],
        c2 = this.controlPoints[ PCL.Math.clamp( index    , 0, maxIndex ) ],
        c3 = this.controlPoints[ PCL.Math.clamp( index + 3, 0, maxIndex ) ];

    var alpha = ( inputValue - c1[0] ) / ( c2[0] - c1[0] );

    return PCL.Math.cerp( c0[1], c1[1], c2[1], c3[1], alpha );

};


// ----------
// extras/modifiers/FBMNode.js
// ----------

/**
 * Applies fractional brownian motion. The properties `frequency` and `lacunarity`, 
 * may be set to either a number or array of numbers. If set to a number, all 
 * arguments will use the same value for that parameter. If set to an array, the
 * corresponding argument will use the proper value for that property. If an array 
 * element on any property is set to `null` or `undefined` the corresponding
 * argument will not be modified.
 *
 *     fbmNode.lacunarity = 2;
 *     fbmNode.getValue( x, y, z ); 
 *     // All arguments will have a lacunarity of 2
 *
 *     fbmNode.lacunarity = [ 2, 1.5, 2.5 ];
 *     fbmNode.getValue( x, y, z );
 *     // x lacunarity is 2
 *     // y lacunarity is 1.5
 *     // z lacunarity is 2.5
 *
 *     fbmNode.frequency = [ null, 1 / 1024 ];
 *     fbmNode.lacunarity = 2;
 *     fbmNode.getValue( x, y, z );
 *     // x is held constant
 *     // y lacunarity is 2, and frequency is 1 / 1024
 *     // z is held constant
 *
 * @class PCL.FBMNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.FBMNode = function() {

    PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default FBMNode
     */
    this.name = 'FBMNode';

    this.octaves = 8;

    this._frequency  = 2;
    this._lacunarity = 2;
    this._useArrays  = false;

    /**
     * The base frequency for the fbm. If set to an array separate values will 
     * be used for each argument. If an array element is `null` that argument 
     * will be held constant.
     *
     * @property frequency
     * @type number or Array<number>
     * @default 1;
     */
    this.frequency = 1;

    /**
     * The lacunarity (per-octave frequency multiplier) for the fbm. If set to
     * an array separate values will be used for each argument. If an array
     * element is `null` that argument will be held constant.
     *
     * @property lacunarity
     * @type number or Array<number>
     * @default 2
     */
    this.lacunarity = 2;

    /**
     * The base amplitude for the fbm.
     *
     * @property amplitude
     * @type number
     * @default 0.5
     */
    this.amplitude = 0.5;

    /**
     * The persistence (per-octave amplitude multiplier) for the fbm.
     *
     * @property persistence
     * @type number
     * @default 0.5
     */
    this.persistence = 0.5;

};

PCL.FBMNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.FBMNode.constructor = PCL.FBMNode;

Object.defineProperties(PCL.FBMNode.prototype, {
    frequency: {
        get: function() { return this._frequency; },
        set: function( f ) {
            this._frequency = f;
            this.updateProperties();
        }
    },
    lacunarity: {
        get: function() { return this._lacunarity; },
        set: function( l ) {
            this._lacunarity = l;
            this.updateProperties();
        }
    }
});

PCL.FBMNode.prototype.updateProperties = function() {

    var f = this.frequency,
        l = this.lacunarity;

    var maxLength = Math.max(
        f.length || 0,
        l.length || 0
    );

    if (maxLength === 0) {

        this._frequency   = f;
        this._lacunarity  = l;

        this._useArrays = false;

    } else {

        var fArr = new Array(maxLength),
            lArr = new Array(maxLength);

        for (var i = 0; i < maxLength; i++) {
            fArr[i] = (f instanceof Array) ? f[i] : f;
            lArr[i] = (l instanceof Array) ? l[i] : l;
        }

        this._frequency   = fArr;
        this._lacunarity  = lArr;

        this._useArrays = true;

    }

};

/**
 * Does things! (todo: document this)
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.FBMNode.prototype.getValue = function() {

    var total = 0, args = [], inputValue;

    var f = this._frequency,
        l = this._lacunarity,
        a = this.amplitude,
        p = this.persistence;

    if ( this._useArrays ) {

        var argIsConst = [];

        for ( var i = 0; i < arguments.length; i++ ) {
            if ( f[i] !== undefined && l[i] !== undefined ) {
                args[i] = arguments[i] * f[i];
                argIsConst[i] = false;
            } else {
                args[i] = arguments[i];
                argIsConst[i] = true;
            }
        }

        for ( var i = 0; i < this.octaves; i++ ) {

            inputValue = this.getInputValue( args ) * a;

            total += inputValue;
            a     *= p;

            for ( var i = 0; i < args.length; i++ ) {
                if (!argIsConst[i]) {
                    args[i] *= l[i];
                }
            }

        }

    } else {

        for ( var i = 0; i < arguments.length; i++ ) {
            args[i] = arguments[i] * f;
        }

        for ( var i = 0; i < this.octaves; i++ ) {

            inputValue = this.getInputValue( args ) * a;

            total += inputValue;
            a     *= p;

            for ( var i = 0; i < args.length; i++ ) {
                args[i] *= l;
            }

        }

    }

    return total;

};


// ----------
// extras/modifiers/InvertNode.js
// ----------

/**
 * Inverts the value of the input node.
 *
 * @class PCL.InvertNode
 * @constructor
 * @extends PCL.ModifierNode
 */
 PCL.InvertNode = function() {

	PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default InvertNode
     */
	this.name = 'InvertNode';

};

PCL.InvertNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.InvertNode.constructor = PCL.InvertNode;

/**
 * Performs `-1 * input[0]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.InvertNode.prototype.getValue = function() {

	return -1 * this.getInputValue( arguments );

};


// ----------
// extras/modifiers/ScaleBiasNode.js
// ----------

/**
 * Scales the value of the input node, then adds a bias to it.
 *
 * @class PCL.ScaleBiasNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.ScaleBiasNode = function() {

	PCL.ModifierNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default ScaleBiasNode
     */
	this.name = 'ScaleBiasNode';

    /**
     * The amount to scale the input value by.
     *
     * @property scale
     * @type number
     * @default 1
     */
	this.scale = 1;

    /**
     * The amount to bias the input value by.
     *
     * @property bias
     * @type number
     * @default 0
     */
	this.bias  = 0;

};

PCL.ScaleBiasNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.ScaleBiasNode.constructor = PCL.ScaleBiasNode;

/**
 * Performs `input[0] * ScaleBiasNode.scale + ScaleBiasNode.bias`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.ScaleBiasNode.prototype.getValue = function() {

	return this.getInputValue( arguments ) * this.scale + this.bias;

};


// ----------
// extras/modifiers/TerraceNode.js
// ----------

/**
 * Maps an input to a curve defined by the given control points. Creates a
 * terracing effect. See http://libnoise.sourceforge.net/docs/classnoise_1_1module_1_1Terrace.html#_details
 * for examples (todo: make our own examples).
 *
 * Based on Jason Bevin's Terrace module from libnoise.
 *
 * @class PCL.TerraceNode
 * @constructor
 * @extends PCL.ModifierNode
 */
PCL.TerraceNode = function() {

	PCL.ModifierNode.call( this );

	/**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default TerraceNode
     */
	this.name = 'TerraceNode';

	/**
     * The list of control points.
     *
     * @property controlPoints
     * @type Array<number>
     * @default []
     */
	this.controlPoints = [];

	/**
     * Whether the curve direction on control points should be inverted or not
     * (ie curving down instead of up between points).
     *
     * @property invert
     * @type boolean
     * @default false
     */
	this.invert = false;

};

PCL.TerraceNode.prototype = Object.create( PCL.ModifierNode.prototype );
PCL.TerraceNode.constructor = PCL.TerraceNode;

/**
 * Adds a control point to the array such that the slope of the output curve
 * will peak to the left of the point, and be 0 immediately after.
 *
 * @method addControlPoint
 * @param value {number}
 */
PCL.TerraceNode.prototype.addControlPoint = function( value ) {

	for ( var i = 0; i < this.controlPoints.length; i++ ) {
		if ( value < this.controlPoints[ i ] ) {
			this.controlPoints.splice( i, 0, value );
			return;
		}
	}
	this.controlPoints.push( value );

};

/**
 * Clears the control point array
 *
 * @method clearControlPoints
 */
PCL.TerraceNode.prototype.clearControlPoints = function() {

	this.controlPoints = [];

};

/**
 * Makes the given number of evenly spaced control points on the domain 
 * [-1, 1]. Requires at least 2 points.
 *
 * @method makeControlPoints
 * @param pointCount {number}
 */
PCL.TerraceNode.prototype.makeControlPoints = function( pointCount ) {

	this.clearControlPoints();

	if ( pointCount < 2 ) {

		PCL.error( 'Control point count must be at least 2.' );

	}

	var stepSize = 2 / ( pointCount - 1 );
	var curValue = -1;

	for ( var i = 0; i < pointCount; i++ ) {
		this.addControlPoint( curValue );
		curValue += stepSize;
	}

};

/**
 * Maps the input node's value to a terracing curve through the given control 
 * points.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.TerraceNode.prototype.getValue = function() {

	var inputValue = this.getInputValue( arguments );
	var index;

	for ( index = 0; index < this.controlPoints.length; index++ ) {
		if ( inputValue < this.controlPoints[index] ) {
			break;
		}
	}

	if ( index === 0 ) {
		return this.controlPoints[ 0 ];
	}

	if ( index === this.controlPoints.length ) {
		return this.controlPoints[ index - 1 ];
	}

	var p0 = this.controlPoints[ index - 1 ],
		p1 = this.controlPoints[ index ]

	var alpha = ( inputValue - p0 ) / ( p1 - p0 );

	if ( this.invert ) {
		alpha = 1 - alpha;

		var temp = p0;
		p0 = p1;
		p1 = temp;
	}

	return PCL.Math.lerp( p0, p1, alpha * alpha );

};


// ----------
// extras/selectors/BlendNode.js
// ----------

/**
 * (__NYI__) Outputs a weighted combination of `input[0]` and `input[1]` depending on the value
 * of `input[2]`. `input[2]` is assumed to have a range [-1, 1].
 *
 * @class PCL.BlendNode
 * @constructor
 * @extends PCL.BlendorNode
 */
PCL.BlendNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default BlendNode
     */
    this.name = 'BlendNode';

};

PCL.BlendNode.prototype = Object.create( PCL.SelectorNode.prototype );
PCL.BlendNode.constructor = PCL.BlendNode;

/**
 * (__NYI__)
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.BlendNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );
    return 0;

};


// ----------
// extras/selectors/SelectNode.js
// ----------

/**
 * Outputs either `input[0]` or `input[1]` depending on the value of `input[2]`.
 *
 * @class PCL.SelectNode
 * @constructor
 * @extends PCL.SelectorNode
 */
PCL.SelectNode = function() {

    PCL.CombinerNode.call( this );

    /**
     * The specific variety of node (ex. AddNode, PerlinNode, AbsNode, etc.)
     *
     * @property name
     * @type string
     * @default SelectNode
     */
    this.name = 'SelectNode';

    /**
     * For `input[2] < SelectNode.threshold` this node will output `input[0]`.
     * Otherwise it will output `input[1]`.
     *
     * @property threshold
     * @type number
     * @default 0
     */
    this.threshold = 0;

};

PCL.SelectNode.prototype = Object.create( PCL.SelectorNode.prototype );
PCL.SelectNode.constructor = PCL.SelectNode;

/**
 * Outputs `input[0]` if `input[2] < SelectNode.threshold` else `input[1]`.
 *
 * @method getValue
 * @param [...arguments] {Any} Arguments to be passed up the node chain.
 *    Typically numbers.
 * @return {number}
 */
PCL.SelectNode.prototype.getValue = function() {

    var inputValues = this.getInputValues( arguments );

    return (inputValues[2] < this.threshold)
        ? inputValues[0]
        : inputValues[1];

};
