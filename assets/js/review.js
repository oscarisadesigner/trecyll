( function() {
	
	sessionStorage.setItem("review", 1);
	
	const scenario = parseInt(sessionStorage.getItem("scenario"));
	
	if (sessionStorage.getItem("scenario") === null ||
		sessionStorage.getItem("scenario") === undefined)
		window.location.href = "index.html";
	
	if ( !Number.isInteger(scenario) )
		window.location.href = "index.html";
	
	var path = window.location.pathname;
	let scenarioPageID = parseInt(path.split("/").pop().replace('scenario-', '').replace('.html', ''));
	
	if (path === null || scenarioPageID === null)
		window.location.href = "index.html";
		
	// End of guard clauses
	
	if (sessionStorage.getItem("state") === null) {
		sessionStorage.setItem("state", JSON.stringify(data));
	}
	
	class PostGroup {
		constructor(name, items) {
			this.name = name;
			this.items = items;
		}
	}
	
	const state = JSON.parse(sessionStorage.getItem("state"));
	const posts = state.Posts;
	let sortedPosts = [];
	
	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		
		let foundPostCategory = false;
		for (let j = 0; j < sortedPosts.length; j++) {
			if (sortedPosts[j].name === post.Category ) {
				foundPostCategory = true;
				sortedPosts[j].items.push(post);
				break;
			}
		}
		
		if (!foundPostCategory) {
			sortedPosts.push(new PostGroup( post.Category, [ post ] ));
		}
	}
	
	function parseRisk(int) {
		switch (int) {
			case -1:
				return "Unanswered";
			case 0:
				return "Not Risky";
			case 1:
				return "Somewhat Risky";
			case 2:
				return "Risky";
			default:
				return "Unknown";
		}
	}
	
	function isAnswerCorrect(int, actualAnswer) {
		if (int === 0 && !actualAnswer) {
			return true;
		}
		
		if (int === 1 || int === 2 && actualAnswer) {
			return true;
		}
		
		return false;
	}
	
	function parseAnswer(bool) {
		if (bool)
			return "correct";
		return "incorrect";
	}
	
	let htmlString = "";
	for (let i = 0; i < sortedPosts.length; i++) {
		const sortedPost = sortedPosts[i];
		
		htmlString += "<li><h2>" + sortedPost.name + "</h2><ul>";
		
		for (let j = 0; j < sortedPost.items.length; j++) {
			const sortedPostItem = sortedPost.items[j];
			
			htmlString += "<li>";
			
			htmlString += "<h3>" + sortedPostItem.Title + "</h3>";
			htmlString += "<p>You answered: <strong>" + parseRisk(sortedPostItem.UserAnswer) + "</strong></p>";
			htmlString += "<p>You were " + parseAnswer(isAnswerCorrect(sortedPostItem.UserAnswer, sortedPostItem.IsRisky)) + ".</p>";
			
			htmlString += "</li>";
		}
		
		htmlString += "</ul></li>";
		
	}
	
	if (htmlString !== "") {
		document.querySelector(".js-user-answers").innerHTML += htmlString;
	}
	
	window.addEventListener("click", (ev) => {
		
		
		
	});
	
	
}() );