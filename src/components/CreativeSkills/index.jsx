import skills from "../../data/creative/skills.json";

const Skills = () => {
  return (
    <section
      className="states bg-img bg-fixed"
      style={{ backgroundImage: "url('img/background/skills.jpg')" }}
      data-overlay-dark="5"
    >
      <div className="container position-re">
        <ul className="rest">
          <li className="sd-color">
            <span className="numb">{skills[0].number}</span>
            <h5>
              {skills[0].title1} <br /> {skills[0].title2}
            </h5>
          </li>
          <li className="blur">
            <h5>
              {skills[1].title1} <br /> {skills[1].title2}
            </h5>
            <span className={`icon ${skills[1].icon}`}></span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Skills;
