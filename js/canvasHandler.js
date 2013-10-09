var CanvasHandler = function () 
{

	var that = this;
	var canvasElement = document.createElement('canvas'); //not empty
	var history = [];
	var dimensions = {
		width: '400',
		height: '300'
	};
	
	//private function
	function createNewCanvas (id, width, height) {
		var c = document.createElement('canvas');
		c.id = id;
		c.setAttribute('width', width);
		c.setAttribute('height', height);
		canvasElement = c;
		dimensions.width = width;
		dimensions.height = height;

		history = [];
		that.addHistorySnapshot(); //'this' has another scope in private functions
		
		return c;
	}

	//public function, instruct this handler to use an existing Canvas Element
	this.useExistingCanvas = function(id) 
	{
		existingCanvas = document.getElementById(id);
		canvasElement = existingCanvas;
		
		dimensions.width = canvasElement.width;
		dimensions.height = canvasElement.height;
		
		history = [];
		this.addHistorySnapshot();
	};
	
	//appends a new canvas as child to a html node and
	this.appendNewCanvas = function(parent, id, width, height) 
	{
		var c = createNewCanvas(id, width, height);
		container = document.getElementById(parent);
		container.appendChild(c);
	};
	
	//public function, analog to canvas usage
	this.getContext = function(type)
	{
		return canvasElement.getContext(type);
	}
	
	//public function, prefered for faster typing
	this.get2DContext = function()
	{
		return canvasElement.getContext("2d");
	}
	
	//public function, get ImageDataObject for storing/saving or image filters
	this.getWholeImageObject = function() 
	{
		var $dataObject = this.get2DContext().getImageData(0, 0, dimensions.width, dimensions.height);
		//main dataObject structure:
		// { //public variables/properties
		//	 this.width, this.height;
		//   this.data = {(not an array) data[0] = red of pixel 1, data[1] = green .. data[3] is alpha of pixel 1, data[4] = red of pixel 2 ...
		//       so, data.length is 4 times the count of pixels (width * height)
		// }
		return $dataObject;
	}
	
	//public function, set an image object as canvas image, usable for tools
	this.setImageObject = function(imageObject) 
	{
		canvasElement.setAttribute('width', imageObject.width);
		canvasElement.setAttribute('height', imageObject.height);
		this.get2DContext().width = imageObject.width;
		this.get2DContext().height = imageObject.height;
		this.get2DContext().putImageData(imageObject, 0, 0);
	}
	
	//public function, returns an empty image object with the current dimensions
	this.getClearImageObject = function(width, height)
	{
		return this.get2DContext().createImageData(width, height);
	}
	
	//public function, call this function to create a new history snapshop of the canvas
	this.addHistorySnapshot = function()
	{
		history.push(this.getWholeImageObject());
	}
	
	//public function, use this as 'undo'
	this.revertToLastSnapshot = function()
	{
		if (this.canUndo()) {
			history.pop();
			var imageObject = history[history.length - 1];
			canvasElement.setAttribute('width', imageObject.width);
			canvasElement.setAttribute('height', imageObject.height);
			this.get2DContext().width = imageObject.width;
			this.get2DContext().height = imageObject.height;
			this.get2DContext().putImageData(imageObject, 0, 0);
		}
	}
	
	
	//public function, use this to check for undo possibility
	this.canUndo = function()
	{
		if (history.length > 1) {
			return true;
		}
		//else
		return false;
	}
	
	
	//use this with a 'load' function to initialize the canvas with a picture
	//awaits an canvas image data object as given by 'getClearImageObject'
	this.setInitialImageData = function(imageObject) {
		canvasElement.setAttribute('width', imageObject.width);
		canvasElement.setAttribute('height', imageObject.height);
		this.get2DContext().width = imageObject.width;
		this.get2DContext().height = imageObject.height;
		this.get2DContext().putImageData(imageObject, 0, 0);
		
		history = [];
		this.addHistorySnapshot();
	}
	
	
	//public function, use this to make the canvas 'new'
	this.clearAll = function()
	{
		this.get2DContext().clearRect(0, 0, dimensions.width, dimensions.height);
	}



	//just an example
	this.export = function() {
		var imageObject = that.getWholeImageObject();
		var temp = {width : imageObject.width, height : imageObject.height, data : []};

		for (var i = 0; i < imageObject.data.length; i++) {
			temp.data[i] = imageObject.data[i];
		}

		return JSON.stringify(temp);
	}

	//just an example
	this.import = function(jsonText) {
		var myObject = JSON.parse(jsonText);
		var imageObject = that.getClearImageObject(myObject.width, myObject.height);

		for (var i = 0; i < myObject.data.length; i++) {
			imageObject.data[i] = myObject.data[i];
		}

		that.setInitialImageData(imageObject);
	}
}


//examples for the other teams
function testDrawings() {
  var content = myHandler.getContext('2d');
  content.fillStyle = "rgba(0, 0, 200, 0.5)";
  content.fillRect (0, 0, 50, 50);
  
  //call this after each step (tool usage or else)
  myHandler.addHistorySnapshot();
  
  document.getElementById('button_undo').disabled = false;
  
  content.fillStyle = "rgba(0, 200, 0, 0.5)";
  content.fillRect (25, 25, 75, 75);
  
  myHandler.addHistorySnapshot();
  
  content.fillStyle = "rgba(200, 0, 0, 0.5)";
  content.fillRect (50, 50, 100, 100);
  myHandler.addHistorySnapshot();
}

function undoLast() {
  myHandler.revertToLastSnapshot();
  document.getElementById('button_undo').disabled = !myHandler.canUndo();
}

function makeNew() {
  myHandler.clearAll();
  document.getElementById('button_undo').disabled = !myHandler.canUndo();
}