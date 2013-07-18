alert("Hallo Wurst!");

var CanvasHandler = function () {

	var canvasElement;
	var history;
	var dimensions = {
		width: '400',
		height: '300'
	}

	this.setCanvas = function(element) {
		this.canvasElement = element;
	}
	
	this.createNewCanvas = function(parent, id, width, height) {
		var c = document.createElement('canvas');
		container = document.getElementById(parent);
		container.appendChild(c);
		//document.getElementById(parent).innerHtml = '<canvas id="' + id + '" width="' + width + '" height="' + '"></canvas>';
		// this.canvasElement = document.getElementById(id);
		this.canvasElement = c;
		this.drawSomething();
	}
	
	this.drawSomething = function() {
		var ctx = this.canvasElement.getContext("2d");
		ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
	}
}