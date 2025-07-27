import React from "react";
import "./Skills.css";

function Skills() {
  return (
    <section className="skills-section-main">
      <h2>Skills</h2>
      <div className="skills-icons">
        <div className="skill-icon animated"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" /><span>React</span></div>
        <div className="skill-icon animated"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" /><span>JavaScript</span></div>
        <div className="skill-icon animated"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" alt="Three.js" /><span>Three.js</span></div>
        <div className="skill-icon animated"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" /><span>CSS3</span></div>
        <div className="skill-icon animated"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" /><span>HTML5</span></div>
      </div>
    </section>
  );
}

export default Skills;