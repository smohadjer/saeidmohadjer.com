//based on https://github.com/jquery-boilerplate/jquery-boilerplate
;( function( $, window, document, undefined ) {

	"use strict";

		var pluginName = "defaultPluginName",
			defaults = {
				propertyName: "value"
			};

		function Plugin ( element, options ) {
			this.element = element;
			this.settings = $.extend( {}, defaults, options );
			this._defaults = defaults;
			this._name = pluginName;
			this.init();
		}

		$.extend( Plugin.prototype, {
			init: function() {
				this.yourOtherFunction( "jQuery Boilerplate" );
			},
			yourOtherFunction: function( text ) {
				// some logic
				$( this.element ).text( text );
			}
		} );

		// A really lightweight plugin wrapper around the constructor,
		// preventing against multiple instantiations
		$.fn[ pluginName ] = function( options ) {
			return this.each( function() {
				if ( !$.data( this, "plugin_" + pluginName ) ) {
					$.data( this, "plugin_" +
						pluginName, new Plugin( this, options ) );
				}
			} );
		};

} )( jQuery, window, document );
