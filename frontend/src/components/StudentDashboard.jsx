import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { defaultImgs } from "../images/defaultImgs";
import moralis from 'moralis';
import Logo from "../images/Logo.png";
import stylesHeader from "../styles/StudentDashboard_Page/Header.module.css";
import stylesFirstBlock from "../styles/StudentDashboard_Page/FirstBlock.module.css";
import stylesFooter from "../styles/StudentDashboard_Page/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const StudentDashboard = () => {
  const history = useHistory();
  const [pfp, setPfp] = useState();
  const [educator, setEducator] = useState();
  const [yourSBTs, setYourSBTs] = useState("0");
  const [yourTokenIds, setYourTokenIds] = useState([]);
  const [enrolledCourseObjectIds, setEnrolledCourseObjectIds] = useState("0");
  const user = moralis.User.current();

  const {
    Moralis,
    isAuthenticated,
    web3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    enableWeb3,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    if (!user) return null;
    setPfp(user.get("pfp"));
  }, [user]);

  const getEducator = async () => {
    if (!user) {
      window.alert("Please connect wallet");
    } else {
      const Educators = Moralis.Object.extend("Educators");
      const query = new Moralis.Query(Educators);
      const account = user.attributes.accounts[0];
      query.equalTo("educator", account);
      const educator = await query.find();
      setEducator(educator[0]);
    }
  };

  const getNumberOfEnrolledCourses = async () => {
    if (!user) {
      window.alert("Please connect wallet");
    } else {
      let enrolledCourseArr = user.attributes?.enrolledCourses;
      // console.log(enrolledCourseArr);
      if (enrolledCourseArr === undefined) {
        setEnrolledCourseObjectIds("0");
      } else {
        setEnrolledCourseObjectIds(enrolledCourseArr?.length);
      }
    }
  };

  const getYourSBTs = async () => {
    if (!user) {
      window.alert("Please connect wallet");
    } else {
      const MintSBTS = Moralis.Object.extend("MintSBT");
    const query = new Moralis.Query(MintSBTS);
    const account = user.attributes.accounts[0];
    query.equalTo("student", account);
    const mintSBTs = await query.find();
    setYourSBTs(mintSBTs.length);
    setYourTokenIds(mintSBTs.map((mintSBT) => mintSBT.attributes.tokenId));
    }
  };

  useEffect(() => {
    getEducator();
    getNumberOfEnrolledCourses();
    getYourSBTs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const routeEducator = () => {
    if (educator) {
      history.push("/educatorDashboard");
    } else {
      history.push("/educatorRegistration");
    }
  };

  const routeExplore = () => {
    history.push("/explore");
  };

  const routeProfileSettings = () => {
    history.push("/profileSettings");
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
                className={stylesHeader.studentDashboardButton}
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
      <div className={stylesFirstBlock.studentDashboardDiv}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.completedDiv}>
              <div className={stylesFirstBlock.cardsDefault}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <b
                  className={stylesFirstBlock.yourCompletedCourses}
                >{`Completed Courses `}</b>
                <b className={stylesFirstBlock.b}>{yourSBTs}</b>
              </div>
            </div>
            <div className={stylesFirstBlock.completedDiv}>
              <div className={stylesFirstBlock.cardsHover}>
                <div className={stylesFirstBlock.sheetDiv} />
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <b className={stylesFirstBlock.yourCompletedCourses}>
                  Courses in Progress/Taken
                </b>
                <b className={stylesFirstBlock.b}>{enrolledCourseObjectIds}</b>
              </div>
            </div>
            <div className={stylesFirstBlock.yourSBTsDiv}>
              <div className={stylesFirstBlock.cardsHover}>
                <div className={stylesFirstBlock.sheetDiv2} />
              </div>
              <div className={stylesFirstBlock.frameDiv2}>
                <b className={stylesFirstBlock.yourCompletedCourses}>
                  Your SBTS
                </b>
                <b className={stylesFirstBlock.b}>{yourSBTs}</b>
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv5}>
            <div className={stylesFirstBlock.frameDiv6}>
              <div className={stylesFirstBlock.frameDiv7}>
                <b className={stylesFirstBlock.yourCompletedCourses}>
                  Good Morning
                </b>
                <b className={stylesFirstBlock.dateB}>
                  {Date()};
                </b>
                <b className={stylesFirstBlock.youveCompleted65OfYourL}>
                  <span>{`You’ve completed 65% of your learning goal. `}</span>
                  <span className={stylesFirstBlock.comingSoonSpan}>
                    (Coming Soon)
                  </span>
                </b>
              </div>
              <div className={stylesFirstBlock.frameDiv8}>
                <div className={stylesFirstBlock.frameDiv9}>
                  <div className={stylesFirstBlock.frameDiv10}>
                    <div className={stylesFirstBlock.inProgressDiv1}>
                      In Progress: (Coming Soon)
                    </div>
                  </div>
                  <div className={stylesFirstBlock.math101Div}>Math 101</div>
                  <div className={stylesFirstBlock.math101Div}>
                    Chemistry 101
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv11}>
          <div className={stylesFirstBlock.groupDiv}>
            <div className={stylesFirstBlock.suggestedDiv}>
              <div className={stylesFirstBlock.areaDiv}>
                <div className={stylesFirstBlock.sheetDiv3} />
              </div>
              <div className={stylesFirstBlock.frameDiv12}>
                <b className={stylesFirstBlock.titleB}>
                  Suggested Courses (Coming Soon)
                </b>
                <div className={stylesFirstBlock.math102Div}>
                  <div className={stylesFirstBlock.understandingBitcoinDiv}>
                    Math 102
                  </div>
                  <div className={stylesFirstBlock.eTHDiv}>0.01 ETH</div>
                  <img
                    className={stylesFirstBlock.dividerLineHorizontal}
                    alt=''
                    src='../divider--line--horizontal.svg'
                  />
                </div>
                <div className={stylesFirstBlock.math102Div}>
                  <div className={stylesFirstBlock.understandingBitcoinDiv}>
                    Understanding Bitcoin
                  </div>
                  <div className={stylesFirstBlock.eTHDiv1}>0.02 ETH</div>
                  <img
                    className={stylesFirstBlock.dividerLineHorizontal}
                    alt=''
                    src='../divider--line--horizontal.svg'
                  />
                </div>
                <div className={stylesFirstBlock.math102Div}>
                  <div className={stylesFirstBlock.understandingBitcoinDiv}>
                    Tokenomics 101
                  </div>
                  <div className={stylesFirstBlock.eTHDiv1}>0.008 ETH</div>
                  <img
                    className={stylesFirstBlock.dividerLineHorizontal}
                    alt=''
                    src='../divider--line--horizontal.svg'
                  />
                </div>
                <div className={stylesFirstBlock.math102Div}>
                  <div
                    className={stylesFirstBlock.understandingBitcoinDiv}
                  >{`Artificial Intelligence & Algorithms`}</div>
                  <div className={stylesFirstBlock.eTHDiv1}>0.0354 ETH</div>
                </div>
              </div>
            </div>
          </div>
          <div className={stylesFirstBlock.areaDiv1}>
            <div className={stylesFirstBlock.sheetDiv4} />
            <div className={stylesFirstBlock.groupDiv1}>
              <div className={stylesFirstBlock.frameDiv13}>
                <div className={stylesFirstBlock.frameDiv14}>
                  <b className={stylesFirstBlock.titleB1}>
                    Leaderboards (Coming Soon)
                  </b>
                  <div className={stylesFirstBlock.thisWeekDiv}>This Week</div>
                </div>
                <div className={stylesFirstBlock.frameDiv15}>
                  <div className={stylesFirstBlock.math102Div}>
                    <div className={stylesFirstBlock.topStudentsDiv}>
                      Top Students
                    </div>
                    <img
                      className={stylesFirstBlock.dividerLineHorizontal}
                      alt=''
                      src='../divider--line--horizontal3.svg'
                    />
                  </div>
                  <div className={stylesFirstBlock.name1Div}>
                    <div className={stylesFirstBlock.satoshiNDiv}>
                      Satoshi N.
                    </div>
                    <img
                      className={stylesFirstBlock.dividerLineHorizontal4}
                      alt=''
                      src='../divider--line--horizontal3.svg'
                    />
                  </div>
                  <div className={stylesFirstBlock.name2Div}>
                    <div className={stylesFirstBlock.satoshiNDiv}>
                      Charles H.
                    </div>
                    <img
                      className={stylesFirstBlock.dividerLineHorizontal4}
                      alt=''
                      src='../divider--line--horizontal3.svg'
                    />
                  </div>
                  <div className={stylesFirstBlock.name3Div}>
                    <div className={stylesFirstBlock.silvioMDiv}>Silvio M.</div>
                  </div>
                </div>
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

export default StudentDashboard
