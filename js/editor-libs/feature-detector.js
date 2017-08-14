(function() {
    'use strict';

    /**
     * Returns the Object definition that matches the string value
     * @param {String} feature - The string value to match against
     * @returns The matched feature as an Object
     */
    function getFeatureObject(feature) {
        var featureObj = undefined;

        switch (feature) {
        case 'array-entries':
            featureObj = Array.prototype.entries;
            break;
        }

        return featureObj;
    }

    var FeatureDetector = {
        /**
         * Tests whether the provided feature is supported. It
         * does this by checking the `typeof` the feature.
         * @param {String} feature - The feature to test ex. 'array-entries'
         */
        isDefined: function(feature) {
            // if the feature parameter is undefined, return true
            if (feature === undefined) {
                return true;
            }

            return getFeatureObject(feature) !== undefined;
        }
    };

    window.featureDetector = FeatureDetector;
})();
