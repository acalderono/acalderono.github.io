import React, { useState, useEffect } from "react";
import "./Portfolio.css";
import { Spinner } from "./../UI/atoms/index";
import { Header, Me, AboutMe, LastPosts, Projects, Footer } from "../UI";
import { Main } from "./Styles";

function Portfolio() {
  const [isLoading, setLoading] = useState(true);
  const [personal, setPersonal] = useState();
  const { REACT_APP_TOKEN_GITHUB } = process.env;

  const getFetchPersonal = async () => {
    let r = await fetch("https://api.github.com/users/acalderono", {
      method: "GET",
      headers: new Headers({
        Authorization: REACT_APP_TOKEN_GITHUB,
      }),
    });
    let personal = await r.json().then();
    setPersonal(personal);
    setLoading(false);
  };

  useEffect(() => {
    getFetchPersonal();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Main className="pattern">
          <Header name={personal.login} hostname={window.location.origin} />
          <Me name={personal?.name} avatar={personal?.avatar_url} />
          {/* <AboutMe></AboutMe> */}
          <LastPosts url={personal?.repos_url}></LastPosts>
          {/* <Projects></Projects> */}
          <Footer name={personal?.login} />
        </Main>
      )}
    </>
  );
}

export default Portfolio;
