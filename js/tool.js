var Tool = function()
{
	var active = false;
	var frontColor;

	/**
	 * Translate global coordinates
	 * from event object to the canvas
	 * from the given context
	 *
	 * @param event
	 * @param context
	 */
	this.translateCoordinates = function(event, canvasContext)
	{
		var bb = canvasContext.canvas.getBoundingClientRect();
		var point = new Point();

		point.x = (event.clientX - bb.left);
		point.y = (event.clientY - bb.top);

		return point;
	};

};