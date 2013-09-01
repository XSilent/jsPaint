/**
 * FileLoader - for accessing images
 * from local filesystem
 *
 * @param canvasHandler
 * @param fileSelectorId
 * @constructor
 */
var FileLoader = function(canvasHandler, fileSelectorId, resizeCanvas)
{
	var that = this;
	var _canvasHandler = canvasHandler;
	var _fileSelectorId = fileSelectorId;
	var _resizeCanvas = resizeCanvas;

	/**
	 *
	 * @param event
	 */
	this.handleFileSelect = function(event)
	{
		var files = event.target.files; // get FileList object

		that.fileToCanvas(files[0], _canvasHandler)
	};

	/**
	 * Render given file to given canvas
	 *
	 * @param file
	 * @param canvasHandler
	 */
	this.fileToCanvas = function(file, canvasHandler)
	{
		try {
			var image = new Image();

			var reader = new FileReader();

			// asynchronous loading with anonymouse
			// function, assigned to the onload event
			reader.onload = (function(aImg) { return function(e)
			{
				aImg.src = e.target.result;

				var canvas = canvasHandler.getContext('2d');

				if (_resizeCanvas) {
					canvas.canvas.height = image.height;
					canvas.canvas.width = image.width;
				}

				var destX = canvas.canvas.width;
				var destY = canvas.canvas.height;

				if (image.width < destX) {
					destX = image.width;
				}

				if (image.height < destY) {
					destY   = image.height;
				}

				canvas.drawImage(image, 0, 0, destX, destY);
			}; })(image);

			reader.readAsDataURL(file);

		} catch(e) {
			alert('Some error occurred: Could not open select file');
		}
	};

	// register event listener on file selector
	if (_fileSelectorId !== null) {
		document.getElementById(_fileSelectorId).addEventListener('change', this.handleFileSelect, false);
	}
};
