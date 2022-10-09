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

const Question6 = () => {
    const location = useLocation();
    const { courseObjectId, q5CorrectAnswerCount } = location.state;
    const { Moralis } = useMoralis();
    const [courseName, setCourseName] = useState();
    const [question6, setQuestion6] = useState("");
    const [question6Answer, setQuestion6Answer] = useState("");
    const [fakeQuestion6Answer1, setFakeQuestion6Answer1] = useState("");
    const [fakeQuestion6Answer2, setFakeQuestion6Answer2] = useState("");
    const [fakeQuestion6Answer3, setFakeQuestion6Answer3] = useState("");
    const [shuffledAnswer1, setShuffledAnswer1] = useState("");
    const [shuffledAnswer2, setShuffledAnswer2] = useState("");
    const [shuffledAnswer3, setShuffledAnswer3] = useState("");
    const [shuffledAnswer4, setShuffledAnswer4] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("placeholder");
    const [correctAnswerSelected, setCorrectAnswerSelected] = useState(false);
    const [q6CorrectAnswerCount, setQ6CorrectAnswerCount] = useState(q5CorrectAnswerCount);

    const getCourse = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", courseObjectId);
        const course = await query.find();
        setCourseName(course[0].get("courseName"));
        setQuestion6(course[0].get("test").question6);
        setQuestion6Answer(course[0].get("test").question6Answer);
        setFakeQuestion6Answer1(course[0].get("test").fakeQuestion6Answer1);
        setFakeQuestion6Answer2(course[0].get("test").fakeQuestion6Answer2);
        setFakeQuestion6Answer3(course[0].get("test").fakeQuestion6Answer3);
    };

    const shuffleAnswers = () => {
        const answerArr = [question6Answer, fakeQuestion6Answer1, fakeQuestion6Answer2, fakeQuestion6Answer3];
        const shuffledAnswerArr = answerArr.sort(() => Math.random() - 0.5);
        setShuffledAnswer1(shuffledAnswerArr[0]);
        setShuffledAnswer2(shuffledAnswerArr[1]);
        setShuffledAnswer3(shuffledAnswerArr[2]);
        setShuffledAnswer4(shuffledAnswerArr[3]);
    };

    const checkAnswer = () => {
        if (selectedAnswer === question6Answer) {
            setCorrectAnswerSelected(true);
            setQ6CorrectAnswerCount(q6CorrectAnswerCount + 1);
        } else {
            if (correctAnswerSelected === true) {
                setCorrectAnswerSelected(false);
                setQ6CorrectAnswerCount(q6CorrectAnswerCount - 1);
            } else {
                setQ6CorrectAnswerCount(q6CorrectAnswerCount);
            }
        }
    };

    useEffect(() => {
        getCourse();
    }, []);

    useEffect(() => {
        shuffleAnswers();
    }, [question6Answer, fakeQuestion6Answer1, fakeQuestion6Answer2, fakeQuestion6Answer3]);

    useEffect(() => {
        checkAnswer();
    }, [selectedAnswer]);

    console.log(q6CorrectAnswerCount);

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
                            value={60}
                            colorScheme="green"
                        />
                        <h2 className={stylesFirstBlock.questionNumberTitle1}>Question 6:</h2>
                        <Textarea
                            className={stylesFirstBlock.progressDefault}
                            variant="outline"
                            placeholder={question6}
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
                            pathname: "/question5",
                            state: {courseObjectId, q5CorrectAnswerCount},
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
                            pathname: "/question7",
                            state: {courseObjectId, q6CorrectAnswerCount}
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

export default Question6
