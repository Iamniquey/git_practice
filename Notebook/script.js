/**___________________________________________________________________________________________________ **/
/*******MAKE DYNAMIC TOC********/

const headings = document.querySelectorAll("h2, h3, h4");
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
    if (heading.tagName[1] === "3") {
      heading.id = `section-${countHeading1 - 1}-${countHeading2}`;
      //increment
      countHeading2 += 1;
      //reset
      countHeading3 = 1;
    }
    if (heading.tagName[1] === "4") {
      heading.id = `section-${countHeading1 - 1}-${
        countHeading2 - 1
      }-${countHeading3}`;
      //increment
      countHeading3 += 1;
      //reset
      countHeading4 = 1;
    }
  }

  //Create an anchor link for headings
  const link = document.createElement("a");
  link.href = `#${heading.id}`;
  link.textContent = heading.textContent;
  link.style.display = "block";
  //can change

  //open collappsed section
  link.addEventListener("click", () => {
    if (heading.tagName[1] === "2") {
      document
        .getElementById(heading.id)
        .parentElement.classList.remove("closed");
    } else if (heading.tagName[1] === "3") {
      document
        .getElementById(heading.id)
        .parentElement.parentElement.classList.remove("closed");
    } else if (heading.tagName[1] === "4") {
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

    togContainer.classList.toggle("closed");
  });
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

    headingsToTab.forEach((hed2) => {
      const link = document.createElement("a");
      link.href = `#${hed2.id}`;
      link.textContent = hed2.textContent;
      link.style.display = "inline-block";

      secTabContainer.appendChild(link);
    });
  }
});
