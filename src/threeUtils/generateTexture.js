if (PCL.THREE_AVAILABLE) {

    PCL.THREE.generateTextureGrayscale = function( width, height, noiseNode ) {

        if ( !(noiseNode instanceof PCL.BaseNode) ) {

            PCL.error( 'PCL.THREE.generateTextureGrayscale requires a noise node.' );
            return;

        }

        var data = new Uint8Array( width * height * 3 );

        var index = 0, x, y, v;
        for ( y = 0; y < height; y++ ) {
            for ( x = 0; x < width; x++ ) {

                v = noiseNode.getValue( x, y );

                data[ index     ] = v;
                data[ index + 1 ] = v;
                data[ index + 2 ] = v;

                index += 3;

            }
        }

        var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );
        texture.needsUpdate = true;

        return texture;

    };
    PCL.THREE.generateTextureGreyscale = PCL.THREE.generateTextureGrayscale;

    /**
     * Generates a THREE.js DataTexture using the provided noise nodes.
     *
     * @method generateTexture
     * @param width {number}
     * @param height {number}
     * @param noiseNodeR {PCL.BaseNode}
     * @param noiseNodeG {PCL.BaseNode}
     * @param noiseNodeB {PCL.BaseNode}
     */
    PCL.THREE.generateTextureRGB = function( width, height, noiseNodeR, noiseNodeG, noiseNodeB ) {

        if ( !(
          noiseNodeR instanceof PCL.BaseNode && 
          noiseNodeG instanceof PCL.BaseNode && 
          noiseNodeB instanceof PCL.BaseNode
        ) ) {

            PCL.error( 'PCL.THREE.generateTextureRGB requires three noise nodes.' );
            return;

        }

        var data = new Uint8Array( width * height * 3 );

        var index = 0, x, y;
        for ( y = 0; y < height; y++ ) {
            for ( x = 0; x < width; x++ ) {

                data[ index     ] = noiseNodeR.getValue( x, y );
                data[ index + 1 ] = noiseNodeG.getValue( x, y );
                data[ index + 2 ] = noiseNodeB.getValue( x, y );

                index += 3;

            }
        }

        var texture = new THREE.DataTexture( data, width, height, THREE.RGBFormat );
        texture.needsUpdate = true;

        return texture;

    };

    PCL.THREE.generateTextureRGBA = function( width, height, noiseNodeR, noiseNodeG, noiseNodeB, noiseNodeA ) {

        if ( !(
          noiseNodeR instanceof PCL.BaseNode && 
          noiseNodeG instanceof PCL.BaseNode && 
          noiseNodeB instanceof PCL.BaseNode &&
          noiseNodeA instanceof PCL.BaseNode
        ) ) {

            PCL.error( 'PCL.THREE.generateTextureRGBA requires four noise nodes.' );
            return;

        }

        var data = new Uint8Array( width * height * 4 );

        var index = 0, x, y;
        for ( y = 0; y < height; y++ ) {
            for ( x = 0; x < width; x++ ) {

                data[ index     ] = noiseNodeR.getValue( x, y );
                data[ index + 1 ] = noiseNodeG.getValue( x, y );
                data[ index + 2 ] = noiseNodeB.getValue( x, y );
                data[ index + 3 ] = noiseNodeA.getValue( x, y );

                index += 4;

            }
        }

        var texture = new THREE.DataTexture( data, width, height, THREE.RGBAFormat );
        texture.needsUpdate = true;

        return texture;

    };

}
