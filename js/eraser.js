var Eraser = function()
{
	this.setFrontColor = function(unusedVar) 
	{
		this.frontColor = new Array(0,0,0,0);
	}
	
	this.drawStart = function(event, canvasContext) 
	{
		this.active = true;
		this.draw(event, canvasContext);
	}
	
	this.drawStop = function(event, canvasContext)
	{
		this.draw(event, canvasContext);
		this.active = false;
	}
	
    this.draw = function(event, canvasContext) {
	    if (!this.active) return;

	    var width = 16;
		var point = this.translateCoordinates(event, canvasContext);
		var x = point.x;
		var y = point.y;
		var leftX = Math.max(x - (width/2),0);
		var deltaX = Math.min(x + (width/2),canvasContext.canvas.width - 1) - leftX;
		var topY = Math.max(y - (width/2),0);
		var deltaY = Math.min(y + (width/2),canvasContext.canvas.height - 1) - topY;
		
		
		var extract = canvasContext.getImageData(leftX, topY, deltaX, deltaY);

		for(var i=0;i < extract.data.length;i = i + 4) {
			extract.data[i] = this.frontColor[0];
			extract.data[i+1] = this.frontColor[1];
			extract.data[i+2] = this.frontColor[2];
			extract.data[i+3] = this.frontColor[3];
		}
		
		canvasContext.putImageData(extract, leftX, topY);
    }
};
Eraser.prototype = new Tool();