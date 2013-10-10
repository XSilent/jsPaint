var Tools = function() 
{
	var _canvasHandler;
	var _palette;
	var _toolslist = [];
	var _currentTool;
	
	//use this to add all existing tools
	this.addTool = function(id, object)
	{
		_toolslist[id] = object;
	};
	
	//switch the tool to be used
	this.setSelected = function(id)
	{
		if (_toolslist[id] != null) {
			_currentTool = id;
		}
	};
	
	this.setPalette = function(paletteObj) 
	{
		_palette = paletteObj;
	};
	
	this.setCanvasHandler = function(handlerObj) 
	{
		_canvasHandler = handlerObj;
	};
	
	this.useCurrent = function(event, context) 
	{
		if (_currentTool == null) return;
		
		var usedTool = _toolslist[_currentTool];
		
		if (event.type == 'mousedown') {
			usedTool.setFrontColor(_palette.getFrontColor());
			usedTool.drawStart(event, context);
			return;
		}
		if (event.type == 'mouseup' || event.type == 'mouseout') {
			usedTool.drawStop(event, context);
			if (_canvasHandler) {
				_canvasHandler.addHistorySnapshot();
			}
			return;
		}
		
		usedTool.draw(event, context)
	};
};
