( function() {
	
	const scenario = parseInt(sessionStorage.getItem("scenario"));
	const isReview = parseInt(sessionStorage.getItem("review"));
	
	if (isReview === 1) {
		window.location.href = "review.html";
	}
	
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
	
	let htmlString = "";
	for (let i = 0; i < sortedPosts.length; i++) {
		const sortedPost = sortedPosts[i];
		
		htmlString += "<li><h2>" + sortedPost.name + "</h2><ul>";
		
		for (let j = 0; j < sortedPost.items.length; j++) {
			const sortedPostItem = sortedPost.items[j];
			
			htmlString += "<li>";
			
			htmlString += "<h3>" + sortedPostItem.Title + "</h3>";
			htmlString += "<p>You answered: <strong>" + parseRisk(sortedPostItem.UserAnswer) + "</strong> with the following reason(s): </p>";
			htmlString += "<p>" + sortedPostItem.UserReason + "</p>";
			
			htmlString += "</li>";
		}
		
		htmlString += "</ul></li>";
		
	}
	
	if (htmlString !== "") {
		document.querySelector(".js-user-answers").innerHTML += htmlString;
	}
	
	window.addEventListener("click", (ev) => {
		
		const goBackBtn = ev.target.closest(".js-reflection-back");
		const reviewBtn = ev.target.closest(".js-scenario-review");
		
		if (goBackBtn) {
			window.location.href = "scenario-" + scenario + ".html";
		}
		
		if (reviewBtn) {
			window.location.href = "review.html";
		}
		
	});
	
	
}() );