/**
 * jQuery plugin name: mdz_progressbar
 * Version: 1.0.0
 * Author: Zoran Vulanovic
 * Company: TNation
 * Email: vulezor@gmail.com
 * */
(function( $, window, document, undefined ) {
    "use strict";
    var pluginName = "mdz_progressbar",
        defaults = {
          	percent: 0,
          	fillColor: '#34495e',
          	staticStrokeColor:'#cccccc',
          	dynamicStrokeColor:"#19bd9b",
          	fontColor:"#FFFFFF",
          	textShadow:true,
          	fontStyle:"Arial"
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = $(element);
        
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
		this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend( Plugin.prototype, {
    	init:function(){
    		this.c = this.element[0];
		  	this.ctx = this.c.getContext("2d");
		  	this.last_position = 0;
		  	this.position = (this.c.width / 2);
		  	this.fillWidth = ((this.c.width/2) / 100) * 81;
		  	this.borderWidthFill = ((this.c.width/2) / 100) * 90;
		  	this.borderWidth = ((this.c.width/2) / 100) * 20;
		  	//this.percent =  100;
		  	this.center = this.c.width / 2;
		  	this.c.height = this.c.width;
		  	this.timeout = 0;
		  	this._createStaticView();
		  	this._createDynamicView();
    	},

    	_createStaticView: function(){
    		//create fill circle
			this.ctx.beginPath();
			this.ctx.arc(this.position,this.position,this.fillWidth,0,2*Math.PI);
			var gradientColor = this.ctx.createLinearGradient(this.c.width/4,this.c.width/4,this.c.width/0.5, this.c.width/0.5);
			gradientColor.addColorStop(0,this.options.fillColor);
			gradientColor.addColorStop(1,"#FFFFFF");
			this.ctx.fillStyle = gradientColor;
			this.ctx.fill();
			//create fill circle static border
		    this.ctx.beginPath();
			this.ctx.arc(this.position ,this.position ,this.borderWidthFill ,0, 100);
			this.ctx.strokeStyle= this.options.staticStrokeColor;
			this.ctx.lineWidth=this.borderWidth;
			this.ctx.stroke(); 
		},

		addValue: function(n){
			console.log(n);
			clearTimeout(this.timeout);
			this.options.percent = n;
			this._createDynamicView();
		},
		
		_createDynamicView:function(){
		  this.timeout = window.setTimeout(this._dynamicView.bind(this), 10);
		},
		
		_dynamicView:function(){
			if(this.last_position < this.options.percent){
				this.last_position++;
			} else {
				this.last_position--;
			}	
		
			if(this.last_position<0 || this.last_position>100){
				clearTimeout(this.timeout);
				return false;
			}

			this.ctx.clearRect(0, 0, this.c.width, this.c.height);
			this._createStaticView();
			this.ctx.beginPath();
			this.ctx.arc(this.position ,this.position ,this.borderWidthFill ,0, ((2*Math.PI) / 100) * this.last_position);
			var gradientColor = this.ctx.createLinearGradient(this.c.width/3,this.c.width/3,this.c.width/0.8, this.c.width/0.8);
			gradientColor.addColorStop(0,this.options.dynamicStrokeColor);
			gradientColor.addColorStop(1,"#FFFFFF");
			this.ctx.strokeStyle= gradientColor;
			this.ctx.lineWidth= this.borderWidth;
			this.ctx.stroke();

			this.ctx.save();
			this.ctx.beginPath();
			if(this.options.textShadow){
				this.ctx.shadowColor = "#000000";
				this.ctx.shadowOffsetX = 2; 
				this.ctx.shadowOffsetY = 2; 
				this.ctx.shadowBlur = 4;
			}
			this.ctx.textAlign = "center";
			this.ctx.font = ""+parseInt(this.borderWidth*2)+"px "+this.options.fontStyle;
			this.ctx.textBaseline = 'alphabetic';
			this.ctx.scale(1,1);
			this.ctx.fillStyle = this.options.fontColor;
			this.ctx.fillText(this.last_position+"%",this.position+((this.borderWidth*2)/3.5),this.position+((this.borderWidth*2)/3));
			this._createDynamicView();
			this.ctx.restore();

			if(this.last_position == this.options.percent ){
				clearTimeout(this.timeout);
			this.last_position = this.options.percent;
			return false;
			}
		}
    });


    $.fn[ pluginName ] = function( options ) {
        return this.each( function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" +
                    pluginName, new Plugin( this, options ) );
            }
        } );
    };

} )( jQuery, window, document );