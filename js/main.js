document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  loadEducation();
  loadSkills();
  setWelcomeMessage();
});

async function loadProjects() {
  try {
    const response = await fetch("projects.json");
    const projects = await response.json();
    const projectList = document.querySelector(".project-list");
    projectList.innerHTML = projects
      .map(
        (project) => `
      <div class="project-item">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

async function loadEducation() {
  try {
    const response = await fetch("education.json");
    const education = await response.json();
    const educationList = document.querySelector(".education-list");
    educationList.innerHTML = education
      .map(
        (edu) => `
      <div class="education-item">
        <h3>${edu.degree}</h3>
        <p>${edu.institution}</p>
        <p>${edu.period}</p>
        ${edu.details ? `<p>${edu.details}</p>` : ""}
        ${
          edu.thesis
            ? `<p>Thesis: "${edu.thesis}" (${edu.thesisGrade})</p>`
            : ""
        }
      </div>
    `
      )
      .join("");
  } catch (error) {
    console.error("Error loading education:", error);
  }
}

function loadSkills() {
  const skills = [
    "Data Analysis & Visualization",
    "Machine Learning",
    "SQL & Database Optimization",
    "Python & R Programming",
    "Power BI, Looker, Tableau",
    "Excel/PowerPoint/Word",
  ];
  const skillList = document.querySelector(".skill-list");
  skillList.innerHTML = skills
    .map(
      (skill) => `
    <div class="skill-item">${skill}</div>
  `
    )
    .join("");
}

function setWelcomeMessage() {
  const welcomeMessage =
    localStorage.getItem("welcomeMessage") || "Welcome to my portfolio!";
  const homeSection = document.querySelector("#home .content");
  const welcomeParagraph = document.createElement("p");
  welcomeParagraph.textContent = welcomeMessage;
  homeSection.insertBefore(welcomeParagraph, homeSection.querySelector("a"));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
