import React, { useEffect } from 'react';
import moralis from 'moralis';
import { useMoralis } from 'react-moralis';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Welcome from './components/Welcome';
import Tutorial from './components/Tutorial';
import StudentRegistration from './components/StudentRegistration';
import Explore from './components/Explore';
import EducatorRegistration from './components/EducatorRegistration';
import EducatorDashboard from './components/EducatorDashboard';
import StudentDashboard from './components/StudentDashboard';
import ProfileSettings from './components/ProfileSettings';
import CourseCreation1 from './components/CourseCreation1';
import CourseCreation2 from './components/CourseCreation2';
import CourseCreation3 from './components/CourseCreation3';
import CourseCreation4 from './components/CourseCreation4';
import CourseReview from './components/CourseReview';
import CourseStaking from './components/CourseStaking';
import Course from './components/Course';
import Question1 from './components/test/Question1';
import Question2 from './components/test/Question2';
import Question3 from './components/test/Question3';
import Question4 from './components/test/Question4';
import Question5 from './components/test/Question5';
import Question6 from './components/test/Question6';
import Question7 from './components/test/Question7';
import Question8 from './components/test/Question8';
import Question9 from './components/test/Question9';
import Question10 from './components/test/Question10';
// import { ColorModeSwitcher } from './ColorModeSwitcher';

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

function App({ isServerInfo }) {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Router>
      <Switch>
        <Route exact path="/Welcome">
          <Welcome isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/tutorial">
          <Tutorial isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/studentRegistration">
          <StudentRegistration isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/explore">
          <Explore isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/educatorRegistration">
          <EducatorRegistration isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/educatorDashboard">
          <EducatorDashboard isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/studentDashboard">
          <StudentDashboard isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/profileSettings">
          <ProfileSettings isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/courseCreation1">
          <CourseCreation1 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/courseCreation2">
          <CourseCreation2 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/courseCreation3">
          <CourseCreation3 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/courseCreation4">
          <CourseCreation4 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/courseReview">
          <CourseReview isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/courseStaking">
          <CourseStaking isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/course">
          <Course isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question1">
          <Question1 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question2">
          <Question2 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question3">
          <Question3 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question4">
          <Question4 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question5">
          <Question5 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question6">
          <Question6 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question7">
          <Question7 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question8">
          <Question8 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question9">
          <Question9 isServerInfo={isServerInfo} />
        </Route>
        <Route exact path="/question10">
          <Question10 isServerInfo={isServerInfo} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
