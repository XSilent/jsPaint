/*
This is the admin of jsPaint

methods:
	getSessionID = checks for a sessionID in localStorage and adds one if none is found
	//loadArt = get a canvas
	saveArt = save canvas
	undoArt = revert the last action
	newArt = get a new empty canvas
	deleteArt = delete your work	
	listArt = creates buttons showing all content of localStorage. with onclick event calling loadExternal
*/



/* a function to generate a unique key.
got it here: http://stackoverflow.com/a/873856 
needed for getSessionID
*/

/*
//SessionID Stuff not needed

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}



// checks for sessionID in localStorage and adds one if none is found
function getSessionID () {

	var sessionID = localStorage.getItem('sessionID');
	
	if (sessionID == null)
		{
			sessionID = createUUID();
			localStorage.setItem('sessionID',sessionID);
			console.log('added a sessionID to localStorge(sessionID)');
		};
		
	return sessionID;
}
*/


/*

// intergrated this in loadExternal

function loadArt (artName) {
	if ( artName == null) {
	artName = prompt('Welche Kust soll geladen werden? ');
	}

	return localStorage.getItem(artName);
}
*/


function saveArt (inputZeichenflaeche) {
	console.log('saving...');
	var artName = prompt('Bitte Namen eingeben:');

	if (localStorage.getItem(artName) == null) {
		localStorage.setItem(artName,inputZeichenflaeche)
	} else {
		prompt('Name schon vergeben. Willst du wirklich ueberschreiben? Sonst hier neuen Namen eingeben',artName);
		localStorage.setItem(artName,inputZeichenflaeche);
	}

}


function deleteArt () {

	localStorage.clear();
	
	console.log('cleared localStorage');
}


function listArt () {
	var	artList = 'Art in Stock:</br>';
	for(var i in localStorage) {
		artList = artList + '<button onclick="loadExternal(\'' +i+ '\')">' + i + '</button>';

	}
	return artList;
}

