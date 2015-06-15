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
