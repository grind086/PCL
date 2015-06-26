PCL.generateHeightmap = function( noiseNode, width, height, xOffset, yOffset, xScale, yScale ) {

    if ( !(noiseNode instanceof PCL.BaseNode) ) {

        PCL.error( 'PCL.generateHeightmap requires a noise node.' );
        return;

    }

    // Set defaults

    xOffset = typeof xOffset === "undefined" ? 0 : xOffset;
    yOffset = typeof yOffset === "undefined" ? 0 : yOffset;
    xScale  = typeof xScale  === "undefined" ? 1 : xScale;
    yScale  = typeof yScale  === "undefined" ? 1 : yScale;

    var data = new Array( width * height );

    var index = 0, x, y, v;
    for ( y = 0; y < height; y++ ) {
        for ( x = 0; x < width; x++ ) {

            data[ index++ ] = noiseNode.getValue(
                x / xScale + xOffset,
                y / yScale + yOffset
            );

        }
    }

    return data;

};

PCL.generateImageData = function( noiseNodes, format, width, height, xOffset, yOffset, xScale, yScale ) {

    // Set defaults

    format  = typeof format  === "undefined" ? PCL.GrayscaleFormat : format;
    xOffset = typeof xOffset === "undefined" ? 0 : xOffset;
    yOffset = typeof yOffset === "undefined" ? 0 : yOffset;
    xScale  = typeof xScale  === "undefined" ? 1 : xScale;
    yScale  = typeof yScale  === "undefined" ? 1 : yScale;

    var imageData = new ImageData( width, height ),
        data = imageData.data;

    var index = 0, x, y;

    if ( format === PCL.GrayscaleFormat ) {

        var noiseNode = noiseNodes instanceof Array ? noiseNodes[0] : noiseNodes;

        if ( !(noiseNode instanceof PCL.BaseNode) ) {
            PCL.error( 'PCL.generateImageData (grayscale format) requires a noise node.' );
            return;
        }
        
        var v;
        for ( y = 0; y < height; y++ ) {
            for ( x = 0; x < width; x++ ) {

                v = noiseNode.getValue(
                    x / xScale + xOffset,
                    y / yScale + yOffset
                );

                data[ index     ] = v;
                data[ index + 1 ] = v;
                data[ index + 2 ] = v;
                data[ index + 3 ] = 255;

                index += 4;

            }
        }

        return imageData;

    }

    if ( format === PCL.RGBFormat ) {

        var noiseNodeR = noiseNodes[0],
            noiseNodeG = noiseNodes[1],
            noiseNodeB = noiseNodes[2];

        if ( !(
          noiseNodeR instanceof PCL.BaseNode && 
          noiseNodeG instanceof PCL.BaseNode && 
          noiseNodeB instanceof PCL.BaseNode
        ) ) {
            PCL.error( 'PCL.generateImageData (RGB format) requires three noise nodes.' );
            return;
        }

        var nx, ny;
        for ( y = 0; y < height; y++ ) {
            for ( x = 0; x < width; x++ ) {

                nx = x / xScale + xOffset;
                ny = y / yScale + yOffset;

                data[ index     ] = noiseNodeR.getValue( nx, ny );
                data[ index + 1 ] = noiseNodeG.getValue( nx, ny );
                data[ index + 2 ] = noiseNodeB.getValue( nx, ny );
                data[ index + 3 ] = 255;

                index += 4;

            }
        }

        return imageData;

    }

    if ( format === PCL.RGBAFormat ) {

        var noiseNodeR = noiseNodes[0],
            noiseNodeG = noiseNodes[1],
            noiseNodeB = noiseNodes[2],
            noiseNodeA = noiseNodes[3];

        if ( !(
          noiseNodeR instanceof PCL.BaseNode && 
          noiseNodeG instanceof PCL.BaseNode && 
          noiseNodeB instanceof PCL.BaseNode &&
          noiseNodeA instanceof PCL.BaseNode
        ) ) {
            PCL.error( 'PCL.generateImageData (RGBA format) requires four noise nodes.' );
            return;
        }

        var nx, ny;
        for ( y = 0; y < height; y++ ) {
            for ( x = 0; x < width; x++ ) {

                nx = x / xScale + xOffset;
                ny = y / yScale + yOffset;

                data[ index     ] = noiseNodeR.getValue( nx, ny );
                data[ index + 1 ] = noiseNodeG.getValue( nx, ny );
                data[ index + 2 ] = noiseNodeB.getValue( nx, ny );
                data[ index + 3 ] = noiseNodeA.getValue( nx, ny );

                index += 4;

            }
        }

        return imageData;

    }

    PCL.error( 'Uknown image format passed to PCL.generateImageData' );

};
