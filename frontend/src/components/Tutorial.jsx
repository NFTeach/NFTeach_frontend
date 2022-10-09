import React from 'react';
import moralis from "moralis";
import { useHistory } from 'react-router-dom';
import stylesHeader from "../styles/Tutorial_Page/Header.module.css";
import stylesFirstBlock from "../styles/Tutorial_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Tutorial_Page/Footer.module.css";
import { Button } from "@chakra-ui/react";
import Logo from "../images/Logo.png";
import Ape from "../images/tutorial_imgs/Ape.png";
import Hands from "../images/tutorial_imgs/Hands.png";
import Path from "../images/tutorial_imgs/Path.png";
import Student from "../images/tutorial_imgs/Student.png";
import what from "../images/tutorial_imgs/what.png";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Tutorial = () => {
    const history = useHistory();

    const routeChange = () => {
        history.push("/studentRegistration");
    };

    return (
        <>
        {/* Header */}
        <div className={stylesHeader.frameDiv}>
            <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
        </div>
        {/* First Block */}
        <div className={stylesFirstBlock.tutorialDiv}>
            <div className={stylesFirstBlock.frameDiv}>
            <img
                className={stylesFirstBlock.pNGImage10}
                alt=''
                src={Ape}
            />
            <div className={stylesFirstBlock.frameDiv1}>
                <div className={stylesFirstBlock.frameDiv2}>
                <b className={stylesFirstBlock.titleB}>
                    Why does learning need to be gamified?
                </b>
                <h4 className={stylesFirstBlock.weCraftedATutorialToHelp}>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <span className={stylesFirstBlock.ourResponseWhy}>
                        Our response: Why shouldn’t it be?
                    </span>
                    </p>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <span>&nbsp;</span>
                    </p>
                    <p className={stylesFirstBlock.gamingIsFunAndMostOfThe}>
                    <span>{`Gaming is fun, and most of the time, learning isn’t fun. No one wants to sit through course after course with little reward, especially with all the fun distractions the Internet has to offer. Gamifying learning does two things: it makes receiving education super fun, and it rewards the best students. `}</span>
                    <span
                        className={stylesFirstBlock.nowAnyoneIs}
                    >{`Now, anyone is incentivized (cha-ching!) to do well and learn more. `}</span>
                    </p>
                </h4>
                </div>
            </div>
            </div>
            <div className={stylesFirstBlock.frameDiv3}>
            <div className={stylesFirstBlock.frameDiv4}>
                <div className={stylesFirstBlock.frameDiv5}>
                <div className={stylesFirstBlock.frameDiv6}>
                    <h2 className={stylesFirstBlock.titleH2}>
                    Congratulations! 🎉
                    </h2>
                    <h4
                    className={stylesFirstBlock.titleH4}
                    >{`You’ve completed your first course on NFTeach! We hope you get the most out of our platform, and learn as much as possible. Please click the button below to gain access to the full website experience. `}</h4>
                    <Button
                    variant='solid'
                    w='126px'
                    colorScheme='orange'
                    onClick={routeChange}
                    >
                    Enter
                    </Button>
                </div>
                </div>
                <img
                className={stylesFirstBlock.pNGImage6}
                alt=''
                src={Hands}
                />
            </div>
            </div>
            <div className={stylesFirstBlock.frameDiv7}>
            <div className={stylesFirstBlock.frameDiv8}>
                <h1 className={stylesFirstBlock.textH1}>
                Thanks for choosing NFTeach!
                </h1>
                <h3 className={stylesFirstBlock.weCraftedATutorialToHelp}>
                <span>{`We crafted a tutorial to help anyone get up to speed with how the platform works. `}</span>
                <b>{`Don’t worry, its not technical. `}</b>
                </h3>
            </div>
            <img
                className={stylesFirstBlock.whatIsEthereum1Icon}
                alt=''
                src={what}
            />
            </div>
            <div className={stylesFirstBlock.frameDiv9}>
            <div className={stylesFirstBlock.frameDiv10}>
                <img
                className={stylesFirstBlock.pNGImage12}
                alt=''
                src={Student}
                />
                <div className={stylesFirstBlock.frameDiv11}>
                <h2 className={stylesFirstBlock.titleH2}>What are “SBTs?”</h2>
                <h4 className={stylesFirstBlock.textH41}>
                    They stand for “Soulbound Tokens.” They are basically NFTs
                    (Non-Fungible Tokens), so they are stored on the blockchain, but
                    you can not trade them. SBTs are used on our platform as a
                    proof-of-completion certificate. When you complete a course, you
                    are issued a Soulbound Token to progress to the next course.
                </h4>
                </div>
            </div>
            </div>
            <div className={stylesFirstBlock.frameDiv12}>
            <div className={stylesFirstBlock.frameDiv13}>
                <b className={stylesFirstBlock.titleB}>
                What is “token-gated content?”
                </b>
                <h4 className={stylesFirstBlock.textH42}>
                <span className={stylesFirstBlock.textTxtSpan}>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <b>&nbsp;</b>
                    </p>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <b>&nbsp;</b>
                    </p>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <b>We’ve segmented courses into stages,</b>
                    <span
                        className={stylesFirstBlock.similarToLevels}
                    >{` similar to levels in a game. Each SBT `}</span>
                    <b className={stylesFirstBlock.similarToLevels}>
                        unlocks the next stage
                    </b>
                    <span>{` of that respective course. For example, after taking Math 101 and passing the test, `}</span>
                    <b className={stylesFirstBlock.similarToLevels}>
                        you will get the Math 101 SBT, and unlock the Math 102
                        course
                    </b>
                    <span>{`. `}</span>
                    </p>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <span>&nbsp;</span>
                    </p>
                    <p className={stylesFirstBlock.ourResponseWhyShouldntIt}>
                    <span>{`However, say you wanted to check out the Science 102 course instead. `}</span>
                    <b>
                        You cannot use the Math 101 SBT to unlock Science 102. You
                        must take (and pass)
                    </b>
                    <span>{` Science 101 to obtain that respective SBT, and then proceed. `}</span>
                    </p>
                    <p className={stylesFirstBlock.gamingIsFunAndMostOfThe}>
                    <span>&nbsp;</span>
                    </p>
                </span>
                </h4>
            </div>
            <img
                className={stylesFirstBlock.pNGImage14}
                alt=''
                src={Path}
            />
            </div>
        </div>
        {/* Footer */}
        <div className={stylesFooter.frameDiv}>
            <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
        </div>
        </>
    )
}

export default Tutorial
