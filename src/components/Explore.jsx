// FIGURE OUT COURSE PREREQ ISSUE WITHIN SEARCH BAR 
// (I THINK I NEED TO ALTER SMART CONTRACT TO ADD COURSE OBJECT TO MINTSBT FUNCTION)
// TALK TO OLIVIER TMRW ABOUT THIS

import React, { useEffect, useState } from 'react';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import { useHistory, Link } from "react-router-dom";
import { defaultImgs } from "../images/defaultImgs";
import {
  Box,
  Image,
  Text,
  Button,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import * as _ from 'lodash';
import Logo from "../images/Logo.png";
import stylesHeader from "../styles/Explore_Page/Header.module.css";
import stylesFirstBlock from "../styles/Explore_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Explore_Page/Footer.module.css";
import spaceMan from "../images/explore_imgs/spaceMan.png";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Explore = () => {
  const history = useHistory();
  const [pfp, setPfp] = useState();
  const { Moralis } = useMoralis();
  const [educator, setEducator] = useState();
  const [courses, setCourses] = useState([]);
  const [courseObjectId, setCourseObjectId] = useState();
  const [images, setImages] = useState([]);
  const [courseName, setCourseName] = useState([]);
  const [courseDescription, setCourseDescription] = useState([]);
  const [coursePrerequisite, setCoursePrerequisite] = useState([]);
  const [prerequisitePass, setPrerequisitePass] = useState(false);
  const [userSBTs, setUserSBTs] = useState([]);
  const [userTokenIds, setUserTokenIds] = useState("");
  const [chosenIndex, setChosenIndex] = useState();
  const [coursePrereq, setCoursePrereq] = useState();
  const [searchInput, setSearchInput] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = moralis.User.current();

  const getEducator = async () => {
    if (user) {
      const Educators = Moralis.Object.extend("Educators");
      const query = new Moralis.Query(Educators);
      const account = user.attributes.accounts[0];
      query.equalTo("educator", account);
      const educator = await query.find();
      setEducator(educator[0]);
    }
  };

  const getCourses = async () => {
    if (user) {
      const Courses = Moralis.Object.extend("Courses");
      const query = new Moralis.Query(Courses);
      const course = await query.find();
      setCourses(course);
      setCourseObjectId(course.map((course) => course.id));
      setImages(course.map((course) => course.get("imageFile")));
      setCourseName(course.map((course) => course.get("courseName")));
      setCourseDescription(course.map((course) => course.get("description")));
      setCoursePrerequisite(course.map((course) => course.get("prerequisite")));
    }
  };

  const getUserSBTs = async () => {
    const MintSBTs = Moralis.Object.extend("MintSBT");
    const query = new Moralis.Query(MintSBTs);
    const account = user.attributes.accounts[0];
    query.equalTo("student", account);
    const mintSBT = await query.find();
    setUserSBTs(mintSBT);
    setUserTokenIds((mintSBT).map((mintSBT) => mintSBT.get("tokenId")));
  };
  // console.log(userSBTs)
  // console.log(userTokenIds);
  // console.log(coursePrerequisite);

  const checkPrerequisite = async (id) => {
    // setChosenIndex(index);
    // const createSBTs = Moralis.Object.extend("CreateSBT");
    // const query = new Moralis.Query(createSBTs);
    // query.equalTo("courseObjectId", courseprerequisite[index]);
    // const createSBT = await query.find();
    // const courseSBT = createSBT.map((createSBT) => createSBT.get("tokenId"));
    // const prerequisiteSBT = userSBTs.filter((userSBT) => courseSBT.includes(userSBT.get("tokenId")));

    // if (courseprerequisite[index] === undefined) {
    //   setPrerequisitePass(true);
    // } else if (prerequisiteSBT.length === 0) {
    //   setPrerequisitePass(false);
    // } else {
    //   setPrerequisitePass(true);
    // }

    // const Courses = Moralis.Object.extend("Courses");
    // const query2 = new Moralis.Query(Courses);
    // query2.equalTo("objectId", courseprerequisite[index]);
    // const course = await query2.find();
    // setCoursePrereq(course[0]?.get("courseName"));

    // onOpen();
    window.alert("this broken :(")
  }

  const handleEnroll = async () => {
    const User = Moralis.Object.extend("_User");
    const query3 = new Moralis.Query(User);
    const myDetails = await query3.first();
    const enrolledCourses = myDetails?.get("enrolledCourses");
    const alreadyEnrolled = enrolledCourses?.includes(courseObjectId[chosenIndex]);
    // console.log(alreadyEnrolled);
    if (enrolledCourses === undefined) {
      myDetails.set("enrolledCourses", [courseObjectId[chosenIndex]]);  
    } else if (alreadyEnrolled === true) {
      return;
    } else {
      myDetails.set("enrolledCourses", enrolledCourses.concat(courseObjectId[chosenIndex]));
    }
    await myDetails.save();
  }

  useEffect(() => {
    if (!user) return null;
    setPfp(user.get("pfp"));
    getEducator();
    getUserSBTs();
  }, [user]);

  useEffect(() => {
    if (!user) return null;
    getCourses();
  }, []);

  let inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  const filteredCourses = courses.filter((course) => {
    if (searchInput === "") {
      return course;
    } else {
      return course.get("courseName").toLowerCase().includes(searchInput.toLowerCase());
    }
  });

  const routeStudentDashboard = () => {
    history.push("/studentDashboard");
  };

  const routeEducator = () => {
    if (educator) {
      history.push("/educatorDashboard");
    } else {
      history.push("/educatorRegistration");
    }
  };

  const routeProfileSettings = () => {
    history.push("/profileSettings");
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.headerExploreDiv}>
        <div className={stylesHeader.frameDiv}>
          <img
            className={stylesHeader.nFTeach1Icon}
            alt=''
            src={Logo}
          />
          <div className={stylesHeader.frameDiv1}>
            <div className={stylesHeader.tabsDiv}>
              <button
                className={stylesHeader.exploreButton}
                onClick={routeStudentDashboard}
              >
                Student Dashboard
              </button>
              <button className={stylesHeader.studentDashboardButton}>
                Explore
              </button>
              <button
                className={stylesHeader.exploreButton}
                onClick={routeEducator}
              >
                Educator Dashboard
              </button>
            </div>
            <div className={stylesHeader.profilePictureDiv}>
              <img
                className={stylesHeader.displayedNFTIcon}
                alt='profilePFP'
                src={pfp ? pfp : defaultImgs[0]}
              />
              <button
                className={stylesHeader.nameButton}
                onClick={routeProfileSettings}
              >
                {user?.attributes.username.slice(0, 15)}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.explorePageDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <img className={stylesFirstBlock.imageIcon} alt="" src={spaceMan} />
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                <h1 className={stylesFirstBlock.educationThatsH1}>{`Education That’s `}</h1>
                <h1 className={stylesFirstBlock.outOfThisWorld}>Out Of This World</h1>
              </div>
              <h3 className={stylesFirstBlock.chooseACourseBelowToStart}>
                Choose a course below to start learning and earning
              </h3>
            </div>
          </div>
          <Input
            className={stylesFirstBlock.inputOutline}
            variant="outline"
            width="919px"
            placeholder="Search Courses"
            w="919px"
            onChange={inputHandler}
            value={searchInput}
          />
          <div className={stylesFirstBlock.frameDiv3} >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  gridGap: "100px",
                }}
                >
                {filteredCourses?.map((course, index) => (
                  <Box key={index} w='215px' h='215px'>
                    <Image
                      borderRadius='full'
                      boxSize='215px'
                      src={course.attributes.imageFile.img}
                      alt={course.attributes.courseName}
                      onClick={async () => {
                        await checkPrerequisite(course.id);
                      }}
                    />
                    <br />
                    <Text>{course.attributes.courseName}</Text>
                  </Box>
                ))}
              </div>
            </div>
          </div>
        </div>
      {/* Footer Block */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
      {/* Course Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>  
          <ModalHeader>{courseName?.[chosenIndex]}</ModalHeader>
          <ModalCloseButton
            onClick={() => {
              refreshPage();
            }}
          />
          <ModalBody>
            <Text>{courseDescription?.[chosenIndex]}</Text>
            <br />
            <Image 
              src={images[chosenIndex]?.img} 
              alt={courseName?.[chosenIndex]}
              boxSize='250px'
              align={'center'}
              />
          </ModalBody>
          <ModalFooter>
            { prerequisitePass ? (
              <Link
                to={{
                  pathname: "/course",
                  state: {courseObjectId: courseObjectId?.[chosenIndex] },
                }}
              > 
                <Button
                variant='solid'
                colorScheme='green'
                mr={3}
                onClick={async () => {
                  await handleEnroll();
                }}
                >
                  Start Course
                </Button>
              </Link>
              ) : (
                <Text>To access course, you need to complete <b>{coursePrereq}</b> first!</Text>
              )}
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Explore
