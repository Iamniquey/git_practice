/**___________________________________________________________________________________________________ **/
/*******MAKE DYNAMIC TOC********/

const headings = document.querySelectorAll("h2");
const tocContainer = document.getElementById("table-of-contents");
//count the headings
let countHeading1 = 1;
let countHeading2 = 1;
let countHeading3 = 1;

headings.forEach((heading, index) => {
  //Create ID for a heading if it doesn't have one
  if (!heading.id) {
    if (heading.tagName[1] === "2") {
      heading.id = `section-${countHeading1}`;
      //increment
      countHeading1 += 1;
      //reset
      countHeading2 = 1;
    }
  }

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

//get the progress bar element
const progressBar = document.getElementById("progress-bar");
// get page height
const pageHeight = document.documentElement.scrollHeight;
// get view width and height
const viewWidth = document.documentElement.clientWidth;
const viewHeight = document.documentElement.clientHeight;
// get scrollable distance
const scrollableHeight = pageHeight - viewHeight;

// tracking scrolling and update progress bar accordingly
document.addEventListener("scroll", () => {
  // Get the current width and height
  let currentWidth = progressBar.offsetWidth;

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
  console.log(togContainer);
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
      //show first tab
      if (index === 0) {
        switchTabs(hed2);
      }
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
      });
    });

    //define switch tabs funtion
    function switchTabs(tab) {
      headingsToTab.forEach((hed3) => {
        hed3.parentElement.classList.remove("open-tab");
      });
      tab.parentElement.classList.add("open-tab");
    }
  }
});
