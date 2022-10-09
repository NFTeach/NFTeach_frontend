import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMoralis } from 'react-moralis';
import { Button } from "@chakra-ui/react";
import moralis from "moralis";
import stylesHeader from "../styles/Welcome_Page/Header.module.css";
import stylesFirstBlock from "../styles/Welcome_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Welcome_Page/Footer.module.css";
import Logo from "../images/Logo.png";
import Edu from "../images/welcome_imgs/Edu.png";
import ayush from "../images/welcome_imgs/ayush.png";
import bryce from "../images/welcome_imgs/bryce.jpg";
import olivier from "../images/welcome_imgs/olivier.jpg";
import Polygon from "../images/welcome_imgs/Polygon.png";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Welcome = () => {
    const history = useHistory();
    const { Moralis } = useMoralis();
    const [student, setStudent] = useState();
    const user = moralis.User.current();
    // console.log(user);

    const getStudent = async () => {
        if (user) {
            const Students = Moralis.Object.extend("Students");
            const query = new Moralis.Query(Students);
            const account = user.attributes.accounts[0];
            query.equalTo("student", account);
            const student = await query.find();
            setStudent(student[0]);
        }
    };

    // console.log(student);

    const routeChange = () => {
        if (student) {
            history.push("/explore");
        } else {
            history.push("/tutorial");
        }
    };

    useEffect(() => {
        getStudent();
    }, []);

    return (
        <>
        {/* Header */}
        <div className={stylesHeader.frameDiv}>
            <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
        </div>
        {/* First Block */}
        <div className={stylesFirstBlock.welcomePageDiv}>
            <div className={stylesFirstBlock.frameDiv}>
            <div className={stylesFirstBlock.frameDiv1}>
                <div className={stylesFirstBlock.frameDiv2}>
                <img
                    className={stylesFirstBlock.pNGImage9}
                    alt=''
                    src={Edu}
                />
                <div className={stylesFirstBlock.frameDiv3}>
                    <b className={stylesFirstBlock.titleB}>
                    <span>{`Learning Becomes `}</span>
                    <span className={stylesFirstBlock.funSpan}>Fun</span>
                    </b>
                    <h4 className={stylesFirstBlock.textH4}>
                    <p
                        className={stylesFirstBlock.weThoughtOnline}
                    >{`We thought online courses could use some freshening up. Utilizing SBTs, we found a modern way to revitalize (and incentivize) learning on the Internet. `}</p>
                    <p className={stylesFirstBlock.weThoughtOnline}>&nbsp;</p>
                    <p className={stylesFirstBlock.dontBelieveUs}>
                        Don’t believe us? Try it out for yourself. We guarantee
                        you’ll come back for more.
                    </p>
                    </h4>
                </div>
                </div>
            </div>
            </div>
            <div className={stylesFirstBlock.frameDiv4}>
            <div className={stylesFirstBlock.frameDiv5}>
                <h1 className={stylesFirstBlock.titleH1}>
                We’re Gamifying Education.
                </h1>
                <h3 className={stylesFirstBlock.textH3}>
                Use the new wave of NFTs to kickstart your online learning career.
                </h3>
            </div>
            <Button
                variant='solid'
                w='334px'
                colorScheme='teal'
                onClick={routeChange}
            >
                Get Started
            </Button>
            </div>
            <div className={stylesFirstBlock.frameDiv6}>
            <div className={stylesFirstBlock.frameDiv7}>
                <b className={stylesFirstBlock.titleB1}>
                <span>{`Powered By `}</span>
                <span className={stylesFirstBlock.polygonSpan}>Polygon</span>
                </b>
                <h4 className={stylesFirstBlock.textH41}>
                Thanks to Polygon’s Layer 2 blockchain, our users enjoy the
                comfort of fast and cheap transactions, with the added security of
                Ethereum’s Layer 1.
                </h4>
            </div>
            <img
                className={stylesFirstBlock.pNGImage8}
                alt=''
                src={Polygon}
            />
            </div>
            <b className={stylesFirstBlock.titleB2}>Our Devs</b>
            <div className={stylesFirstBlock.frameDiv8}>
            <div className={stylesFirstBlock.frameDiv9}>
                <img
                className={stylesFirstBlock.picture21Icon}
                alt=''
                src={olivier}
                />
                <h2 className={stylesFirstBlock.titleH2}>Olivier D.</h2>
            </div>
            <div className={stylesFirstBlock.frameDiv9}>
                <img
                className={stylesFirstBlock.picture21Icon}
                alt=''
                src={bryce}
                />
                <h2 className={stylesFirstBlock.titleH2}>Bryce P.</h2>
            </div>
            <div className={stylesFirstBlock.frameDiv9}>
                <img
                className={stylesFirstBlock.picture21Icon}
                alt=''
                src={ayush}
                />
                <h2 className={stylesFirstBlock.titleH2}>Ayush P.</h2>
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

export default Welcome
