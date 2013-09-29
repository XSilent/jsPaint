/**
 * Point
 *
 * @param x
 * @param y
 * @constructor
 */
var Point = function(x, y)
{
	this.x = x;
	this.y = y;

	/**
	 * Determines if the given
	 * point is at same position
	 * than this point.
	 *
	 * @param otherPoint
	 */
	this.hitTest = function(otherPoint)
	{
		var result = false;

		if ((this.x === otherPoint.x) && (this.y === otherPoint.y)) {
			result = true;
		}

		return result;
	};

	/**
	 * Return rotated pixel
	 *
	 * @param angle
	 * @return Point
	 */
	this.rotation = function(angle)
	{
		var result = new Point(),
			c = Math.cos(angle),
			s = Math.sin(angle);

		result.x = c * this.x - s * this.y;
		result.y = s * this.x + c * this.y;

		return result;
	};
};
