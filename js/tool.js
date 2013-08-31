var Tool = function()
{

    this.draw = function(event, canvasContext) {
	    var width = 10;
	    var color = '#008000';
	        // if( !(canvasContext instanceof  'CanvasRenderingContext2D') ) {
	        // console.log('not right');
	        // }
	        var posX = event.clientX;
	        var posY = event.clientY;

	        var point = _translateCoordinates(event, canvasContext);

	        //console.log(canvasContext);
	        //canvasContext.moveto(posX,posY);
	        //canvasContext.lineto(posX,posY);

	        canvasContext.fillstyle = color;
	        canvasContext.beginPath();
	        //canvasContext.arc(posX,posY,width,0,Math.PI * 2,false);
	        canvasContext.arc(point.x, point.y, width, 0, Math.PI * 2, false);
	        canvasContext.closePath();
	        canvasContext.fill();
	        //canvasContext.stroke(posX,posY);
    };

	/**
	 * Translate global coordinates
	 * from event object to the canvas
	 * from the given context
	 *
	 * @param event
	 * @param context
	 */
	function _translateCoordinates(event, canvasContext)
	{
		var bb = canvasContext.canvas.getBoundingClientRect();
		var point = new Point();

		point.x = (event.clientX - bb.left) * (canvasContext.canvas.width / bb.width);
		point.y = (event.clientY - bb.top) * (canvasContext.canvas.height / bb.height);

		return point;
	}
};