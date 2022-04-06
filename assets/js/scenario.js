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
	
	const reflectBtn = document.querySelector(".js-scenario-reflect");
	const state = JSON.parse(sessionStorage.getItem("state"));
	const posts = state.Posts;
	
	let allPostsAnswered = true;
	
	for (let i = 0; i < posts.length; i++) {
		const post = posts[i];
		const postEl = document.querySelector(".js-post[data-post-id='" + post.Id + "']");
		
		postEl.querySelector(".js-user-viewed").innerHTML = post.UserViewed;
		postEl.querySelector(".js-user-answer").innerHTML = parseRisk(post.UserAnswer);
		
		if (post.UserAnswer === -1 && allPostsAnswered)
			allPostsAnswered = false;
	}
	
	if (allPostsAnswered) {
		reflectBtn.disabled = false;
	}
	
	window.addEventListener("click", (ev) => {
		
		const postSelectBtn = ev.target.closest(".js-post-select");
		const reflectBtn = ev.target.closest(".js-scenario-reflect");
		
		if (postSelectBtn) {
			
			const id = parseInt(postSelectBtn.getAttribute("data-post-id"));
			
			sessionStorage.setItem("post", id);
			window.location.href = "post.html";
			
			ev.preventDefault();
		}
		
		if (reflectBtn && reflectBtn.disabled == false) {
			
			window.location.href = "reflection.html";
			ev.preventDefault();
		}
		
	});
	
	
}() );