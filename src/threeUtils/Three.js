if (PCL.THREE_AVAILABLE) {

    PCL.THREE = {};

} else {

    Object.defineProperty(PCL, 'THREE', {
        get: function() {
            PCL.warn( 'PCL didn\'t find THREE.js. If you need to use functions under PCL.THREE, make sure that THREE.js is loaded before PCL.' );
            return {};
        }
    });

}
