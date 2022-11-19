import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button, NumberInput, NumberInputField } from "@chakra-ui/react";
import moralis from "moralis";
import Logo from '../images/Logo.png';
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/4/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/4/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/4/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const CourseCreation4 = () => {
  const history = useHistory();
  const { Moralis } = useMoralis();
  const user = moralis.User.current();
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [question1, setQuestion1] = useState();
  const [question1Answer, setQuestion1Answer] = useState();
  const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState();
  const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState();
  const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState();
  const [question2, setQuestion2] = useState();
  const [question2Answer, setQuestion2Answer] = useState();
  const [fakeQuestion2Answer1, setFakeQuestion2Answer1] = useState();
  const [fakeQuestion2Answer2, setFakeQuestion2Answer2] = useState();
  const [fakeQuestion2Answer3, setFakeQuestion2Answer3] = useState();
  const [question3, setQuestion3] = useState();
  const [question3Answer, setQuestion3Answer] = useState();
  const [fakeQuestion3Answer1, setFakeQuestion3Answer1] = useState();
  const [fakeQuestion3Answer2, setFakeQuestion3Answer2] = useState();
  const [fakeQuestion3Answer3, setFakeQuestion3Answer3] = useState();
  const [question4, setQuestion4] = useState();
  const [question4Answer, setQuestion4Answer] = useState();
  const [fakeQuestion4Answer1, setFakeQuestion4Answer1] = useState();
  const [fakeQuestion4Answer2, setFakeQuestion4Answer2] = useState();
  const [fakeQuestion4Answer3, setFakeQuestion4Answer3] = useState();
  const [question5, setQuestion5] = useState();
  const [question5Answer, setQuestion5Answer] = useState();
  const [fakeQuestion5Answer1, setFakeQuestion5Answer1] = useState();
  const [fakeQuestion5Answer2, setFakeQuestion5Answer2] = useState();
  const [fakeQuestion5Answer3, setFakeQuestion5Answer3] = useState();
  const [question6, setQuestion6] = useState();
  const [question6Answer, setQuestion6Answer] = useState();
  const [fakeQuestion6Answer1, setFakeQuestion6Answer1] = useState();
  const [fakeQuestion6Answer2, setFakeQuestion6Answer2] = useState();
  const [fakeQuestion6Answer3, setFakeQuestion6Answer3] = useState();
  const [question7, setQuestion7] = useState();
  const [question7Answer, setQuestion7Answer] = useState();
  const [fakeQuestion7Answer1, setFakeQuestion7Answer1] = useState();
  const [fakeQuestion7Answer2, setFakeQuestion7Answer2] = useState();
  const [fakeQuestion7Answer3, setFakeQuestion7Answer3] = useState();
  const [question8, setQuestion8] = useState();
  const [question8Answer, setQuestion8Answer] = useState();
  const [fakeQuestion8Answer1, setFakeQuestion8Answer1] = useState();
  const [fakeQuestion8Answer2, setFakeQuestion8Answer2] = useState();
  const [fakeQuestion8Answer3, setFakeQuestion8Answer3] = useState();
  const [question9, setQuestion9] = useState();
  const [question9Answer, setQuestion9Answer] = useState();
  const [fakeQuestion9Answer1, setFakeQuestion9Answer1] = useState();
  const [fakeQuestion9Answer2, setFakeQuestion9Answer2] = useState();
  const [fakeQuestion9Answer3, setFakeQuestion9Answer3] = useState();
  const [question10, setQuestion10] = useState();
  const [question10Answer, setQuestion10Answer] = useState();
  const [fakeQuestion10Answer1, setFakeQuestion10Answer1] = useState();
  const [fakeQuestion10Answer2, setFakeQuestion10Answer2] = useState();
  const [fakeQuestion10Answer3, setFakeQuestion10Answer3] = useState();
  const [passingGrade, setPassingGrade] = useState("7");

  const saveTest = async () => {
    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    const account = user.attributes.accounts[0];
    query.equalTo("educatorAddress", account);
    query.descending("createdAt");
    const Course = await query.first();

    Course.set("test", {
      question1,
      question1Answer,
      fakeQuestion1Answer1,
      fakeQuestion1Answer2,
      fakeQuestion1Answer3,
      question2,
      question2Answer,
      fakeQuestion2Answer1,
      fakeQuestion2Answer2,
      fakeQuestion2Answer3,
      question3,
      question3Answer,
      fakeQuestion3Answer1,
      fakeQuestion3Answer2,
      fakeQuestion3Answer3,
      question4,
      question4Answer,
      fakeQuestion4Answer1,
      fakeQuestion4Answer2,
      fakeQuestion4Answer3,
      question5,
      question5Answer,
      fakeQuestion5Answer1,
      fakeQuestion5Answer2,
      fakeQuestion5Answer3,
      question6,
      question6Answer,
      fakeQuestion6Answer1,
      fakeQuestion6Answer2,
      fakeQuestion6Answer3,
      question7,
      question7Answer,
      fakeQuestion7Answer1,
      fakeQuestion7Answer2,
      fakeQuestion7Answer3,
      question8,
      question8Answer,
      fakeQuestion8Answer1,
      fakeQuestion8Answer2,
      fakeQuestion8Answer3,
      question9,
      question9Answer,
      fakeQuestion9Answer1,
      fakeQuestion9Answer2,
      fakeQuestion9Answer3,
      question10,
      question10Answer,
      fakeQuestion10Answer1,
      fakeQuestion10Answer2,
      fakeQuestion10Answer3,
      passingGrade,
    });

    await Course.save();
    setIsUploadInProgress(false);
    console.log("Test saved");
  };

  const routeCourseReview = () => {
    history.push("/courseReview");
  };

  return (
    <>
      {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.courseCreationPage4}>
        <div className={stylesFirstBlock.frameDiv}>
          <h1 className={stylesFirstBlock.titleH1}>Create your course (4/4)</h1>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 1'
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question1Answer}
                onChange={(e) => setQuestion1Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion1Answer1}
                onChange={(e) => setFakeQuestion1Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion1Answer2}
                onChange={(e) => setFakeQuestion1Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion1Answer3}
                onChange={(e) => setFakeQuestion1Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 2'
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question2Answer}
                onChange={(e) => setQuestion2Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion2Answer1}
                onChange={(e) => setFakeQuestion2Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion2Answer2}
                onChange={(e) => setFakeQuestion2Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion2Answer3}
                onChange={(e) => setFakeQuestion2Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 3'
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question3Answer}
                onChange={(e) => setQuestion3Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion3Answer1}
                onChange={(e) => setFakeQuestion3Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion3Answer2}
                onChange={(e) => setFakeQuestion3Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion3Answer3}
                onChange={(e) => setFakeQuestion3Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 4'
                value={question4}
                onChange={(e) => setQuestion4(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question4Answer}
                onChange={(e) => setQuestion4Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion4Answer1}
                onChange={(e) => setFakeQuestion4Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion4Answer2}
                onChange={(e) => setFakeQuestion4Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion4Answer3}
                onChange={(e) => setFakeQuestion4Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 5'
                value={question5}
                onChange={(e) => setQuestion5(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question5Answer}
                onChange={(e) => setQuestion5Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion5Answer1}
                onChange={(e) => setFakeQuestion5Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion5Answer2}
                onChange={(e) => setFakeQuestion5Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion5Answer3}
                onChange={(e) => setFakeQuestion5Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 6'
                value={question6}
                onChange={(e) => setQuestion6(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question6Answer}
                onChange={(e) => setQuestion6Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion6Answer1}
                onChange={(e) => setFakeQuestion6Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion6Answer2}
                onChange={(e) => setFakeQuestion6Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion6Answer3}
                onChange={(e) => setFakeQuestion6Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 7'
                value={question7}
                onChange={(e) => setQuestion7(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question7Answer}
                onChange={(e) => setQuestion7Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion7Answer1}
                onChange={(e) => setFakeQuestion7Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion7Answer2}
                onChange={(e) => setFakeQuestion7Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion7Answer3}
                onChange={(e) => setFakeQuestion7Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 8'
                value={question8}
                onChange={(e) => setQuestion8(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question8Answer}
                onChange={(e) => setQuestion8Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion8Answer1}
                onChange={(e) => setFakeQuestion8Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion8Answer2}
                onChange={(e) => setFakeQuestion8Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion8Answer3}
                onChange={(e) => setFakeQuestion8Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 9'
                value={question9}
                onChange={(e) => setQuestion9(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question9Answer}
                onChange={(e) => setQuestion9Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion9Answer1}
                onChange={(e) => setFakeQuestion9Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion9Answer2}
                onChange={(e) => setFakeQuestion9Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion9Answer3}
                onChange={(e) => setFakeQuestion9Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.qUESTION1Div}>
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Question 10'
                value={question10}
                onChange={(e) => setQuestion10(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Answer'
                value={question10Answer}
                onChange={(e) => setQuestion10Answer(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 1'
                value={fakeQuestion10Answer1}
                onChange={(e) => setFakeQuestion10Answer1(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 2'
                value={fakeQuestion10Answer2}
                onChange={(e) => setFakeQuestion10Answer2(e.target.value)}
              />
              <Input
                className={stylesFirstBlock.inputOutline}
                variant='outline'
                textColor='#e4e4e4'
                placeholder='Fake Answer 3'
                value={fakeQuestion10Answer3}
                onChange={(e) => setFakeQuestion10Answer3(e.target.value)}
              />
            </div>
            <div className={stylesFirstBlock.passingGradeDiv}>
              <div className={stylesFirstBlock.courseNameDiv}>
                Passing Grade out of 10
              </div>
              <NumberInput
                className={stylesFirstBlock.inputOutline}
                variant="outline"
                textColor="#e4e4e4"
                placeholder="What will the passing grade be for your test out of 10?"
                defaultValue={7}
                min={1}
                max={10}
                precision={0}
                step={1}
                onChange={(valueString) => setPassingGrade(valueString)}
                >
                  <NumberInputField />
                </NumberInput>
                <br />
                <Button 
                variant="solid" 
                w="357px" 
                colorScheme="green"
                isLoading={isUploadInProgress}
                onClick={async () => {
                    setIsUploadInProgress(true);
                    await saveTest();
                    routeCourseReview();
                }}
            >
            Review Course and Test
            </Button>
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

export default CourseCreation4
