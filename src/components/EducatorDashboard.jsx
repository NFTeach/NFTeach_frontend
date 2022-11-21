import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moralis from 'moralis';
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { 
  Button, 
  useDisclosure, 
  TableContainer, 
  Table, 
  Tbody, 
  Thead, 
  Tr, 
  Th, 
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody 
} from "@chakra-ui/react";
import * as _ from 'lodash';
import Logo from "../images/Logo.png";
import { defaultImgs } from "../images/defaultImgs";
import stylesHeader from "../styles/EducatorDashboard_Page/Header.module.css";
import stylesFirstBlock from "../styles/EducatorDashboard_Page/FirstBlock.module.css";
import stylesFooter from "../styles/EducatorDashboard_Page/Footer.module.css";
import { CHAIN } from "./consts/vars";
import { SBT_CONTRACT_ADDRESS } from "./consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../components/consts/contractABIs";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const EducatorDashboard = () => {
  const history = useHistory();
  const { native } = useMoralisWeb3Api();
  const [coursesCreated, setCoursesCreated] = useState([]);
  const [courseNames, setCourseNames] = useState([]);
  const [courseIds, setCourseIds] = useState([]);
  const [userEnrolledCourses, setUserEnrolledCourses] = useState([]);
  const [numberOfStudentsEnrolled, setNumberOfStudentsEnrolled] = useState([]);
  const [isNumberOfStudentsEnrolledLoading, setIsNumberOfStudentsEnrolledLoading] = useState(false);
  const [pfp, setPfp] = useState();
  const [isWithdrawingInProgress, setIsWithdrawingInProgress] = useState(false);
  const user = moralis.User.current();
  const address = user?.attributes.accounts[0];
  const {
    Moralis,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const educatorLifetimePayoutOptions = {
    chain: CHAIN,
    address: SBT_CONTRACT_ADDRESS,
    function_name: "getEducatorLifetimePayout",
    abi: NFTEACH_SBT_CONTRACT_ABI,
    params: {
      _educator: address,
    },
  };

  const { 
    data: educatorLifetimePayoutData,
    error: educatorLifetimePayoutError, 
    fetch: educatorLifetimePayoutFetch, 
    isLoading: educatorLifetimePayoutLoading 
    } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...educatorLifetimePayoutOptions }
  );
   
  const educatorCurrentPayoutOptions = {
    chain: CHAIN,
    address: SBT_CONTRACT_ADDRESS,
    function_name: "getEducatorCurrentPayout",
    abi: NFTEACH_SBT_CONTRACT_ABI,
    params: {
      _educator: address,
    },
  };

  const { 
    data: educatorCurrentPayoutData,
    error: educatorCurrentPayoutError, 
    fetch: educatorCurrentPayoutFetch, 
    isLoading: educatorCurrentPayoutLoading 
    } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...educatorCurrentPayoutOptions }
  );

  const {
    data,
    error: executeContractError,
    fetch: executeContractFunction,
    isFetching,
    isLoading
  } = useWeb3ExecuteFunction();

  useEffect(() => {
    if (!isFetching && !isLoading && data) {
      console.log("data", data);
      setIsWithdrawingInProgress(false);
      onOpen();
    }
  }, [isFetching, isLoading]);

  useEffect(() => {
    if (executeContractError) {
      setIsWithdrawingInProgress(false);
      window.alert("Error withdrawing. Make sure you have paid enough gas and please try again.");
    }
  }, [executeContractError]);

  const withdrawFunds = async () => {
    executeContractFunction({
      params: {
        abi: NFTEACH_SBT_CONTRACT_ABI,
        contractAddress: SBT_CONTRACT_ADDRESS,
        functionName: "withdrawCoursesPayoff",
      },
      onSuccess: () => {
        setIsWithdrawingInProgress(false);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const getEducatorCourses = async () => {
    if (user) {
      const EducatorCourses = Moralis.Object.extend("Courses");
      const query = new Moralis.Query(EducatorCourses);
      const account = user.attributes.accounts[0];
      query.equalTo("educatorAddress", account);
      const results = await query.find();
      setCoursesCreated(results);
      setCourseNames(results.map((course) => course.attributes.courseName));
      setCourseIds(results.map((course) => course.id));
    }
  };
  console.log(courseIds);

  const getEnrolledCourses = async () => {
    if (user) {
      Moralis.Cloud.run("getAllUser").then((data) => {
        setUserEnrolledCourses(data.map((user) => user.attributes.enrolledCourses));
      }) 
    }
  };
  // console.log(userEnrolledCourses);

  const getNumberOfStudentsEnrolled = async () => {
    setIsNumberOfStudentsEnrolledLoading(true);
    if (user) {
      for (let i = 0; i < userEnrolledCourses.length; i++) {
        try {
          setNumberOfStudentsEnrolled(_.intersectionWith(userEnrolledCourses[i], courseIds, _.isEqual).length);
          setIsNumberOfStudentsEnrolledLoading(false);
        } catch (error) {
          console.log(error);
          setIsNumberOfStudentsEnrolledLoading(false);
        }
        
      }
    }
  };
  console.log(numberOfStudentsEnrolled);

  useEffect(() => {
    if(!user) return null;
    getEducatorCourses();
    getEnrolledCourses();
    setPfp(user.get("pfp"));
  }, [user]);

  const routeStudentDashboard = () => {
    history.push("/studentDashboard");
  };

  const routeExplore = () => {
    history.push("/explore");
  };

  const routeProfileSettings = () => {
    history.push("/profileSettings");
  };

  const routeCreateCourse = () => {
    history.push("/courseCreation1");
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
              <button
                className={stylesHeader.exploreButton}
                onClick={routeExplore}
              >
                Explore
              </button>
              <button
                className={stylesHeader.studentDashboardButton}
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
       <div className={stylesFirstBlock.educatorDashboardDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.groupDiv}>
            <div className={stylesFirstBlock.cardsDefault}>
              <div className={stylesFirstBlock.sheetDiv} />
            </div>
            <div className={stylesFirstBlock.frameDiv1}>
              <h3 className={stylesFirstBlock.sBTsIssuedH3}>Courses Created</h3>
              <b className={stylesFirstBlock.b}>{coursesCreated.length}</b>
            </div>
          </div>
          <div className={stylesFirstBlock.groupDiv1}>
            <div className={stylesFirstBlock.cardsDefault1}>
              <div className={stylesFirstBlock.sheetDiv1} />
            </div>
            <div className={stylesFirstBlock.frameDiv2}>
              LifeTime Income
              <div className={stylesFirstBlock.div}>
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='green'
                  onClick={() => {
                    educatorLifetimePayoutFetch({ params: educatorLifetimePayoutOptions });
                  }}
                  isLoading={educatorLifetimePayoutLoading}
                >
                  Fetch Data 
                </Button>
                {educatorLifetimePayoutData && <pre>{Moralis.Units.FromWei(educatorLifetimePayoutData)} MATIC</pre>}
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.groupDiv1}>
            <div className={stylesFirstBlock.cardsDefault1}>
              <div className={stylesFirstBlock.sheetDiv1} />
            </div>
            <div className={stylesFirstBlock.frameDiv2}>
              <h3 className={stylesFirstBlock.sBTsIssuedH3}>
                Enrolled Students
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='green'
                  onClick={() => {
                    getNumberOfStudentsEnrolled();
                  }}
                  isLoading={isNumberOfStudentsEnrolledLoading}
                >
                  Fetch Data 
                </Button> 
              </h3>
              <b className={stylesFirstBlock.b}>{numberOfStudentsEnrolled}</b>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv4}>
          <div className={stylesFirstBlock.frameDiv5}>
            <TableContainer maxWidth='100%' overflowY='auto'>
              <Table size='md'>
                <Thead>
                  <Tr>
                    <Th>Your Courses</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {courseNames.map((courseName) => (
                    <Tr>
                      <Td>{courseName}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <div className={stylesFirstBlock.frameDiv10}>
            <div className={stylesFirstBlock.frameDiv11}>
              <h2 className={stylesFirstBlock.helpH2}>Actions</h2>
              <div className={stylesFirstBlock.frameDiv12}>
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='green'
                  onClick={routeCreateCourse}
                >
                  Create a Course
                </Button>
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='green'
                  onClick={() => {
                    educatorCurrentPayoutFetch({ params: educatorCurrentPayoutOptions });
                  }}
                  isLoading={educatorCurrentPayoutLoading}
                >
                  Check Current Balance
                </Button>
                {educatorCurrentPayoutData && <pre>{Moralis.Units.FromWei(educatorCurrentPayoutData)} MATIC</pre>}
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='cyan'
                  isLoading={isWithdrawingInProgress}
                  onClick={async () => {
                    setIsWithdrawingInProgress(true);
                    await withdrawFunds();
                  }}
                >
                  Withdraw Your Balance
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
      {/* Withdraw Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Withdraw Success</ModalHeader>
          <ModalCloseButton
            onClick={() => {
            refreshPage();
            }}
          />
          <ModalBody>
            <p>You have successful withdrawn your funds! They should appear in your wallet shortly.</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EducatorDashboard
