/**
 * ToolEffects
 *
 * Some (experimental) tools
 *
 * @constructor
 */
var ToolEffects = function(canvasHandler)
{
	/**
	 *
	 * @type {*}
	 * @private
	 */
	var _canvasHandler = canvasHandler;

	/**
	 * contrast - addjust by the
	 * given value (negativ/positve).
	 *
	 * Indeed needs much improvement on algorithm ;-)
	 *
	 * @param value
	 */
	this.contrast = function(value)
	{
		var context = _canvasHandler.get2DContext();

		var pixel = context.getImageData(0, 0, context.canvas.width, context.canvas.height);

		for(var i=0;i < pixel.data.length;i = i + 4) {
			//pixel.data[i] += value;
			//pixel.data[i+1] += value;
			//pixel.data[i+2] += value;
			pixel.data[i+3] += value;
		}

		context.putImageData(pixel, 0, 0);
	};

	/**
	 * noise
	 *
	 * very simple algorithm!
	 */
	this.noise = function()
	{
		var context = _canvasHandler.get2DContext();
		var pixel = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
		var value;

		for(var i=0;i < pixel.data.length;i = i + 4) {

			value = Math.random();

			pixel.data[i] = pixel.data[i] * value;
			pixel.data[i+1] = pixel.data[i+1] * value;
			pixel.data[i+2] = pixel.data[i+2] * value;
			pixel.data[i+3] = pixel.data[i+3] * value;
		}

		context.putImageData(pixel, 0, 0);
	};

	/**
	 * Invert colors
	 */
	this.invert = function()
	{
		var context = _canvasHandler.get2DContext();
		var pixel = context.getImageData(0, 0, context.canvas.width - 4, context.canvas.height - 4);
		var value;

		for(var i=0;i < pixel.data.length;i = i + 4) {

			pixel.data[i] = 255 - pixel.data[i];        // R
			pixel.data[i+1] = 255 - pixel.data[i+1];    // G
			pixel.data[i+2] = 255 - pixel.data[i+2];    // B
			pixel.data[i+3] = 255 - pixel.data[i+3];    // Alpha
		}

		context.putImageData(pixel, 0, 0);
	};

	/**
	 * Invert colors
	 */
	this.grayscale = function()
	{
		var context = _canvasHandler.get2DContext();
		var pixel = context.getImageData(0, 0, context.canvas.width - 4, context.canvas.height - 4);
		var value;

		for(var i=0;i < pixel.data.length;i = i + 4) {
			var brightness = 0.34 * pixel.data[i] + 0.5 * pixel.data[i + 1] + 0.16 * pixel.data[i + 2];

			pixel.data[i] = brightness;
			pixel.data[i+1] = brightness;
			pixel.data[i+2] = brightness;
		}

		context.putImageData(pixel, 0, 0);
	};

	/**
	 * Rotate current image
	 */
	this.rotate = function(degree)
	{
		if (degree == null) {
			return false;
		}

		var context = _canvasHandler.get2DContext();
		var img = new Image();

		// To ensure action on image
		// will only start when loading
		// is done:
		img.onload = function()
		{
			_drawRotated(context, img, degree);
		};

		// Load current canvas as image
		img.src = context.canvas.toDataURL();

		return true;
	};

	/**
	 * Draw given image rotated
	 * by given degrees onto given
	 * context
	 *
	 * @param context
	 * @param image
	 * @param degrees
	 * @private
	 */
	function _drawRotated(context, image, degrees)
	{
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.save();
		context.translate(context.canvas.width / 2, context.canvas.height / 2 - 20);
		context.rotate(degrees * Math.PI / 180);
		context.drawImage(image, -image.width / 2, -image.width / 2);

		context.restore();
	}
};