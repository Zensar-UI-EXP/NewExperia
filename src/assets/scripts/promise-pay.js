switchSideTab = function (tabClassName) {
	let hideelements = document.getElementsByClassName('sidetab');
	for (ele of hideelements) {
		if (ele.className.indexOf(tabClassName) > -1) {
			ele.setAttribute("active", true);
			ele.style.display = "block";
		} else {
			ele.removeAttribute("active");
			ele.style.display = "none";
		}
	}
	let tabnavElements = document.getElementsByClassName('sidetabnav');
	for (ele of tabnavElements) {
		if (ele.className.indexOf(tabClassName) > -1) {
			ele.setAttribute("aria-selected", true);
		} else {
			ele.setAttribute("aria-selected", false);
		}
	}
}

switchParentTab = function (tabId, focusOnNotes) {
	let tabElement = document.getElementById("tab-"+tabId);
	let panelElement = document.getElementById("tab-panel-"+tabId);
	let panelElements = document.getElementsByClassName("accountsTabPanel");
	let tabElements = document.getElementsByClassName("accountsTab");
	for (let i = 0; i <= tabElements.length; i++) {
		let element = tabElements[i];
		/*if (tabId == 3 && element && element.id === "tab-0") {
			element.setAttribute("aria-selected", true);
		} else*/ if (element) {
			element.setAttribute("aria-selected", false);
		}
	}
	for (let i = 0; i <= panelElements.length; i++) {
		let element = panelElements[i];
		if (element) {
			element.removeAttribute("active");
			element.setAttribute("aria-hidden", true);
			element.setAttribute("tabindex", "-1");
		}
	}
	tabElement.setAttribute("aria-selected", true);
	panelElement.setAttribute("active", true);
	panelElement.setAttribute("aria-hidden", false);
	panelElement.setAttribute("tabindex", "0");
	// if (tabId == 3) {
	// 	document.getElementById("promiseActivity").click();
	// 	document.getElementById("promise__actsection").children[0].children[1].children[0].classList.add("promisepay--linkactive");
	// }
	// let accountsActivityElement = document.getElementById("accountsActivity");
	// if (focusOnNotes) {
	// 	let accountsNotesElement = accountsActivityElement.children[1];
	// 	getElement("accountsActivity", false, 0, accountsNotesElement, true);
	// 	let noteElement = document.getElementById("notes__text");
	// 		noteElement.focus();
	// } else {
	// 	let accountsNotesElement = accountsActivityElement.children[1];
	// 	getElement("accountsActivity", true, -1, accountsNotesElement);
	// }
}

gotoPage = function (pagePath) {
	window.location.href = pagePath;
}

setTabAria = function (element, setProperty, setTabindex, removeAttr) {
	if (element && !removeAttr) {
		element.setAttribute("aria-hidden", setProperty);
		element.setAttribute("tabindex", setTabindex);
	} else if (element && removeAttr) {
		element.removeAttribute("aria-hidden");
		element.removeAttribute("tabindex");
	}
}

setAllElements = function (elements, setProperty, setTabindex, removeAttr) {
	for (let i = 0; i <= elements.length; i++) {
		let element = elements[i];
		setTabAria(element, setProperty, setTabindex, removeAttr);
		if (element && element.children && element.children.length) {
			setAllElements(element.children, setProperty, setTabindex, removeAttr);
		}
	}
}

getElement = function (elementId, setProperty, setTabindex, element, removeAttr) {
	let activityElement = element || document.getElementById(elementId);
		setTabAria(activityElement, setProperty, setTabindex, removeAttr);
	if (activityElement && activityElement.children && activityElement.children.length) {
		setAllElements(activityElement.children, setProperty, setTabindex, removeAttr);
	}
}

getElement("profileActivities", true, -1);
getElement("promise__actsection", true, -1);
getElement("promiseProfile", true, -1);
let accountsActivityElement = document.getElementById("accountsActivity");
if (accountsActivityElement){
	let accountsNotesElement = accountsActivityElement.children[1];
	getElement("accountsActivity", true, -1, accountsNotesElement);
}
let profileElement = document.getElementById("profileContact");
if (profileElement) {
	let profileThirdElement = profileElement.children[2];
	getElement("profileContact", true, -1, profileThirdElement);
}

toggleMemo = function () {
	let memoElement = document.getElementsByClassName("memodetail");
	for (let i = 0; i <= memoElement.length; i++){
		let element = memoElement[i];
		let activeValue = element.getAttribute("active") == "true" ? false : true;
		element.setAttribute("active", activeValue);
		element.children[0].setAttribute("aria-expanded", activeValue);
	}
}

// document.addEventListener('focus',function(e){
// 	console.log(e);
// }, true);
addRemoveClass = function (headingId, panelId) {
	let collectionElement = document.getElementById(headingId);
	let collectionPanel = document.getElementById(panelId);
	collectionElement.addEventListener('focus',function(e){
		collectionPanel.classList.add("focus");
	}, true);
	collectionElement.addEventListener('blur',function(e){
		collectionPanel.classList.remove("focus");
	}, true);
}
const path = window.location.pathname;
const page = path.split("/").pop();
if (page && page !== "index.html" && page !== "dashboard.html") {
	// document.getElementsByClassName("textNote")[1].removeAttribute("for");
	// document.getElementsByClassName("textNote")[2].removeAttribute("for");	
	addRemoveClass("accountFirstHeading", "accountFirstPanel");
	addRemoveClass("collectionHeading", "collectionPanel");
	switchParentTab(0);
}

showhideblocks = function (showElementId = null, hideElementId) {
	if (showElementId) document.getElementById(showElementId).style.display = showElementId === "accountTab" ? "inline-block" : "block";
	if (hideElementId) document.getElementById(hideElementId).style.display = "none";
	if (showElementId === "accountTab") switchParentTab('1');
	if (hideElementId === "accountTab") switchParentTab('0');
}

switchaccarrtab = function (tabparam) {
	document.getElementById('arrdetail').style.display = tabparam === 'arr' ? "block" : "none";
	document.getElementById('accoutiedetail').style.display = tabparam === 'arr' ? "none" : "block";
	document.getElementById('accdetail').style.display = tabparam === 'arr' ? "none" : "block";
	var updateClassName = document.querySelector('.promisepay--navtablinkactive').className.replace('promisepay--navtablinkactive', '');
	document.querySelector('.promisepay--navtablinkactive').className = updateClassName;
	document.getElementById(tabparam + 'tab').className = document.getElementById(tabparam + 'tab').className + ' promisepay--navtablinkactive';
	if (tabparam === 'arr') {
		document.getElementById('arrangementinitial').style.display = "block";
		document.getElementById('generatearrangement').style.display = "none";
		document.getElementById('createarrangement').style.display = "none";
		document.getElementById('completearrangement').style.display = "none";
		let arrLinks = document.getElementsByClassName('arrangementlink');
		for (link of arrLinks) {
			link.className += 'active';
		}
	} else {
		let arrLinks = document.getElementsByClassName('arrangementlink');
		for (link of arrLinks) {
			link.className = 'style-scope arrangementlink eds-tabs';
		}
	}
}

gotoArr = function () {
	let arrLinks = document.getElementsByClassName('arrangementlink');
	for (link of arrLinks) {
		if (link.className.indexOf('active') > -1) link.className += 'active';
	}
	showhideblocks('accountTab');
	switchaccarrtab('arr');
}