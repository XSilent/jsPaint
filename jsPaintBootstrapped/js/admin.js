function saveArt (inputZeichenflaeche) {
	var artName = prompt('Bitte Namen eingeben:');
	if (localStorage.getItem(artName) == null) {
		localStorage.setItem(artName,inputZeichenflaeche)
	} else {
		prompt('Name schon vergeben. Willst du wirklich ueberschreiben? Sonst hier neuen Namen eingeben',artName);
		localStorage.setItem(artName,inputZeichenflaeche);
	}
}

function listArtLi () {
	var	artList = '';
	for(var i in localStorage) {
		artList = artList + '<li><a href="#" onclick="loadExternal(\'' +i+ '\')">' + i + '</a></li>';
	}
	return artList;
}

function listArtBtn () {
	var	artList = 'Art in Stock:</br>';
	for(var i in localStorage) {
		artList = artList + '<button onclick="loadExternal(\'' +i+ '\')" class="btn btn-primary">' + i + '</button>';
	}
	return artList;
}

function saveIt() {
  saveArt(myHandler.export());
  listArtInOutput();
}

function loadExternal(id) {
  if (id == null) {
    id = prompt('Welche Kust soll geladen werden? ');
    myHandler.import(localStorage.getItem(id));
    document.getElementById('button_undo').disabled = !myHandler.canUndo();
  } else {
    myHandler.import(localStorage.getItem(id));
  }
  //document.getElementById('textarea_as_store').innerHTML = myHandler.export();
  myCanvas.removeEventListener('mousedown',function(event){tool.draw(event, content);});
  //myCanvas.removeEventListener('mousemove',function(event){tool.draw(event, content);},false);
}
