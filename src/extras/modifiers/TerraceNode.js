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

	var inputValue = this.getInputValues( arguments )[ 0 ];
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
