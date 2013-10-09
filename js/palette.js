var Palette = function()
{
	var colorList = [];
	var frontColor;
	
	this.addColor = function(id, rgbaString) 
	{
		colorList[id] = rgbaString;
		if (!frontColor) {
			frontColor = id;
		}
	}
	
	this.getFrontColor = function()
	{
		if (frontColor == null) {
			alert('Error: failed to get the front color');
			return;
		}
		return colorList[frontColor];
	}
}