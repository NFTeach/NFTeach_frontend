import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moralis from 'moralis';
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import { Button } from "@chakra-ui/react";
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
  const [educator, setEducator] = useState();
  const [coursesCreated, setCoursesCreated] = useState("0");
  const [pfp, setPfp] = useState();
  const user = moralis.User.current();
  const address = user?.attributes.accounts[0];
  const [lifetimePayout, setLifetimePayout] = useState("0");
  const {
    Moralis,
    isAuthenticated,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const options = {
    chain: CHAIN,
    address: SBT_CONTRACT_ADDRESS,
    function_name: "getEducatorCurrentPayout",
    abi: NFTEACH_SBT_CONTRACT_ABI,
    params: {
      _educator: address,
    },
  };

  const { data, error, fetch, isLoading } = useMoralisWeb3ApiCall(
    native.runContractFunction,
    { ...options }
  );

  const options2 = {
    chain: CHAIN,
    address: SBT_CONTRACT_ADDRESS,
    functionName: "getEducatorLifetimePayout",
    abi: NFTEACH_SBT_CONTRACT_ABI,
    params: {
      _educator: address,
    },
  };

  const {
    data: educatorData,
    error: executeContractError,
    fetch: executeContractFunction,
    isFetching,
    isLoading: executeContractLoading,
  } = useWeb3ExecuteFunction();

  const withdrawFunds = async () => {
    executeContractFunction({
      params: {
        abi: NFTEACH_SBT_CONTRACT_ABI,
        contractAddress: SBT_CONTRACT_ADDRESS,
        functionName: "withdrawCoursesPayoff",
      },
      onSuccess: () => {
        console.log("success");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    if (!user) return null;
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
              <b className={stylesFirstBlock.b}>{coursesCreated}</b>
            </div>
          </div>
          <div className={stylesFirstBlock.groupDiv1}>
            <div className={stylesFirstBlock.cardsDefault1}>
              <div className={stylesFirstBlock.sheetDiv1} />
            </div>
            <div className={stylesFirstBlock.frameDiv2}>
              LifeTime Income
              <div className={stylesFirstBlock.div}>
                {lifetimePayout && <pre>{Moralis.Units.FromWei(lifetimePayout)} MATIC</pre>}
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.groupDiv1}>
            <div className={stylesFirstBlock.cardsDefault1}>
              <div className={stylesFirstBlock.sheetDiv1} />
            </div>
            <div className={stylesFirstBlock.frameDiv2}>
              <h3 className={stylesFirstBlock.sBTsIssuedH3}>
                Enrolled Students (Coming Soon)
              </h3>
              <b className={stylesFirstBlock.b}></b>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv4}>
          <div className={stylesFirstBlock.frameDiv5}>
            <div className={stylesFirstBlock.frameDiv6}>
              <div className={stylesFirstBlock.frameDiv7}>
                <h3 className={stylesFirstBlock.frameH3}>
                  <div className={stylesFirstBlock.yourCoursesDiv}>
                    Your Courses
                  </div>
                </h3>
              </div>
              <div className={stylesFirstBlock.frameDiv8}>
                <div className={stylesFirstBlock.frameDiv9}>
                  <h4 className={stylesFirstBlock.chemistry101H4}>
                    Chemistry 101 (Coming Soon)
                  </h4>
                  <h4 className={stylesFirstBlock.math101H4}>
                    Math 101 (Coming Soon)
                  </h4>
                  <h4 className={stylesFirstBlock.blockchainBasicsH4}>
                    Blockchain Basics (Coming Soon)
                  </h4>
                </div>
              </div>
            </div>
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
                  Add Courses
                </Button>
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='green'
                  onClick={() => {
                    fetch({ params: options });
                  }}
                >
                  Check Your Balance on Smart Contract
                </Button>
                <div className={stylesFirstBlock.div}>
                  {data && <pre>{Moralis.Units.FromWei(data)} MATIC</pre>}
                </div>
                <Button
                  className={stylesFirstBlock.buttonSolidTextAndIcon}
                  variant='solid'
                  colorScheme='cyan'
                  onClick={async () => {
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
    </>
  )
}

export default EducatorDashboard
