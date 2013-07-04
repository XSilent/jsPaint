/*
Dies ist die Verwaltung von jsPaint.
Eigenschaften: 
	pfad = Speicherort

Methoden:
	laden = Daten holen
	speichern = Daten speichern
	rueckgaengig = letzte Aktion verwerfen und vorherigen Stand wieder herstellen
	neu = Neue leere Zeichenfläche erstellen
*/

function Verwaltung ()
	{
		//local storage
		var _pfad = '';
		var _session = '';
		
		// Wie machen wir das?
		var sessionId = '';
	
		this.laden = function ()
			{
			console.log('hier wird geladet');
			}
			
		this.speichern = function ()
			{
			console.log('hier wird gespeichert);
			}
			
		this.rueckgaengig = function ()
			{
			console.log('hier wird gerueckgaengigt');
			}
			
		this.neu = function ()
			{
			console.log('hier wird geneut');
			}
		
	}