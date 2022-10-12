// ADD BUTTON TO GO BACK TO EXPLORE PAGE

import React, { useState, useEffect } from 'react';
import {
    Button,
    Select,
    Textarea,
} from "@chakra-ui/react";
import { useLocation, Link } from 'react-router-dom';
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import Logo from "../images/Logo.png";
import stylesHeader from "../styles/Course_Page/Header.module.css";
import stylesFirstBlock from "../styles/Course_Page/FirstBlock.module.css";
import stylesFooter from "../styles/Course_Page/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const Course = () => {
    const { Moralis } = useMoralis();
    const [courseSection1, setCourseSection1] = useState();
    const [courseSection2, setCourseSection2] = useState();
    const [courseSection3, setCourseSection3] = useState();
    const [selectedSectionName, setSelectedSectionName] = useState();
    const [selectedSectionDescription, setSelectedSectionDescription] = useState();
    const [selectedSectionVideo, setSelectedSectionVideo] = useState();
    const location = useLocation();
    const { courseObjectId } = location.state;
    // console.log(courseObjectId);

    const getCourse = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        query.equalTo("objectId", courseObjectId);
        const course = await query.find();
        setCourseSection1(course[0].get("courseSection1"));
        setCourseSection2(course[0].get("courseSection2"));
        setCourseSection3(course[0].get("courseSection3"));
        setSelectedSectionName(course[0].get("courseSection1")?.sectionName);
        setSelectedSectionDescription(course[0].get("courseSection1")?.sectionDescription);
        setSelectedSectionVideo(course[0].get("courseSection1")?.vid);
    };

    const handleSectionChange = (e) => {
        if (e === "1") {
            setSelectedSectionName(courseSection1?.sectionName);
            setSelectedSectionDescription(courseSection1?.sectionDescription);
            setSelectedSectionVideo(courseSection1?.vid);
        } else if (e === "2") {
            setSelectedSectionName(courseSection2?.sectionName);
            setSelectedSectionDescription(courseSection2?.sectionDescription);
            setSelectedSectionVideo(courseSection2?.vid);
        } else if (e === "3") {
            setSelectedSectionName(courseSection3?.sectionName);
            setSelectedSectionDescription(courseSection3?.sectionDescription);
            setSelectedSectionVideo(courseSection3?.vid);
        }
    };

    useEffect(() => {
        getCourse();
    }, []);

    return (
        <>
            {/* Header */}
            <div className={stylesHeader.frameDiv}>
                <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
            </div>
            {/* First Block */}
            <div className={stylesFirstBlock.courseDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                    <Select color="black" bg="green" onChange={(e) => handleSectionChange(e.target.value)}>
                    <option value="1">{courseSection1?.sectionName}</option>
                    <option value="2">{courseSection2?.sectionName}</option>
                    <option value="3">{courseSection3?.sectionName}</option>
                    </Select>
                    <video className={stylesFirstBlock.frameVideo} src={selectedSectionVideo} controls>
                    <source />
                    </video>
                    <div className={stylesFirstBlock.frameDiv2}>
                    <div className={stylesFirstBlock.frameDiv3}>
                        <Textarea
                        className={stylesFirstBlock.rectangleTextarea}
                        variant='outline'
                        placeholder={selectedSectionDescription}
                        isDisabled
                        isReadOnly
                        />
                    </div>
                    </div>
                </div>
                <Link
                    to={{
                        pathname: "/question1",
                        state: {courseObjectId},
                    }}
                >
                    <Button variant="solid" w="272px" colorScheme="green">
                        Attempt Test
                    </Button>
                </Link>
                </div>
            </div>
            {/* Footer */}
            <div className={stylesFooter.frameDiv}>
                <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
            </div>
        </>
    )
}

export default Course
