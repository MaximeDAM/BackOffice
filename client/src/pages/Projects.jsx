import React from "react";
import { useContext } from "react";
import { UidContext } from "../App";
import Header from "../components/Header";
import Signs from "../components/logs/Signs";

const Projects = ({ loading }) => {
  const uid = useContext(UidContext); // check authentification

  return (
    <div className="container">
      {uid ? (
        <>
          <Header auth={uid} />
          <div>Projets</div>
        </>
      ) : (
        loading && (
          <>
            <Header />
            <main className="main">
              <Signs />
            </main>
          </>
        )
      )}
    </div>
  );
};

export default Projects;
