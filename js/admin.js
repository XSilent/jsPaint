var Admin = function()
{
	var myCanvasHandler;
	var undoButton;
	
	this.setCanvasHandler = function(handler)
	{
		myCanvasHandler = handler;
	};
	this.setUndoButton = function(button)
	{
		undoButton = button;
	};
	this.checkUndoButton = function()
	{
		document.getElementById(undoButton).disabled = !myCanvasHandler.canUndo();
	};
	
	this.saveArt = function(inputZeichenflaeche)
	{
		var artName = prompt('Bitte Namen eingeben:');
		if (localStorage.getItem(artName) == null) {
			localStorage.setItem(artName,inputZeichenflaeche)
		} else {
			prompt('Name schon vergeben. Willst du wirklich ueberschreiben? Sonst hier neuen Namen eingeben',artName);
			localStorage.setItem(artName,inputZeichenflaeche);
		}
	};

	this.listArtLi = function()
	{
		var	artList = '';
		for(var i in localStorage) {
			artList = artList + '<li><a href="#" onclick="loadExternal(\'' +i+ '\')">' + i + '</a></li>';
		}
		return artList;
	};

	this.listArtBtn = function()
	{
		var	artList = 'Art in Stock:</br>';
		for(var i in localStorage) {
			artList = artList + '<button onclick="loadExternal(\'' +i+ '\')" class="btn btn-primary">' + i + '</button>';
		}
		return artList;
	};

	this.saveIt = function()
	{
	  this.saveArt(myCanvasHandler.export());
	  listArtInOutput();
	};

	this.loadExternal = function(id)
	{
	  if (id == null) {
		id = prompt('Welche Kust soll geladen werden? ');
		myCanvasHandler.import(localStorage.getItem(id));
		this.checkUndoButton();
	  } else {
		myCanvasHandler.import(localStorage.getItem(id));
	  }
	  //document.getElementById('textarea_as_store').innerHTML = myHandler.export();
	  //myCanvas.removeEventListener('mousedown',function(event){tool.draw(event, content);});
	  //myCanvas.removeEventListener('mousemove',function(event){tool.draw(event, content);},false);
	};

	this.undoLast = function() {
	  myCanvasHandler.revertToLastSnapshot();
	  this.checkUndoButton();
	};

	this.makeNew = function() {
	  myCanvasHandler.clearAll();
	  this.checkUndoButton();
	};
	
	/**
     * Fullscreen
     *
     * Not yet stabilized HTML5 feature,
     * therefore we have to ask for several
     * possibilities
     *
     * Not nice ...
     */
	this.fullscreen = function()
	{
		var elem = document.getElementById('jsPaintContainer');

		if (!isFullscreen) {
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}

			if (document.cancelFullscreen) {
				document.cancelFullScreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
		}

		isFullscreen = !isFullscreen;
	};
	
	/**
     * Trigger the hidden file selector
     * to start processing files from
     * local filesystem
     */
	this.loadFromDisk = function()
	{
		document.getElementById('files').click();
	};

};
