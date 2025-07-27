import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-card">
        <img className="about-img" src="https://avatars.githubusercontent.com/u/00000000?v=4" alt="Your profile" />
        <div>
          <h2>About Me</h2>
          <p>Hello! I'm [Your Name], a passionate developer with a background in [Your Background]. I love building interactive and visually stunning web experiences.</p>
        </div>
      </div>
    </section>
  );
}

export default About;