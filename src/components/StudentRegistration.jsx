import React, { useEffect, useState } from 'react';
import moralis from 'moralis';
import { useHistory } from 'react-router-dom';
import { Input, Button } from "@chakra-ui/react";
import { CHAIN } from "../components/consts/vars";
import { CHAIN_ID } from '../components/consts/vars';
import { useMoralis } from 'react-moralis';
import stylesHeader from "../styles/StudentRegistration_Page/Header.module.css";
import stylesFirstBlock from "../styles/StudentRegistration_Page/FirstBlock.module.css";
import stylesFooter from "../styles/StudentRegistration_Page/Footer.module.css";
import Logo from "../images/Logo.png";
import Coin from "../images/studentRegistration_imgs/coin.png";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const StudentRegistration = () => {
    const history = useHistory();
    const {
        Moralis,
        authenticate,
        isAuthenticated,
        isWeb3Enabled,
        isWeb3EnableLoading,
        enableWeb3,
    } = useMoralis(); 
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [selectedAddress, setSelectedAddress] = useState();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    const checkChain = async () => {
        const web3 = await Moralis.Web3.enableWeb3();
        const chain = web3.currentProvider;
        setSelectedAddress(chain.selectedAddress);
        // console.log(chain);
        const chainId = chain.networkVersion;
        //   console.log(chainId)
        if (chainId !== CHAIN_ID) {
            alert(`Please switch to the ${CHAIN} network!`);
            window.location.reload();
            return;
        }
    };

    useEffect(() => {
        checkChain();
    }, []);

    // Save user info to db
    const saveInfo = async () => {
        try {
            await authenticate();
            const User = Moralis.Object.extend("_User");
            const query = new Moralis.Query(User);
            const myDetails = await query.first();

            if (username) {
                myDetails?.set("username", username);
            }

            if (bio) {
                myDetails?.set("bio", bio);
            }

            await myDetails?.save();

            let studentAddressTo = myDetails?.attributes.ethAddress;

            const studentParams = {
                to: studentAddressTo,
            };

            async function callAddStudent() {
                const _Result = await Moralis.Cloud.run("registerStudent", studentParams);
                console.log(_Result);
            }
                callAddStudent();
            }
        catch (error) {
            window.alert(`ERROR: ${error.message} Please pick a new username!`);
            window.reload();
        }
        
    };

    const routeChange = () => {
        history.push("/explore");
    };

    return (
        <>
        {/* Header */}
        <div className={stylesHeader.frameDiv}>
            <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
        </div>
        {/* First Block */}
        <div className={stylesFirstBlock.studentRegistrationDiv}>
            <div className={stylesFirstBlock.rightColumnElements}>
            <form className={stylesFirstBlock.inputsForm}>
                <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                    <div className={stylesFirstBlock.createAnAccount}>
                    Create an account
                    </div>
                </div>
                <div className={stylesFirstBlock.frameDiv2}>
                    <div className={stylesFirstBlock.frameDiv3}>
                    <div className={stylesFirstBlock.frameDiv4}>
                        <div className={stylesFirstBlock.usernameDiv}>Username (1 - 20 characters)</div>
                        <Input
                        className={stylesFirstBlock.inputOutline}
                        placeholder='Username'
                        variant='outline'
                        textColor='#e4e4e4'
                        min={1}
                        max={20}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={stylesFirstBlock.frameDiv5}>
                        <div className={stylesFirstBlock.interestsDiv}>
                        Bio (1 - 100 characters)
                        </div>
                        <Input
                        className={stylesFirstBlock.inputOutline}
                        variant='outline'
                        textColor='#e4e4e4'
                        placeholder='Bio'
                        min={1}
                        max={100}
                        onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    </div>
                    <Button
                    className={stylesFirstBlock.buttonSolidTextAndIcon}
                    variant='solid'
                    colorScheme='green'
                    onClick={async () => {
                        await saveInfo();
                        routeChange();
                    }}
                    >
                    Enter App
                    </Button>
                </div>
                </div>
            </form>
            </div>
            <div className={stylesFirstBlock.titleDiv}>
            <div className={stylesFirstBlock.frameDiv6}>
                <div className={stylesFirstBlock.frameDiv7}>
                <div className={stylesFirstBlock.frameDiv8}>
                    <b className={stylesFirstBlock.titleB}>
                    <p
                        className={stylesFirstBlock.learnMoreWith}
                    >{`Learn more with `}</p>
                    <p
                        className={stylesFirstBlock.learnMoreWith}
                    >{`crypto, only on `}</p>
                    <p className={stylesFirstBlock.nFTeachP}>NFTeach</p>
                    </b>
                </div>
                <div className={stylesFirstBlock.frameDiv9}>
                    <div className={stylesFirstBlock.titleB}>
                    <p
                        className={stylesFirstBlock.learnMoreWith}
                    >{`Set up an account to start learning `}</p>
                    <p className={stylesFirstBlock.nFTeachP}>
                        from the world’s top minds
                    </p>
                    </div>
                </div>
                <div className={stylesFirstBlock.frameDiv10}>
                    <img
                    className={stylesFirstBlock.cultureCryptocurrency1Icon}
                    alt=''
                    src={Coin}
                    />
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

export default StudentRegistration
