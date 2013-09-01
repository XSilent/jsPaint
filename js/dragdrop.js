/**
 * DragDrop functionality for jsPaint
 *
 * @constructor
 */
var DragDrop = function(canvasHandler)
{
	var that = this;
	var _canvasHandler = canvasHandler;
	var _dropzoneId = null;

	/**
	 * init
	 *
	 * @param dropzoneId
	 */
	this.init = function(dropzoneId)
	{
		_dropzoneId = dropzoneId;

		_registerEventListener();
	};

	/**
	 * register all event listener
	 *
	 * @private
	 */
	function _registerEventListener()
	{
		var bodyTag = document.getElementsByTagName('body')[0];

		bodyTag.addEventListener('dragover', that.dragOver);

		document.getElementById(_dropzoneId).addEventListener('drop', that.drop);
	}

	/**
	 * Draw dropped image on canvas
	 *
	 * @param event
	 */
	this.drop = function(event)
	{
		//event.stopPropagation();
		event.preventDefault();

		var canvas = _canvasHandler.getContext('2d');
		var url = event.dataTransfer.getData('Url');

		try {
			var image = new Image();

			image.crossOrigin = ''; // @To-do Investigate more about this security issue! --XSilent
			image.src = url;

			var destX = canvas.canvas.width;
			var destY = canvas.canvas.height;
			var pointStart = _translateCoordinates(event, canvas);

			if (image.width < destX) {
				destX = image.width;
			}

			if (image.height < destY) {
				destY   = image.height;
			}

			canvas.drawImage(image, pointStart.x, pointStart.y, destX, destY);
		} catch(e) {
			alert('Sorry, could not place image on canvas!');
		}

		document.getElementById(_dropzoneId).style.border = '1px solid #428bca';

		return true;
	};

	/**
	 *
	 * @param event
	 */
	this.dragOver = function (event)
	{
		event.preventDefault();

		if (event.target.id === 'myCanvas' || event.target.id === 'bla') {
			document.getElementById(_dropzoneId).style.border = 'dotted 6px grey';
		} else {
			document.getElementById(_dropzoneId).style.border = '1px solid #428bca';
		}

		return false;
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