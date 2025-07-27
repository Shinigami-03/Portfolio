import React from "react";
import "./Projects.css";

function Projects() {
  return (
    <section className="projects-section">
      <h2>Projects</h2>
      <div className="projects-list">
        <div className="project-card-animated">
          <h3>Project One</h3>
          <p>Short description of your project with a cool animation.</p>
          <a href="https://github.com/yourusername/project1" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
        <div className="project-card-animated">
          <h3>Project Two</h3>
          <p>Another awesome project with interactive features.</p>
          <a href="https://github.com/yourusername/project2" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
    </section>
  );
}

export default Projects;