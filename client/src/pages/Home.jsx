import React, { useContext } from "react";
import Header from "../components/Header";
import Signs from "../components/logs/Signs";
import { UidContext } from "../App.js";
import ProjectList from "../components/projects/ProjectList";

const Home = ({loading}) => {
  const uid = useContext(UidContext); // check authentification
  
  return (
    <div className="container">
      {uid ? (
        <>
          <Header auth={uid} />
          <ProjectList />
        </>
      ) : !loading && (
        <>
          <Header />
          <main className="main">
            <Signs />
          </main>
        </>
      )}
    </div>
  )
};

export default Home;
