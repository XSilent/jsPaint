var Brush = function()
{
	this.setFrontColor = function(colorString) 
	{
		this.frontColor = colorString;
	};
	
	this.drawStart = function(event, canvasContext) 
	{
		this.active = true;
		this.draw(event, canvasContext);
	};
	
	this.drawStop = function(event, canvasContext)
	{
		this.draw(event, canvasContext);
		this.active = false;
	};
	
    this.draw = function(event, canvasContext) 
	{
		if (!this.active) return;
		
	    var width = 10;

	        // if( !(canvasContext instanceof  'CanvasRenderingContext2D') ) {
	        // console.log('not right');
	        // }
	        var posX = event.clientX;
	        var posY = event.clientY;

	        var point = this.translateCoordinates(event, canvasContext);

	        //console.log(canvasContext);
	        //canvasContext.moveto(posX,posY);
	        //canvasContext.lineto(posX,posY);

	        canvasContext.beginPath();
	        canvasContext.fillStyle = this.frontColor;
	        //canvasContext.arc(posX,posY,width,0,Math.PI * 2,false);
	        canvasContext.arc(point.x, point.y, width, 0, Math.PI * 2, false);
	        canvasContext.closePath();
	        canvasContext.fill();
	        //canvasContext.stroke(posX,posY);
    };
};
Brush.prototype = new Tool();