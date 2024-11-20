/**___________________________________________________________________________________________________ **/
/*******GENERATE IDS FOR ALL NOTE RELATED ELEMENTS********/
const allHeadings = document
  .getElementById("collection")
  .querySelectorAll("h2, h3, li");
//const allNotes = document.querySelectorAll(".note-section").forEach((sec) => sec.querySelectorAll("li"));
const allLists = document.getElementById("collection").querySelectorAll("li");
console.log(allHeadings);

let countHead1 = 1;
let countHead2 = 1;
let countList = 1;

allHeadings.forEach((heading) => {
  //Create ID for a heading if it doesn't have one
  if (!heading.id) {
    if (heading.tagName[1] === "2") {
      heading.id = `section-${countHead1}`;
      //increment
      countHead1 += 1;
      //reset
      countHead2 = 1;
    } else if (heading.tagName[1] === "3") {
      heading.id = `section-${countHead1 - 1}-${countHead2}`;
      //increment
      countHead2 += 1;
      //reset
      countList = 1;
    } else if (heading.tagName == "LI") {
      console.log(heading);
      heading.id = `section-${countHead1 - 1}-${countHead2 - 1}-${countList}`;
      //increment
      countList += 1;
    }
    
  }
});

//Create ids for list items under #collection div
/**allLists.forEach((item) => {
  item.id = `section-${item.parentElement.parentElement.querySelector("h3").id}-${countList}`;
  //increment
  countList += 1;
});*/

/**___________________________________________________________________________________________________ **/
/*******MAKE DYNAMIC TOC********/

const headings = document.querySelectorAll("h2");
const tocContainer = document.getElementById("table-of-contents");

headings.forEach((heading, index) => {
  //Create an anchor link for headings
  const link = document.createElement("a");
  link.href = `#${heading.id}`;
  link.textContent = heading.textContent;
  link.style.display = "block";
  //can change

  //open collappsed section if closed
  link.addEventListener("click", () => {
    if (heading.tagName[1] === "2") {
      document.getElementById(heading.id).parentElement.classList.add("open");
    }
  });

  //adjust margin based on heading
  link.style.marginLeft = `${(parseInt(heading.tagName[1]) - 1) * 20}px`;

  //add link to container
  tocContainer.appendChild(link);
});

/**___________________________________________________________________________________________________ **/
/******* MAKE LIGHT AND DARK MODE ********/

const themeToggleButton = document.getElementById("theme-toggle");

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  //Save
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

//Check save
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

/**___________________________________________________________________________________________________ **/
/******* PAGE SCROLL PROGRESS BAR ********/

// tracking scrolling and update progress bar accordingly
document.addEventListener("scroll", () => {
  //get the progress bar element
  const progressBar = document.getElementById("progress-bar");
  // get page height
  const pageHeight = document.documentElement.scrollHeight;
  // get view width and height
  const viewWidth = document.documentElement.clientWidth;
  const viewHeight = document.documentElement.clientHeight;
  // get scrollable distance
  const scrollableHeight = pageHeight - viewHeight;

  // calculate where we are in the scroll
  let currentScroll = document.documentElement.scrollTop;
  let percentScroll = currentScroll / scrollableHeight;

  // update progress bar
  progressBar.style.width = viewWidth * percentScroll + "px"; //could have left it as a percent
});

/**___________________________________________________________________________________________________ **/
/******* COLLAPSIBLE SECTIONS ********/

const toggleArrows = document.querySelectorAll(".toggle-arrow");

toggleArrows.forEach((Arrow) => {
  Arrow.addEventListener("click", () => {
    const togContainer = Arrow.parentElement.parentElement;

    togContainer.classList.toggle("open");

    //Save
    if (togContainer.classList.contains("open")) {
      localStorage.setItem(`${togContainer.id}-coll`, "open");
    } else {
      localStorage.setItem(`${togContainer.id}-coll`, "closed");
    }
  });
});

toggleArrows.forEach((Arrow) => {
  const togContainer = Arrow.parentElement.parentElement;
  //Check save
  const savedTheme = localStorage.getItem(`${togContainer.id}-coll`);
  if (savedTheme === "open") {
    togContainer.classList.add("open");
  }
});

/**___________________________________________________________________________________________________ **/
/******* TABBED SECTIONS ********/

const headingsWithTabs = document.querySelectorAll("h2");

headingsWithTabs.forEach((hed) => {
  const headingsToTab = hed.parentElement.querySelectorAll("h3");

  const secTabContainer = hed.parentElement.querySelector(".section-tabs");

  //make sure section-tabs exists
  if (secTabContainer) {
    //add ids to section tabs
    if (!secTabContainer.id) {
      secTabContainer.id = `sec-tab-${hed.tagName[1]}`;
    }

    headingsToTab.forEach((hed2, index) => {
      //dynamically create tab links
      const link = document.createElement("a");
      link.href = "";
      link.textContent = hed2.textContent;
      link.style.display = "inline-block";
      secTabContainer.appendChild(link);

      //switch tab visibility
      link.addEventListener("click", (event) => {
        event.preventDefault();
        switchTabs(hed2);
        link.classList.add("selected");
      });

      //show first tab
      if (index === 0) {
        switchTabs(hed2);
        link.classList.add("selected");
      }
    });

    //define switch tabs funtion
    function switchTabs(tab) {
      //deselect all links
      const links = tab.parentElement.parentElement
        .querySelector(".section-tabs")
        .querySelectorAll("a");
      links.forEach((link) => {
        link.classList.remove("selected");
      });

      //close all tabs
      headingsToTab.forEach((hed3) => {
        hed3.parentElement.classList.remove("open-tab");
      });

      //open appropriate tab
      tab.parentElement.classList.add("open-tab");
    }
  }
});

/**___________________________________________________________________________________________________ **/
/******* FAVORITE A NOTE ********/

//add divider line  ---------MOVE TO ONLY COME WHEN FAVS ARE CREATED
const hr = document.createElement("hr");
tocContainer.appendChild(hr);
