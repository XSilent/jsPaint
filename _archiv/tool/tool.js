Tool = function() {

    this.draw = function(event,canvasContext) {
    var width = 10;
    var color = '#008000';
        // if( !(canvasContext instanceof  'CanvasRenderingContext2D') ) {
        // console.log('not right');
        // }
        var posX = event.clientX;
        var posY = event.clientY;
        //console.log(canvasContext);
        //canvasContext.moveto(posX,posY);
        //canvasContext.lineto(posX,posY);

        canvasContext.fillstyle = color;
        canvasContext.beginPath();
        canvasContext.arc(posX,posY,width,0,Math.PI * 2,false);
        canvasContext.closePath();
        canvasContext.fill();
        //canvasContext.stroke(posX,posY);
    };
};