// ADD IN CONTRACT LOADING AND ERROR HANDLING

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import moralis from "moralis";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  Textarea,
  Progress,
  Radio,
  RadioGroup,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SBT_CONTRACT_ADDRESS } from "../../components/consts/vars";
import { NFTEACH_SBT_CONTRACT_ABI } from "../../components/consts/contractABIs";
import Logo from "../../images/Logo.png";
import stylesHeader from "../../styles/Test_Page/Header.module.css";
import stylesFirstBlock from "../../styles/Test_Page/FirstBlock.module.css";
import stylesFooter from "../../styles/Test_Page/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Question10 = () => {
    const history = useHistory();
    const location = useLocation();
    const [isMintingInProgress , setIsMintingInProgress] = useState(false);
    const { courseObjectId, q9CorrectAnswerCount } = location.state;
    const {
        Moralis,
        isAuthenticated,
        isWeb3Enabled,
        isWeb3EnableLoading,
        enableWeb3,
    } = useMoralis();
    const {
        data,
        error: executeContractError,
        fetch: executeContractFunction,
        isFetching,
        isLoading,
    } = useWeb3ExecuteFunction();
    const user = moralis.User.current();
    const [courseName, setCourseName] = useState();
    const [question10, setQuestion10] = useState("");
    const [question10Answer, setQuestion10Answer] = useState("");
    const [fakeQuestion10Answer1, setFakeQuestion10Answer1] = useState("");
    const [fakeQuestion10Answer2, setFakeQuestion10Answer2] = useState("");
    const [fakeQuestion10Answer3, setFakeQuestion10Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
    const [q10CorrectAnswerCount, setQ10CorrectAnswerCount] = useState(q9CorrectAnswerCount);
    const [passingGrade, setPassingGrade] = useState("");
    const [pass, setPass] = useState(false);
    const [tokenId, setTokenId] = useState("");
    const [mintPrice, setMintPrice] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    const getCourse = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", courseObjectId);
        const course = await query.find();
        setCourseName(course[0].get("courseName"));
        setQuestion10(course[0].get("test").question10);
        setQuestion10Answer(course[0].get("test").question10Answer);
        setFakeQuestion10Answer1(course[0].get("test").fakeQuestion10Answer1);
        setFakeQuestion10Answer2(course[0].get("test").fakeQuestion10Answer2);
        setFakeQuestion10Answer3(course[0].get("test").fakeQuestion10Answer3);
        setPassingGrade(parseInt(course[0].get("test").passingGrade));
        setMintPrice(course[0].get("cost"));
    };
    console.log(mintPrice);

    const getSBT = async () => {
        const SBT = Moralis.Object.extend("CreateSBT");
        const query = new Moralis.Query(SBT);
        query.equalTo("courseObjectId", courseObjectId);
        const sbt = await query.find();
        setTokenId(sbt[0].get("tokenId"));
    };

    const shuffleAnswers = () => {
        const answerArr = [question10Answer, fakeQuestion10Answer1, fakeQuestion10Answer2, fakeQuestion10Answer3];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    };

    const checkAnswer = () => {
        if (selectedAnswer === question10Answer) {
            setCorrectAnswerSelected(true);
            setQ10CorrectAnswerCount(q10CorrectAnswerCount + 1);
        } else {
            if (correctAnswerSelected === true) {
                setCorrectAnswerSelected(false);
                setQ10CorrectAnswerCount(q10CorrectAnswerCount - 1);
            } else {
                setQ10CorrectAnswerCount(q10CorrectAnswerCount);
            }
        }
    };

    const checkPass = () => {
        if (q10CorrectAnswerCount >= passingGrade) {
            setPass(true);
        } else {
            setPass(false);
        }
    };

    const validateStudent = async () => {
        let studentAccount = user.attributes.accounts[0];

        const studentParams = {
        to: studentAccount,
        id: tokenId,
        };

        async function callValidateStudent() {
        const _Result = await Moralis.Cloud.run(
            "validateStudentTest",
            studentParams
        );
        console.log(_Result);
        }
        callValidateStudent();
    };

    const claimSBT = async () => {
        console.log("claiming SBT");
        const ValidateTests = Moralis.Object.extend("ValidateTest");
        const query = new Moralis.Query(ValidateTests);
        query.equalTo("student", user.attributes.accounts[0]);
        query.equalTo("tokenId_decimal", tokenId);
        const validateTestComplete = await query.find();
    
        if (validateTestComplete) {
          executeContractFunction({
            params: {
                abi: NFTEACH_SBT_CONTRACT_ABI,
                contractAddress: SBT_CONTRACT_ADDRESS,
                functionName: "mintSBT",
                params: {
                    _tokenId: tokenId,
                },
                msgValue: Moralis.Units.ETH(mintPrice)
            },
            onSuccess: () => {
                setIsMintingInProgress(false);
                routeStudentDash();
            },
            onError: (error) => {
                console.log("error", error);
            },
          });
        } else {
            console.log("Student not validated to mint SBT!");
        }
    };

    useEffect(() => {
        getCourse();
        getSBT();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        shuffleAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question10Answer, fakeQuestion10Answer1, fakeQuestion10Answer2, fakeQuestion10Answer3]);

    useEffect(() => {
        checkAnswer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAnswer]);

    console.log(q10CorrectAnswerCount);

    const routeStudentDash = () => {
        history.push("/studentDashboard");
    };

    const routeExplore = () => {
        history.push("/explore");
    };

    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <>
            {/* Header */}
            <div className={stylesHeader.frameDiv}>
                <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
            </div>
            {/* First Block */}
            <div className={stylesFirstBlock.testPageDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                    <h1 className={stylesFirstBlock.questionNumberTitle}>{courseName} - Test</h1>
                </div>
                <div className={stylesFirstBlock.frameDiv2}>
                    <div className={stylesFirstBlock.frameDiv3}>
                    <div className={stylesFirstBlock.frameDiv4}>
                        <div className={stylesFirstBlock.frameDiv5}>
                        <Progress
                            className={stylesFirstBlock.progressDefault}
                            value={100}
                            colorScheme="green"
                        />
                        <h2 className={stylesFirstBlock.questionNumberTitle1}>Question 10:</h2>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question10}
                            isReadOnly
                        />
                        </div>
                    </div>
                    <div className={stylesFirstBlock.lineDiv} />
                    <div className={stylesFirstBlock.frameDiv6}>
                        <div className={stylesFirstBlock.frameDiv7}>
                        <div className={stylesFirstBlock.frameDiv8}>
                            <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="flushed"
                            size="sm"
                            placeholder={shuffledAnswer1}
                            isReadOnly
                            />
                            <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="flushed"
                            size="sm"
                            placeholder={shuffledAnswer2}
                            isReadOnly
                            />
                            <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="flushed"
                            size="sm"
                            placeholder={shuffledAnswer3}
                            isReadOnly
                            />
                            <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="flushed"
                            size="sm"
                            placeholder={shuffledAnswer4}
                            isReadOnly
                            />
                        </div>
                        <RadioGroup onChange={setSelectedAnswer} value={selectedAnswer} >
                            <div className={stylesFirstBlock.frameDiv9}>
                                <div className={stylesFirstBlock.frameDiv10}>
                                    <Radio colorScheme="green" value={shuffledAnswer1} />
                                    <Radio colorScheme="green" value={shuffledAnswer2} />
                                    <Radio colorScheme="green" value={shuffledAnswer3} />
                                    <Radio colorScheme="green" value={shuffledAnswer4} />
                                </div>
                            </div>
                        </RadioGroup>
                        </div>
                    </div>
                    </div>
                    <div className={stylesFirstBlock.frameDiv11}>
                    <Link
                        to={{
                            pathname: "/question9",
                            state: {courseObjectId, q9CorrectAnswerCount},
                        }}
                    >
                        <Button
                        variant="solid"
                        w="162px"
                        colorScheme="green"
                        >
                        Back
                        </Button>
                    </Link>
                    <Button
                    variant="solid"
                    w="162px"
                    colorScheme="green"
                    onClick={async () => {
                        checkPass();
                        onOpen();
                    }}
                    >
                    Submit Test
                    </Button>
                    </div>
                </div>
                </div>
            </div>
            {/* Footer */}
            <div className={stylesFooter.frameDiv}>
                <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
            </div>
            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Test Results</ModalHeader>
            <ModalCloseButton
                onClick={() => {
                refreshPage();
                }}
            />
            {pass ? (
                <ModalBody>
                Congrats! You passed the test with a grade of {q10CorrectAnswerCount}
                /10!
                <br />
                <br />
                <Button
                    colorScheme='green'
                    mr={3}
                    isLoading={isMintingInProgress}
                    onClick={async () => {
                        await validateStudent();
                        setTimeout(claimSBT, 1000);
                    }}
                >
                    Claim SBT
                </Button>
                </ModalBody>
            ) : (
                <ModalBody>
                Sorry, you did not pass the test with a grade of{" "}
                {q10CorrectAnswerCount}/10!
                <br />
                <br />
                <Button colorScheme='green' mr={3} onClick={routeExplore}>
                    Back to Explore Page
                </Button>
                </ModalBody>
            )}
            </ModalContent>
        </Modal>
        </>
    )
}

export default Question10