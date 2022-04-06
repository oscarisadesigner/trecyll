( function() {
	
	const scenario = parseInt(sessionStorage.getItem("scenario"));
	const state = JSON.parse(sessionStorage.getItem("state"));
	
	const resumeBtn = document.querySelector(".js-continue-scenario");
	
	if (scenario !== null && state !== null) {
		resumeBtn.style.display = "block";
		resumeBtn.disabled = false;
	}
	
	window.addEventListener("click", (ev) => {
		
		const scenarioSelectBtn = ev.target.closest(".js-scenario-select");
		const resumeScenario = ev.target.closest(".js-continue-scenario");
		
		if (scenarioSelectBtn) {
			const id = parseInt(scenarioSelectBtn.getAttribute("data-scenario-id"));
			
			sessionStorage.clear();
			sessionStorage.setItem("scenario", id);
			window.location.href = scenarioSelectBtn.getAttribute("href");
			
			ev.preventDefault();
		}
		
		if (resumeScenario) {
			window.location.href = "scenario-" + scenario + ".html";
			ev.preventDefault();
		}
		
	});
	
}() );