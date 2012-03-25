function findLinkMatches(prefix, linkText) {
	// Display link results if prefix is a substr of an entry's path
	
	results = []; // TODO: Make local after debugging
	
	for (var i=0; i < Entries.length; i++) {
		var entry = Entries[i];
				
		if ( entry.path.match(prefix) ) {
			var theseResults = findLinks(entry, linkText);

			if (theseResults.length > 0) {
				results = results.concat(theseResults);
			}
		}
	}

	console.log("results:", results)	
	return results
}

function findLinks(entry, linkText) {
	var results = []
	
	if (entry['links'] === undefined) {
		// console.log("Entry:", entry, " has no links")
		return []
	}
	
	for(var i=0; i < entry.links.length; i++) { 
		var link = entry.links[i];
		match = link.name.match(linkText);

		if ( match ) {
			var thisMatch = match[0];
			var name = [];
			var index = link.name.indexOf(thisMatch);
			
			name.push( link.name.substr(0,index) );
			name.push( "<match>" + thisMatch + "</match>");
			name.push( entry.path.substr(index + thisMatch.length, link.name.length) );
			name = name.join('');
			
			var description = entry.path + " : ";
			
			if (link.type == "func") {
				description += link.signature;
			} else {
				description += link.name;				
			}
			
			if (description.length > 77) {
				description = description.substr(0,76) + "..."
			}			
			
			var result = {
				"content" : link.href,
				"description" : description
			}
			
			results.push(result);
			
			if (results.length > 5) {
				return results
			}
		}

	}
	
	return results
}


function findMatches(searchTerm) {
	var matches = [];	
	// Dumb search
	for(var i=0; i < Entries.length; i++) {
		var entry = Entries[i];
		match = entry.path.match(searchTerm);
		if (match) {
			var thisMatch = match[0];
			var pathMatch = [];
			var index = entry.path.indexOf(thisMatch);
			
			pathMatch.push( entry.path.substr(0,index) );
			pathMatch.push( "<match>" + thisMatch + "</match>");
			pathMatch.push( entry.path.substr(index + thisMatch.length, entry.path.length) );
			pathMatch = pathMatch.join('');
			
			var description = pathMatch + " : " + entry.desc;
			if (description.length > 77) {
				description = description.substr(0,76) + "..."
			}

			var result = {
				"content" : entry.path,
				"description" : description
			}
			
			matches.push(result);
		}
		
		if (matches.length > 5) {
			// Only 5 are shown anyway
			return matches
		}
	}
	
	return matches;
}