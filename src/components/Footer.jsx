import { BsLinkedin, BsGithub } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";
import { Link } from "react-router-dom";
import {GoLocation} from 'react-icons/go';

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className="footerBg p-4">
      <section className="mb-1">
        <div className="titleFooter mb-2"><strong>CineMille</strong></div>
        <div><span><GoLocation/></span>Firenze - Via Roma </div>
      </section>
      <section className="d-flex justify-content-center align-items-center mb-1">
          <BiCopyright />
        <div className="ms-1">Vincenzo Picone</div>{" "}
        <div className="fw-bold ms-2">{currentYear}</div>{" "}
      </section>
      <section className="d-flex justify-content-center align-items-center">
        <BsGithub />
        <Link
          className="text-dark text-decoration-none mx-1"
          to={"https://github.com/Vincenzopicone"}
        >
          {" "}
          GitHub{" - "}
        </Link>
        <BsLinkedin />
        <Link
          className="text-dark text-decoration-none mx-1"
          to={"https://www.linkedin.com/in/vincenzo-picone-1032811a4/"}
        >
          LinkedIn{" "}
        </Link>
      </section>
    </footer>
  );
};

export default Footer;