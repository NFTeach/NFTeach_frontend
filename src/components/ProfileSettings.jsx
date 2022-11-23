import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import {
    Input,
    Button,
    Image,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
} from "@chakra-ui/react";
import moralis from "moralis";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { defaultImgs } from "../images/defaultImgs";
import { CHAIN } from "./consts/vars";
import Logo from "../images/Logo.png";
import ImageNotFound from "../images/imageNotFound.jpg";
import stylesHeader from "../styles/ProfileSettings_Page/Header.module.css";
import stylesFirstBlock from "../styles/ProfileSettings_Page/FirstBlock.module.css";
import stylesFooter from "../styles/ProfileSettings_Page/Footer.module.css";

const appId = process.env.REACT_APP_MORALIS_APPLICATION_ID;
const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
const moralisSecert = process.env.REACT_APP_MORALIS_SECERT;
moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const ProfileSettings = () => {
    const history = useHistory();
    const [pfp, setPfp] = useState();
    const [pfps, setPfps] = useState([]);
    const [selectedPFP, setSelectedPFP] = useState();
    const [username, setUsername] = useState();
    const [bio, setBio] = useState();
    const [educator, setEducator] = useState();
    const { Moralis, isAuthenticated, account } = useMoralis();
    const user = moralis.User.current();
    const {
        isOpen: isUsernameOpen,
        onOpen: onUsernameOpen,
        onClose: onUsernameClose,
    } = useDisclosure();
    const {
        isOpen: isProfilePicOpen,
        onOpen: onProfilePicOpen,
        onClose: onProfilePicClose,
    } = useDisclosure();
    const {
        isOpen: isBioOpen,
        onOpen: onBioOpen,
        onClose: onBioClose,
    } = useDisclosure();
    const Web3Api = useMoralisWeb3Api();

    const resolveLink = (url) => {
        if (!url || !url.includes("ipfs://")) return url;
        return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
    };

    const fetchNFTs = async () => {
        try {
            const account = user.attributes.accounts[0];
            const options = {
                chain: CHAIN,
                address: account,
            };
            await Moralis.start({ serverUrl, appId, moralisSecert });
            const NFTs = await Web3Api.account.getNFTs(options);
            const images = NFTs.result.map((e) =>
                resolveLink(JSON.parse(e.metadata)?.image)
            );
            setPfps(images);
        }
        catch (error) {
            console.log(error);
            return;
        }
    };

    const getEducators = async () => {
        if(!user) {
            return;
        } else {
            const Educators = Moralis.Object.extend("Educators");
            const query = new Moralis.Query(Educators);
            const account = user.attributes.accounts[0];
            query.equalTo("educator", account);
            const educator = await query.find();
            setEducator(educator[0]);
        }
    };

    const saveUsername = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (username) {
        myDetails.set("username", username);
        }

        await myDetails.save();
        refreshPage();
    };

    const saveProfilePic = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (selectedPFP) {
        myDetails.set("pfp", selectedPFP);
        }

        await myDetails.save();
        refreshPage();
    };

    const saveBio = async () => {
        const User = Moralis.Object.extend("_User");
        const query = new Moralis.Query(User);
        const myDetails = await query.first();

        if (bio) {
        myDetails.set("bio", bio);
        }

        await myDetails.save();
        refreshPage();
    };

    useEffect(() => {
        fetchNFTs();
        getEducators();
    }, [isAuthenticated, account]);

    useEffect(() => {
        if (!user) return null;
        setPfp(user.get("pfp"));
    }, [user]);

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

    const routeExplore = () => {
        history.push("/explore");
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const logout = async () => {
        await Moralis.User.logOut();
        history.push("/welcome")
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
                    onClick={routeStudentDashboard}
                >
                    Student Dashboard
                </button>
                <button
                    className={stylesHeader.studentDashboardButton}
                    onClick={routeExplore}
                >
                    Explore
                </button>
                <button
                    className={stylesHeader.studentDashboardButton}
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
                <button className={stylesHeader.nameButton}>
                    {user?.attributes.username.slice(0, 15)}{" "}
                </button>
                </div>
            </div>
            </div>
        </div>
        {/* First Block */}
        <div className={stylesFirstBlock.profilePageDiv}>
        <b
            className={stylesFirstBlock.nFTeachProfileSettings}
        >{`NFTeach Profile & Settings`}</b>
        <div className={stylesFirstBlock.frameDiv}>
            <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
                <img className={stylesFirstBlock.nFTIcon} alt="" src={pfp ? pfp : defaultImgs[0]} onClick={onProfilePicOpen} />
            </div>
            <div className={stylesFirstBlock.aboutDiv}>
                <div className={stylesFirstBlock.frameDiv3}>
                <h2 className={stylesFirstBlock.titleH2}>ABOUT</h2>
                <h4 className={stylesFirstBlock.textH4} onClick={onBioOpen}>
                    {user?.attributes.bio}
                </h4>
                </div>
            </div>
            </div>
            <div className={stylesFirstBlock.frameDiv4}>
            <div className={stylesFirstBlock.aboutDiv1}>
                <div className={stylesFirstBlock.frameDiv5}>
                <h2 className={stylesFirstBlock.titleH21}>USER PROFILE</h2>
                <h4 className={stylesFirstBlock.nameH4}>{user?.attributes.username.slice(0, 15)}</h4>
                <h4 className={stylesFirstBlock.editButtonH4} onClick={onUsernameOpen}><b>Edit Username</b></h4>
                <h4 className={stylesFirstBlock.addressH4}>{`Address: ${user?.attributes.ethAddress.slice(0,4)}...${user?.attributes.ethAddress.slice(38)}`}</h4>
                <h4 className={stylesFirstBlock.studentEducatorH4}>Role: {educator ? "Student and Educator" : "Student" }</h4>
                <h4 className={stylesFirstBlock.dateJoinedH4}>
                    <span className={stylesFirstBlock.dateJoinedTxt}>
                    <b>Joined:</b>
                    <span> {`${user?.attributes.createdAt}`}</span>
                    </span>
                </h4>
                </div>
                <Button
                className={stylesFirstBlock.buttonSolidTextAndIcon}
                variant="solid"
                colorScheme="red"
                onClick={async () => logout()}
                >
                Log Out
                </Button>
            </div>
            <div className={stylesFirstBlock.streakDiv}>
                <h2 className={stylesFirstBlock.frameH2}>
                <b className={stylesFirstBlock.titleB}>STREAK (Coming soon!)</b>
                </h2>
                <h1 className={stylesFirstBlock.numberOfDays}>5</h1>
            </div>
            </div>
        </div>
        </div>
        {/* Footer */}
        <div className={stylesFooter.frameDiv}>
            <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
        </div>
        {/* Username Modal */}
        <Modal isOpen={isUsernameOpen} onClose={onUsernameClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit Username</ModalHeader>
            <ModalCloseButton
                onClick={() => {
                refreshPage();
                }}
            />
            <ModalBody>
                <Input
                label='Username'
                name='NameChange'
                variant='outline'
                textColor='#000000'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                variant='ghost'
                onClick={async () => {
                    await saveUsername();
                    onUsernameClose();
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        {/* Profile Pic Modal */}
        <Modal isOpen={isProfilePicOpen} onClose={onProfilePicClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Choose NFT below as Profile Pic</ModalHeader>
            <ModalCloseButton
                onClick={() => {
                refreshPage();
                }}
            />
            <ModalBody>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    }}
                >
                {pfps.map((e, i) => {
                    return (
                    <>
                    <Box as='button'>
                        <Image
                            src={e}
                            fallbackSrc={ImageNotFound}
                            alt="profilePFP"
                            boxSize="100px"
                            borderRadius='full'
                            className={
                                selectedPFP === e ? "pfpOptionSelected" : "pfpOption"
                            }
                            onClick={() => {
                                setSelectedPFP(pfps[i]);
                            }}
                        />
                    </Box>
                    </>
                    );
                })}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                variant='ghost'
                onClick={async () => {
                    await saveProfilePic();
                    onProfilePicClose();
                    window.location.reload();
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        <Modal isOpen={isBioOpen} onClose={onBioClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Edit Bio</ModalHeader>
            <ModalCloseButton
                onClick={() => {
                refreshPage();
                }}
            />
            <ModalBody>
                <Input
                label='Bio'
                name='BioChange'
                variant='outline'
                textColor='#000000'
                placeholder='Bio'
                onChange={(e) => setBio(e.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                variant='ghost'
                onClick={async () => {
                    await saveBio();
                    onBioClose();
                }}
                >
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ProfileSettings
