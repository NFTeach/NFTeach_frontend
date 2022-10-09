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

const Question4 = () => {
    const location = useLocation();
    const { courseObjectId, q3CorrectAnswerCount } = location.state;
    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [question4, setQuestion4] = useState("");
    const [question4Answer, setQuestion4Answer] = useState("");
    const [fakeQuestion4Answer1, setFakeQuestion4Answer1] = useState("");
    const [fakeQuestion4Answer2, setFakeQuestion4Answer2] = useState("");
    const [fakeQuestion4Answer3, setFakeQuestion4Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
    const [q4CorrectAnswerCount, setQ4CorrectAnswerCount] = useState(q3CorrectAnswerCount);

    const getCourse = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", courseObjectId);
        const course = await query.find();
        setCourseName(course[0].get("courseName"));
        setQuestion4(course[0].get("test").question4);
        setQuestion4Answer(course[0].get("test").question4Answer);
        setFakeQuestion4Answer1(course[0].get("test").fakeQuestion4Answer1);
        setFakeQuestion4Answer2(course[0].get("test").fakeQuestion4Answer2);
        setFakeQuestion4Answer3(course[0].get("test").fakeQuestion4Answer3);
    };

    const shuffleAnswers = () => {
        const answerArr = [question4Answer, fakeQuestion4Answer1, fakeQuestion4Answer2, fakeQuestion4Answer3];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    };

    const checkAnswer = () => {
        if (selectedAnswer === question4Answer) {
            setCorrectAnswerSelected(true);
            setQ4CorrectAnswerCount(q4CorrectAnswerCount + 1);
        } else {
            if (correctAnswerSelected === true) {
                setCorrectAnswerSelected(false);
                setQ4CorrectAnswerCount(q4CorrectAnswerCount - 1);
            } else {
                setQ4CorrectAnswerCount(q4CorrectAnswerCount);
            }
        }
    };

    useEffect(() => {
        getCourse();
    }, []);

    useEffect(() => {
        shuffleAnswers();
    }, [question4Answer, fakeQuestion4Answer1, fakeQuestion4Answer2, fakeQuestion4Answer3]);

    useEffect(() => {
        checkAnswer();
    }, [selectedAnswer]);

    console.log(q4CorrectAnswerCount);

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
                            value={40}
                            colorScheme="green"
                        />
                        <h2 className={stylesFirstBlock.questionNumberTitle1}>Question 4:</h2>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question4}
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
                            pathname: "/question3",
                            state: {courseObjectId, q3CorrectAnswerCount},
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
                            pathname: "/question5",
                            state: {courseObjectId, q4CorrectAnswerCount}
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

export default Question4
