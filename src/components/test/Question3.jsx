import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import {
  Textarea,
  Progress,
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import Logo from "../../images/Logo.png";
import stylesHeader from "../../styles/Test_Page/Header.module.css";
import stylesFirstBlock from "../../styles/Test_Page/FirstBlock.module.css";
import stylesFooter from "../../styles/Test_Page/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Question3 = () => {
    const location = useLocation();
    const { courseObjectId, q2CorrectAnswerCount } = location.state;
    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [question3, setQuestion3] = useState("");
    const [question3Answer, setQuestion3Answer] = useState("");
    const [fakeQuestion3Answer1, setFakeQuestion3Answer1] = useState("");
    const [fakeQuestion3Answer2, setFakeQuestion3Answer2] = useState("");
    const [fakeQuestion3Answer3, setFakeQuestion3Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
    const [q3CorrectAnswerCount, setQ3CorrectAnswerCount] = useState(q2CorrectAnswerCount);

    const getCourse = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", courseObjectId);
        const course = await query.find();
        setCourseName(course[0].get("courseName"));
        setQuestion3(course[0].get("test").question3);
        setQuestion3Answer(course[0].get("test").question3Answer);
        setFakeQuestion3Answer1(course[0].get("test").fakeQuestion3Answer1);
        setFakeQuestion3Answer2(course[0].get("test").fakeQuestion3Answer2);
        setFakeQuestion3Answer3(course[0].get("test").fakeQuestion3Answer3);
    };

    const shuffleAnswers = () => {
        const answerArr = [question3Answer, fakeQuestion3Answer1, fakeQuestion3Answer2, fakeQuestion3Answer3];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    };

    const checkAnswer = () => {
        if (selectedAnswer === question3Answer) {
            setCorrectAnswerSelected(true);
            setQ3CorrectAnswerCount(q3CorrectAnswerCount + 1);
        } else {
            if (correctAnswerSelected === true) {
                setCorrectAnswerSelected(false);
                setQ3CorrectAnswerCount(q3CorrectAnswerCount - 1);
            } else {
                setQ3CorrectAnswerCount(q3CorrectAnswerCount);
            }
        }
    };

    useEffect(() => {
        getCourse();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        shuffleAnswers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [question3Answer, fakeQuestion3Answer1, fakeQuestion3Answer2, fakeQuestion3Answer3]);

    useEffect(() => {
        checkAnswer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAnswer]);

    // console.log(q3CorrectAnswerCount);

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
                            value={30}
                            colorScheme="green"
                        />
                        <h2 className={stylesFirstBlock.questionNumberTitle1}>Question 3:</h2>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question3}
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
                            pathname: "/question2",
                            state: {courseObjectId, q2CorrectAnswerCount},
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
                    <Link
                        to={{
                            pathname: "/question4",
                            state: {courseObjectId, q3CorrectAnswerCount}
                        }}
                    >
                        <Button
                        variant="solid"
                        w="162px"
                        colorScheme="green"
                        >
                        Next
                        </Button>
                    </Link>
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

export default Question3
