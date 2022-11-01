// NEED TO ADD RESTRICTION TO NOT ALLOW SELECTION OF SAME COURSE AS PRE REQ

import React, { useEffect, useState, useRef } from 'react';
import {
    Input,
    Button,
    Image,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Table,
    Tfoot,
    Box,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    useToast,
    Select,
    Stack,
    Heading,
    TableContainer,
    Link
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import moralis from "moralis";
import { useMoralis } from 'react-moralis';
import { useHistory } from "react-router-dom";
import Logo from '../images/Logo.png';
import stylesHeader from "../styles/CourseCreation_Pages/Review/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/Review/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/Review/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const CourseReview = () => {
    const history = useHistory();
    const [isSavingInProgress, setIsSavingInProgress] = useState(false);
    const { Moralis } = useMoralis();
    const user = moralis.User.current();
    const toast = useToast();
    const [courseName, setCourseName] = useState("");
    const [courseDescription, setCourseDescription] = useState("");
    const [courseCost, setCourseCost] = useState("");
    const [coursePrerequisite, setCoursePrerequisite] = useState("");
    const [coursePrerequisites, setCoursePrerequisites] = useState([]);
    const [coursePrerequisiteName, setCoursePrerequisiteName] = useState("");
    const inputImageFile = useRef(null);
    const inputVideoFile = useRef(null);
    const [uploadedImageFile, setUploadedImageFile] = useState(null);
    const [courseImage, setCourseImage] = useState("");
    const [sectionName, setSectionName] = useState();
    const [sectionDescription, setSectionDescription] = useState();
    const [selectedSection, setSelectedSection] = useState("");
    const [uploadedVideoFile, setUploadedVideoFile] = useState(null);
    const [section1Title, setSection1Title] = useState("");
    const [section1Description, setSection1Description] = useState("");
    const [section1Video, setSection1Video] = useState("");
    const [section2Title, setSection2Title] = useState("");
    const [section2Description, setSection2Description] = useState("");
    const [section2Video, setSection2Video] = useState("");
    const [section3Title, setSection3Title] = useState("");
    const [section3Description, setSection3Description] = useState("");
    const [section3Video, setSection3Video] = useState("");
    const [question1, setQuestion1] = useState("");
    const [question1Answer, setQuestion1Answer] = useState("");
    const [fakeQuestion1Answer1, setFakeQuestion1Answer1] = useState("");
    const [fakeQuestion1Answer2, setFakeQuestion1Answer2] = useState("");
    const [fakeQuestion1Answer3, setFakeQuestion1Answer3] = useState("");
    const [question2, setQuestion2] = useState("");
    const [question2Answer, setQuestion2Answer] = useState("");
    const [fakeQuestion2Answer1, setFakeQuestion2Answer1] = useState("");
    const [fakeQuestion2Answer2, setFakeQuestion2Answer2] = useState("");
    const [fakeQuestion2Answer3, setFakeQuestion2Answer3] = useState("");
    const [question3, setQuestion3] = useState("");
    const [question3Answer, setQuestion3Answer] = useState("");
    const [fakeQuestion3Answer1, setFakeQuestion3Answer1] = useState("");
    const [fakeQuestion3Answer2, setFakeQuestion3Answer2] = useState("");
    const [fakeQuestion3Answer3, setFakeQuestion3Answer3] = useState("");
    const [question4, setQuestion4] = useState("");
    const [question4Answer, setQuestion4Answer] = useState("");
    const [fakeQuestion4Answer1, setFakeQuestion4Answer1] = useState("");
    const [fakeQuestion4Answer2, setFakeQuestion4Answer2] = useState("");
    const [fakeQuestion4Answer3, setFakeQuestion4Answer3] = useState("");
    const [question5, setQuestion5] = useState("");
    const [question5Answer, setQuestion5Answer] = useState("");
    const [fakeQuestion5Answer1, setFakeQuestion5Answer1] = useState("");
    const [fakeQuestion5Answer2, setFakeQuestion5Answer2] = useState("");
    const [fakeQuestion5Answer3, setFakeQuestion5Answer3] = useState("");
    const [question6, setQuestion6] = useState("");
    const [question6Answer, setQuestion6Answer] = useState("");
    const [fakeQuestion6Answer1, setFakeQuestion6Answer1] = useState("");
    const [fakeQuestion6Answer2, setFakeQuestion6Answer2] = useState("");
    const [fakeQuestion6Answer3, setFakeQuestion6Answer3] = useState("");
    const [question7, setQuestion7] = useState("");
    const [question7Answer, setQuestion7Answer] = useState("");
    const [fakeQuestion7Answer1, setFakeQuestion7Answer1] = useState("");
    const [fakeQuestion7Answer2, setFakeQuestion7Answer2] = useState("");
    const [fakeQuestion7Answer3, setFakeQuestion7Answer3] = useState("");
    const [question8, setQuestion8] = useState("");
    const [question8Answer, setQuestion8Answer] = useState("");
    const [fakeQuestion8Answer1, setFakeQuestion8Answer1] = useState("");
    const [fakeQuestion8Answer2, setFakeQuestion8Answer2] = useState("");
    const [fakeQuestion8Answer3, setFakeQuestion8Answer3] = useState("");
    const [question9, setQuestion9] = useState("");
    const [question9Answer, setQuestion9Answer] = useState("");
    const [fakeQuestion9Answer1, setFakeQuestion9Answer1] = useState("");
    const [fakeQuestion9Answer2, setFakeQuestion9Answer2] = useState("");
    const [fakeQuestion9Answer3, setFakeQuestion9Answer3] = useState("");
    const [question10, setQuestion10] = useState("");
    const [question10Answer, setQuestion10Answer] = useState("");
    const [fakeQuestion10Answer1, setFakeQuestion10Answer1] = useState("");
    const [fakeQuestion10Answer2, setFakeQuestion10Answer2] = useState("");
    const [fakeQuestion10Answer3, setFakeQuestion10Answer3] = useState("");
    const [passingGrade, setPassingGrade] = useState("");
    const {
        isOpen: isCourseInfoEditOpen,
        onOpen: onCourseInfoEditOpen,
        onClose: onCourseInfoEditClose,
    } = useDisclosure();
    const {
        isOpen: isImageEditOpen,
        onOpen: onImageEditOpen,
        onClose: onImageEditClose,
    } = useDisclosure();
    const {
        isOpen: isCourseSectionsEditOpen,
        onOpen: onCourseSectionsEditOpen,
        onClose: onCourseSectionsEditClose,
    } = useDisclosure();
    const {
        isOpen: isTestEditOpen,
        onOpen: onTestEditOpen,
        onClose: onTestEditClose,
    } = useDisclosure();

    const getCourseInfo = async () => {
        if (!user) {
            window.alert("Please connect wallet");
        } else {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const account = user.attributes.accounts[0];
        query.equalTo("educatorAddress", account);
        query.descending("createdAt");
        const Course = await query.first();

        setCourseName(Course.get("courseName"));
        setCourseDescription(Course.get("description"));
        setCourseCost(Course.get("cost"));
        setCoursePrerequisite(Course.get("prerequisite"));
        setCourseImage(Course.attributes.imageFile?.img);
        setSection1Title(Course.attributes.courseSection1?.sectionName);
        setSection1Description(Course.attributes.courseSection1?.sectionDescription);
        setSection1Video(Course.attributes.courseSection1?.vid);
        setSection2Title(Course.attributes.courseSection2?.sectionName);
        setSection2Description(Course.attributes.courseSection2?.sectionDescription);
        setSection2Video(Course.attributes.courseSection2?.vid);
        setSection3Title(Course.attributes.courseSection3?.sectionName);
        setSection3Description(Course.attributes.courseSection3?.sectionDescription);
        setSection3Video(Course.attributes.courseSection3?.vid);
        setQuestion1(Course.attributes.test?.question1);
        setQuestion1Answer(Course.attributes.test?.question1Answer);
        setFakeQuestion1Answer1(Course.attributes.test?.fakeQuestion1Answer1);
        setFakeQuestion1Answer2(Course.attributes.test?.fakeQuestion1Answer2);
        setFakeQuestion1Answer3(Course.attributes.test?.fakeQuestion1Answer3);
        setQuestion2(Course.attributes.test?.question2);
        setQuestion2Answer(Course.attributes.test?.question2Answer);
        setFakeQuestion2Answer1(Course.attributes.test?.fakeQuestion2Answer1);
        setFakeQuestion2Answer2(Course.attributes.test?.fakeQuestion2Answer2);
        setFakeQuestion2Answer3(Course.attributes.test?.fakeQuestion2Answer3);
        setQuestion3(Course.attributes.test?.question3);
        setQuestion3Answer(Course.attributes.test?.question3Answer);
        setFakeQuestion3Answer1(Course.attributes.test?.fakeQuestion3Answer1);
        setFakeQuestion3Answer2(Course.attributes.test?.fakeQuestion3Answer2);
        setFakeQuestion3Answer3(Course.attributes.test?.fakeQuestion3Answer3);
        setQuestion4(Course.attributes.test?.question4);
        setQuestion4Answer(Course.attributes.test?.question4Answer);
        setFakeQuestion4Answer1(Course.attributes.test?.fakeQuestion4Answer1);
        setFakeQuestion4Answer2(Course.attributes.test?.fakeQuestion4Answer2);
        setFakeQuestion4Answer3(Course.attributes.test?.fakeQuestion4Answer3);
        setQuestion5(Course.attributes.test?.question5);
        setQuestion5Answer(Course.attributes.test?.question5Answer);
        setFakeQuestion5Answer1(Course.attributes.test?.fakeQuestion5Answer1);
        setFakeQuestion5Answer2(Course.attributes.test?.fakeQuestion5Answer2);
        setFakeQuestion5Answer3(Course.attributes.test?.fakeQuestion5Answer3);
        setQuestion6(Course.attributes.test?.question6);
        setQuestion6Answer(Course.attributes.test?.question6Answer);
        setFakeQuestion6Answer1(Course.attributes.test?.fakeQuestion6Answer1);
        setFakeQuestion6Answer2(Course.attributes.test?.fakeQuestion6Answer2);
        setFakeQuestion6Answer3(Course.attributes.test?.fakeQuestion6Answer3);
        setQuestion7(Course.attributes.test?.question7);
        setQuestion7Answer(Course.attributes.test?.question7Answer);
        setFakeQuestion7Answer1(Course.attributes.test?.fakeQuestion7Answer1);
        setFakeQuestion7Answer2(Course.attributes.test?.fakeQuestion7Answer2);
        setFakeQuestion7Answer3(Course.attributes.test?.fakeQuestion7Answer3);
        setQuestion8(Course.attributes.test?.question8);
        setQuestion8Answer(Course.attributes.test?.question8Answer);
        setFakeQuestion8Answer1(Course.attributes.test?.fakeQuestion8Answer1);
        setFakeQuestion8Answer2(Course.attributes.test?.fakeQuestion8Answer2);
        setFakeQuestion8Answer3(Course.attributes.test?.fakeQuestion8Answer3);
        setQuestion9(Course.attributes.test?.question9);
        setQuestion9Answer(Course.attributes.test?.question9Answer);
        setFakeQuestion9Answer1(Course.attributes.test?.fakeQuestion9Answer1);
        setFakeQuestion9Answer2(Course.attributes.test?.fakeQuestion9Answer2);
        setFakeQuestion9Answer3(Course.attributes.test?.fakeQuestion9Answer3);
        setQuestion10(Course.attributes.test?.question10);
        setQuestion10Answer(Course.attributes.test?.question10Answer);
        setFakeQuestion10Answer1(Course.attributes.test?.fakeQuestion10Answer1);
        setFakeQuestion10Answer2(Course.attributes.test?.fakeQuestion10Answer2);
        setFakeQuestion10Answer3(Course.attributes.test?.fakeQuestion10Answer3);
        setPassingGrade(Course.attributes.test?.passingGrade);
        }
    };
            
    const getCoursePrereq = async () => {
        if (coursePrerequisite) {
            const Courses = Moralis.Object.extend("Courses");
            const query = new Moralis.Query(Courses);
            const account = user.attributes.accounts[0];
            query.equalTo("educatorAddress", account);
            query.equalTo("objectId", coursePrerequisite);
            const results = await query.find();
            // console.log(results);
            setCoursePrerequisiteName(results[0].attributes.courseName);
        }
    };

    const getCoursePrereqs = async () => {
        if (!user) {
          window.alert("Please connect wallet");
        } else {
          const Courses = Moralis.Object.extend("Courses");
          const query = new Moralis.Query(Courses);
          const account = user.attributes.accounts[0];
          query.equalTo("educatorAddress", account);
          query.descending("createdAt");
          const coursePrerequisites = await query.find();
          setCoursePrerequisites(coursePrerequisites);
        }
    };

    useEffect(() => {
        getCourseInfo();
    }, [user]);

    useEffect (() => {
        getCoursePrereq();
        getCoursePrereqs();
    }, [coursePrerequisite]);

    const saveCourseInfoEdits = async () => {
        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const account = user.attributes.accounts[0];
        query.equalTo("educatorAddress", account);
        query.descending("createdAt");
        const Course = await query.first();

        if (courseName) {
            Course.set("courseName", courseName);
        }
    
        if (courseDescription) {
            Course.set("description", courseDescription);
        }
    
        if (courseCost) {
            Course.set("cost", courseCost);
        }
    
        if (coursePrerequisite) {
            Course.set("prerequisite", coursePrerequisite);
        }
    
        await Course.save();
        setIsSavingInProgress(false);
        refreshPage();
    };

    const saveImageEdits = async () => {
        let img;
        let imgObject;
        if (uploadedImageFile) {
            const image = uploadedImageFile;
            const imageFile = new Moralis.File(image.name, image);
            await imageFile.saveIPFS();
            img = imageFile.ipfs();
            imgObject = { img };
            // console.log(imgObject);
        } else {
            setIsSavingInProgress(false);
            console.log("No image file uploaded");
            refreshPage();
        }

        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const account = user.attributes.accounts[0];
        query.equalTo("educatorAddress", account);
        query.descending("createdAt");
        const Course = await query.first();

        Course.set("imageFile", imgObject);

        await Course.save();
        setIsSavingInProgress(false);
        refreshPage();
    };

    const saveSectionEdits = async () => {
        let vid;

        if (uploadedVideoFile) {
            const video = uploadedVideoFile;
            const videoFile = new Moralis.File(video.name, video);
            await videoFile.saveIPFS();
            vid = videoFile.ipfs();
        } else {
            setIsSavingInProgress(false);
            console.log("No video file uploaded");
            refreshPage();
        }

        const Courses = Moralis.Object.extend("Courses");
        const query = new Moralis.Query(Courses);
        const account = user.attributes.accounts[0];
        query.equalTo("educatorAddress", account);
        query.descending("createdAt");
        const Course = await query.first();

        Course.set(`courseSection${selectedSection}`, {
            sectionName,
            sectionDescription,
            vid,
        });

        await Course.save();
        setIsSavingInProgress(false);
        refreshPage();
    };

    const saveTestEdits = async () => {
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
        setIsSavingInProgress(false);
        console.log("Test saved");
    };

    const handleImageUpload = (e) => {
        const image = e.target.files[0];
        if (image != null) {
          setUploadedImageFile(image);
          return toast({
            title: "Image uploaded",
            description: "Your image has been uploaded",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          return toast({
            title: "No image uploaded",
            description: "Please upload an image",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
    };

    const handleVideoUpload = (e) => {
        const video = e.target.files[0];
        if (video != null) {
          setUploadedVideoFile(video);
          return toast({
            title: "Video uploaded",
            description: "Your video has been uploaded",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          return toast({
            title: "No video uploaded",
            description: "Please upload a video",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
    };
    
    const alertSaveSuccess = () => {
        return toast({
            title: "Test saved",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const routeCourseStaking = () => {
        history.push("/courseStaking");
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
            <div className={stylesFirstBlock.reviewPageDiv}>
                <div className={stylesFirstBlock.frameDiv}>
                <div className={stylesFirstBlock.frameDiv1}>
                    <div className={stylesFirstBlock.titleDiv}>
                    Review your course before you submit
                    </div>
                </div>
                </div>
                <div className={stylesFirstBlock.frameDiv2}>
                <div className={stylesFirstBlock.frameDiv3}>
                    <div className={stylesFirstBlock.frameDiv4}>
                    <div className={stylesFirstBlock.courseTitleDiv}>Course Name</div>
                    <Input
                        className={stylesFirstBlock.inputOutline}
                        variant="outline"
                        textColor="#e4e4e4"
                        isDisabled={true}
                        placeholder={courseName}
                    />
                    </div>
                    <div className={stylesFirstBlock.frameDiv4}>
                    <div className={stylesFirstBlock.courseTitleDiv}>Course Description</div>
                    <Input
                        className={stylesFirstBlock.inputOutline}
                        variant="outline"
                        textColor="#000000"
                        isDisabled={true}
                        placeholder={courseDescription}
                    />
                    </div>
                    <div className={stylesFirstBlock.frameDiv4}>
                    <div className={stylesFirstBlock.howMuchWillYourCourseCost}>
                        How much will your course cost? (Specify in Matic)
                    </div>
                    <Input
                        className={stylesFirstBlock.inputOutline}
                        variant="outline"
                        textColor="#e4e4e4"
                        isDisabled={true}
                        placeholder={courseCost}
                    />
                    </div>
                    <div className={stylesFirstBlock.frameDiv4}>
                    <div className={stylesFirstBlock.howMuchWillYourCourseCost}>
                        Course Prerequisites
                    </div>
                    <Input
                        className={stylesFirstBlock.inputOutline}
                        variant="outline"
                        textColor="#e4e4e4"
                        isDisabled={true}
                        placeholder={coursePrerequisiteName}
                    />
                    </div>
                </div>
                <Button variant="solid" w="357px" colorScheme="green" onClick={onCourseInfoEditOpen}>
                    Edit Course Info
                </Button>
                </div>
                <div className={stylesFirstBlock.frameDiv8}>
                <div className={stylesFirstBlock.frameDiv9}>
                    <div className={stylesFirstBlock.frameDiv10}>
                    <div className={stylesFirstBlock.titleDiv1}>Course image</div>
                    </div>
                    <Image
                    borderRadius='full'
                    boxSize='150px'
                    src={courseImage}
                    alt='course image'
                    />
                </div>
                <Button variant="solid" w="357px" colorScheme="green" onClick={onImageEditOpen}>
                    Edit Image
                </Button>
                </div>
                <div className={stylesFirstBlock.frameDiv11}>
                    <TableContainer>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Description</Th>
                                    <Th>Video</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                            <Tr>
                                <Td>{section1Title}</Td>
                                <Td>{section1Description}</Td>
                                <Td>
                                    <Link href={section1Video} isExternal>
                                        Video Link <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Td>  
                            </Tr>
                            <Tr>
                                <Td>{section2Title}</Td>
                                <Td>{section2Description}</Td>
                                <Td>
                                    <Link href={section2Video} isExternal>
                                        Video Link <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Td>  
                            </Tr>
                            <Tr>
                                <Td>{section3Title}</Td>
                                <Td>{section3Description}</Td>
                                <Td>
                                    <Link href={section3Video} isExternal>
                                        Video Link <ExternalLinkIcon mx="2px" />
                                    </Link>
                                </Td>   
                            </Tr>
                            </Tbody>
                            <Tfoot>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                <Button variant="solid" w="366px" colorScheme="green" onClick={onCourseSectionsEditOpen}>
                    Edit Course Sections
                </Button>
                <Button variant="solid" w="374px" colorScheme="green" onClick={onTestEditOpen}>
                    Edit Test
                </Button>
                <Button variant="solid" w="378px" colorScheme="green" onClick={routeCourseStaking}>
                    Continue to Last Step!
                </Button>
                </div>
            </div>
            {/* Course Info Modal */} 
            <Modal isOpen={isCourseInfoEditOpen} onClose={onCourseInfoEditClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Course Info</ModalHeader>
                <ModalCloseButton
                    onClick={() => {
                    refreshPage();
                    }}
                />
                <ModalBody>
                    <Text>Course Name</Text>
                    <Input
                    label='Course Name'
                    variant='outline'
                    textColor='#000000'
                    placeholder={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Course Description</Text>
                    <Input
                    label='Course Description'
                    variant='outline'
                    textColor='#000000'
                    placeholder={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Course Cost</Text>
                    <Input
                    label='Course Cost'
                    variant='outline'
                    textColor='#000000'
                    placeholder={courseCost}
                    precision={4}
                    step={0.01}
                    onChange={(e) => setCourseCost(e.target.value)}
                    >
                    </Input>
                    &nbsp;
                    <br />
                    <Text>Course Prerequisites</Text>
                    <Select
                        placeholder="Select prerequisite"
                        key={coursePrerequisites.id}
                        onChange={(e) => setCoursePrerequisite(e.target.value)}
                    >
                    {coursePrerequisites.map((prerequisite) => (
                        <option key={prerequisite.id} value={prerequisite.id}>
                        {prerequisite.get("courseName")}
                        </option>
                    ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        colorScheme='green'
                        isLoading={isSavingInProgress}
                        mr={3} 
                        onClick={async () => {
                            setIsSavingInProgress(true);
                            await saveCourseInfoEdits();
                            onCourseInfoEditClose();
                            }}>
                    Save and Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Image Edit Modal */}
            <Modal 
                isOpen={isImageEditOpen} 
                onClose={onImageEditClose}
                size={"xl"}
                >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Course Image</ModalHeader>
                <ModalBody>
                    <Box
                    position='relative'
                    top='0'
                    left='0'
                    height='100%'
                    width='100%'
                    display='flex'
                    flexDirection='column'
                    >
                    <Stack p='8' textAlign='center' spacing='1'>
                        <Heading fontSize='xl' fontWeight='bold'>
                        Drop image here (only 1)
                        </Heading>
                        <Text fontSize='lg' fontWeight='light'>
                        or click to upload
                        </Text>
                    </Stack>
                    </Box>
                    <Input
                    name='image'
                    type='file'
                    multiple={false}
                    height='100%'
                    width='100%'
                    position='absolute'
                    top='0'
                    left='0'
                    opacity='0'
                    aria-hidden='true'
                    accept='image/*'
                    ref={inputImageFile}
                    onChange={handleImageUpload}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme='green'
                        mr={3}
                        isLoading={isSavingInProgress}
                        onClick={async () => {
                            setIsSavingInProgress(true);
                            await saveImageEdits();
                            onImageEditClose();
                        }}
                    >
                    Save and Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Course Sections Modal */}
            <Modal 
                isOpen={isCourseSectionsEditOpen} 
                onClose={onCourseSectionsEditClose}
                size={"xl"}
                scrollBehavior={"inside"}
                >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Course Sections</ModalHeader>
                <ModalCloseButton
                    onClick={() => {
                        refreshPage();
                    }}
                />
                <ModalBody>
                    <Input
                    label='Section Name'
                    name='Name'
                    variant='outline'
                    textColor='#000000'
                    placeholder='Section Name'
                    onChange={(e) => setSectionName(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Input
                    label='Section Description'
                    name='Description'
                    variant='outline'
                    textColor='#000000'
                    placeholder='Description'
                    onChange={(e) => setSectionDescription(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Select
                    placeholder='Select section number'
                    onChange={(e) => setSelectedSection(e.target.value)}
                    >
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    </Select>
                    &nbsp;
                    <br />
                    <br />
                    <Button variant='solid' colorScheme='green'>
                    <Input
                        name='video'
                        type='file'
                        multiple={false}
                        height='100%'
                        width='100%'
                        position='absolute'
                        top='0'
                        left='0'
                        opacity='0'
                        aria-hidden='true'
                        accept='video/*'
                        ref={inputVideoFile}
                        onChange={handleVideoUpload}
                    />
                    Upload Section Video (10mb or less)
                    </Button>
                </ModalBody>
            <ModalFooter>
                <Button
                    colorScheme='green'
                    mr={3}
                    isLoading={isSavingInProgress}
                    onClick={async () => {
                        setIsSavingInProgress(true);
                        await saveSectionEdits();
                        onCourseSectionsEditClose();
                    }}
                    >
                    Save and Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Test Edit Modal */}
            <Modal
                isOpen={isTestEditOpen}
                onClose={onTestEditClose}
                size={"xl"}
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Review Test</ModalHeader>
                <ModalCloseButton
                    onClick={() => {
                        refreshPage();
                    }}
                />
                <ModalBody>
                    <Text>Question 1</Text>
                    <Input
                    label='Question 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question1}
                    onChange={(e) => setQuestion1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 1 Answer</Text>
                    <Input
                    label='Question 1 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question1Answer}
                    onChange={(e) => setQuestion1Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 1 Fake Answer 1</Text>
                    <Input
                    label='Question 1 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion1Answer1}
                    onChange={(e) => setFakeQuestion1Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 1 Fake Answer 2</Text>
                    <Input
                    label='Question 1 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion1Answer2}
                    onChange={(e) => setFakeQuestion1Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 1 Fake Answer 3</Text>
                    <Input
                    label='Question 1 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion1Answer3}
                    onChange={(e) => setFakeQuestion1Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 2</Text>
                    <Input
                    label='Question 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question2}
                    onChange={(e) => setQuestion2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 2 Answer</Text>
                    <Input
                    label='Question 2 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question2Answer}
                    onChange={(e) => setQuestion2Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 2 Fake Answer 1</Text>
                    <Input
                    label='Question 2 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion2Answer1}
                    onChange={(e) => setFakeQuestion2Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 2 Fake Answer 2</Text>
                    <Input
                    label='Question 2 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion2Answer2}
                    onChange={(e) => setFakeQuestion2Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 2 Fake Answer 3</Text>
                    <Input
                    label='Question 2 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion2Answer3}
                    onChange={(e) => setFakeQuestion2Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 3</Text>
                    <Input
                    label='Question 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question3}
                    onChange={(e) => setQuestion3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 3 Answer</Text>
                    <Input
                    label='Question 3 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question3Answer}
                    onChange={(e) => setQuestion3Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 3 Fake Answer 1</Text>
                    <Input
                    label='Question 3 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion3Answer1}
                    onChange={(e) => setFakeQuestion3Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 3 Fake Answer 2</Text>
                    <Input
                    label='Question 3 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion3Answer2}
                    onChange={(e) => setFakeQuestion3Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 3 Fake Answer 3</Text>
                    <Input
                    label='Question 3 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion3Answer3}
                    onChange={(e) => setFakeQuestion3Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 4</Text>
                    <Input
                    label='Question 4'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question4}
                    onChange={(e) => setQuestion4(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 4 Answer</Text>
                    <Input
                    label='Question 4 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question4Answer}
                    onChange={(e) => setQuestion4Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 4 Fake Answer 1</Text>
                    <Input
                    label='Question 4 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion4Answer1}
                    onChange={(e) => setFakeQuestion4Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 4 Fake Answer 2</Text>
                    <Input
                    label='Question 4 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion4Answer2}
                    onChange={(e) => setFakeQuestion4Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 4 Fake Answer 3</Text>
                    <Input
                    label='Question 4 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion4Answer3}
                    onChange={(e) => setFakeQuestion4Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 5</Text>
                    <Input
                    label='Question 5'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question5}
                    onChange={(e) => setQuestion5(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 5 Answer</Text>
                    <Input
                    label='Question 5 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question5Answer}
                    onChange={(e) => setQuestion5Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 5 Fake Answer 1</Text>
                    <Input
                    label='Question 5 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion5Answer1}
                    onChange={(e) => setFakeQuestion5Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 5 Fake Answer 2</Text>
                    <Input
                    label='Question 5 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion5Answer2}
                    onChange={(e) => setFakeQuestion5Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 5 Fake Answer 3</Text>
                    <Input
                    label='Question 5 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion5Answer3}
                    onChange={(e) => setFakeQuestion5Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 6</Text>
                    <Input
                    label='Question 6'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question6}
                    onChange={(e) => setQuestion6(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 6 Answer</Text>
                    <Input
                    label='Question 6 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question6Answer}
                    onChange={(e) => setQuestion6Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 6 Fake Answer 1</Text>
                    <Input
                    label='Question 6 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion6Answer1}
                    onChange={(e) => setFakeQuestion6Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 6 Fake Answer 2</Text>
                    <Input
                    label='Question 6 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion6Answer2}
                    onChange={(e) => setFakeQuestion6Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 6 Fake Answer 3</Text>
                    <Input
                    label='Question 6 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion6Answer3}
                    onChange={(e) => setFakeQuestion6Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 7</Text>
                    <Input
                    label='Question 7'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question7}
                    onChange={(e) => setQuestion7(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 7 Answer</Text>
                    <Input
                    label='Question 7 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question7Answer}
                    onChange={(e) => setQuestion7Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 7 Fake Answer 1</Text>
                    <Input
                    label='Question 7 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion7Answer1}
                    onChange={(e) => setFakeQuestion7Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 7 Fake Answer 2</Text>
                    <Input
                    label='Question 7 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion7Answer2}
                    onChange={(e) => setFakeQuestion7Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 7 Fake Answer 3</Text>
                    <Input
                    label='Question 7 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion7Answer3}
                    onChange={(e) => setFakeQuestion7Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 8</Text>
                    <Input
                    label='Question 8'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question8}
                    onChange={(e) => setQuestion8(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 8 Answer</Text>
                    <Input
                    label='Question 8 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question8Answer}
                    onChange={(e) => setQuestion8Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 8 Fake Answer 1</Text>
                    <Input
                    label='Question 8 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion8Answer1}
                    onChange={(e) => setFakeQuestion8Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 8 Fake Answer 2</Text>
                    <Input
                    label='Question 8 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion8Answer2}
                    onChange={(e) => setFakeQuestion8Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 8 Fake Answer 3</Text>
                    <Input
                    label='Question 8 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion8Answer3}
                    onChange={(e) => setFakeQuestion8Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 9</Text>
                    <Input
                    label='Question 9'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question9}
                    onChange={(e) => setQuestion9(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 9 Answer</Text>
                    <Input
                    label='Question 9 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question9Answer}
                    onChange={(e) => setQuestion9Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 9 Fake Answer 1</Text>
                    <Input
                    label='Question 9 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion9Answer1}
                    onChange={(e) => setFakeQuestion9Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 9 Fake Answer 2</Text>
                    <Input
                    label='Question 9 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion9Answer2}
                    onChange={(e) => setFakeQuestion9Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 9 Fake Answer 3</Text>
                    <Input
                    label='Question 9 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion9Answer3}
                    onChange={(e) => setFakeQuestion9Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 10</Text>
                    <Input
                    label='Question 10'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question10}
                    onChange={(e) => setQuestion10(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 10 Answer</Text>
                    <Input
                    label='Question 10 Answer'
                    variant='outline'
                    textColor='#000000'
                    placeholder={question10Answer}
                    onChange={(e) => setQuestion10Answer(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 10 Fake Answer 1</Text>
                    <Input
                    label='Question 10 Fake Answer 1'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion10Answer1}
                    onChange={(e) => setFakeQuestion10Answer1(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 10 Fake Answer 2</Text>
                    <Input
                    label='Question 10 Fake Answer 2'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion10Answer2}
                    onChange={(e) => setFakeQuestion10Answer2(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Question 10 Fake Answer 3</Text>
                    <Input
                    label='Question 10 Fake Answer 3'
                    variant='outline'
                    textColor='#000000'
                    placeholder={fakeQuestion10Answer3}
                    onChange={(e) => setFakeQuestion10Answer3(e.target.value)}
                    />
                    &nbsp;
                    <br />
                    <Text>Passing Grade</Text>
                    <Input
                    label='Passing Grade'
                    variant='outline'
                    textColor='#000000'
                    placeholder={passingGrade}
                    onChange={(e) => setPassingGrade(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button
                        colorScheme='green'
                        onLoading={isSavingInProgress}
                        onClick={async () => {
                            setIsSavingInProgress(true);
                            await saveTestEdits();
                            onTestEditClose();
                            alertSaveSuccess();
                        }}
                    >
                    Save and Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
            {/* Footer */}
            <div className={stylesFooter.frameDiv}>
                <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
            </div>
        </>
    );
};

export default CourseReview;
