( function() {
	
	const state = JSON.parse(sessionStorage.getItem("state"));
	const scenarioID = parseInt(sessionStorage.getItem("scenario"));
	const postID = parseInt(sessionStorage.getItem("post"));
	const isReview = parseInt(sessionStorage.getItem("review"));
	
	if (isReview === 1) {
		window.location.href = "review.html";
	}
	
	if (state === null)
		window.location.href = "index.html";
		
	if (!Number.isInteger(scenarioID))
		window.location.href = "index.html";
		
	if (!Number.isInteger(postID))
		window.location.href = "scenario-" + scenarioID + ".html";
	
	function saveState() {
		sessionStorage.setItem("state", JSON.stringify(state));
	}
	
	let post = null;
	
	for (let i = 0; i < state.Posts.length; i++) {
		if (state.Posts[i].Id === postID) {
			post = state.Posts[i];
			break;
		}
	}
	
	post.UserViewed = true;
	saveState();
	
	const postImageEl = document.querySelector(".js-post-image");
	postImageEl.setAttribute("src", post.ImageURL);
	postImageEl.setAttribute("alt", post.ImageDescription);
	
	for (let i = 0; i < document.querySelectorAll(".js-risk-input").length; i++) {
		
		if ( post.UserAnswer === parseInt( document.querySelectorAll(".js-risk-input")[i].value ) ) {
			document.querySelectorAll(".js-risk-input")[i].setAttribute("checked", true);
		}
		
	}
	
	document.querySelector(".js-reason-input").value = post.UserReason;
	
	window.addEventListener("click", (ev) => {
		
		const goBackBtn = ev.target.closest(".js-post-back");
		const saveBtn = ev.target.closest(".js-post-submit");
		
		if (saveBtn) {
			
			const checkedRiskEl = document.querySelector(".js-risk-input:checked");
			
			if (checkedRiskEl) {
				const riskValue = parseInt(checkedRiskEl.value);
				post.UserAnswer = riskValue;
			}
			
			post.UserReason = document.querySelector(".js-reason-input").value;
			
			saveState();
			
		}
		
		if (goBackBtn || saveBtn) {
			window.location.href = "scenario-" + scenarioID + ".html";
			ev.preventDefault();
		}
		
	});
	
}() );