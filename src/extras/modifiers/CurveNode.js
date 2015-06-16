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
