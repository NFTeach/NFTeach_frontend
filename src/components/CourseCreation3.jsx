import React, { useEffect, useState, useRef }  from 'react'
import { useHistory } from "react-router-dom";
import {
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Link,
  Select,
  useToast,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import Logo from "../images/Logo.png";
import stylesHeader from "../styles/CourseCreation_Pages/3/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/3/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/3/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const CourseCreation3 = () => {
  const history = useHistory();
  const toast = useToast();
  const inputVideoFile = useRef(null);
  const [sectionName, setSectionName] = useState();
  const [sectionDescription, setSectionDescription] = useState();
  const [uploadedVideoFile, setUploadedVideoFile] = useState(null);
  const [section1Name, setSection1Name] = useState();
  const [section1Description, setSection1Description] = useState();
  const [section1Video, setSection1Video] = useState();
  const [section2Name, setSection2Name] = useState();
  const [section2Description, setSection2Description] = useState();
  const [section2Video, setSection2Video] = useState();
  const [section3Name, setSection3Name] = useState();
  const [section3Description, setSection3Description] = useState();
  const [section3Video, setSection3Video] = useState();
  const { Moralis } = useMoralis();
  const [selectedSection, setSelectedSection] = useState("");
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [isSectionCreationCompleted, setIsSectionCreationCompleted] = useState(false);
  const {
    isOpen: isSectionOpen,
    onOpen: onSectionOpen,
    onClose: onSectionClose,
  } = useDisclosure();
  const user = moralis.User.current();

  const saveSection = async () => {
    let vid;

    if (uploadedVideoFile) {
      const video = uploadedVideoFile;
      const videoFile = new Moralis.File(video.name, video);
      await videoFile.saveIPFS();
      vid = videoFile.ipfs();
    } else {
      setIsUploadInProgress(false);
      console.log("No video file uploaded");
      return;
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
    setIsUploadInProgress(false);
    refreshPage();
  };

  const handleSectionCreation = async () => {
    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    const account = user.attributes.accounts[0];
    query.equalTo("educatorAddress", account);
    query.descending("createdAt");
    const Course = await query.first();
    const section1 = Course.get("courseSection1");
    const section2 = Course.get("courseSection2");
    const section3 = Course.get("courseSection3");
    setSection1Name(section1?.sectionName);
    setSection1Description(section1?.sectionDescription);
    setSection1Video(section1?.vid);
    setSection2Name(section2?.sectionName);
    setSection2Description(section2?.sectionDescription);
    setSection2Video(section2?.vid);
    setSection3Name(section3?.sectionName);
    setSection3Description(section3?.sectionDescription);
    setSection3Video(section3?.vid);
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

  useEffect(() => {
    handleSectionCreation();
  }, []);

  const routeCourseCreation4 = () => {
    history.push("/courseCreation4");
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
      <div className={stylesFirstBlock.courseCreationPage3}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.frameDiv2}>
              <div className={stylesFirstBlock.frameDiv3}>
                <div className={stylesFirstBlock.titleDiv}>
                  Create your course (3/4)
                </div>
              </div>
              <div className={stylesFirstBlock.frameDiv4}>
                <div className={stylesFirstBlock.titleDiv1}>
                  Add up to 3 sections. Each section should have a video element
                  with a title of what will be learned and a description with
                  notes and next steps (we don’t suggest homework but...)
                </div>
              </div>
            </div>
            <TableContainer display='block' overflowY='auto'>
              <Table  size='sm'>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Description</Th>
                    <Th>Video</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{section1Name}</Td>
                    <Td>{section1Description}</Td>
                    <Td>
                      <Link href={section1Video} isExternal>
                        Video Link <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Td>  
                  </Tr>
                  <Tr>
                    <Td>{section2Name}</Td>
                    <Td>{section2Description}</Td>
                    <Td>
                      <Link href={section2Video} isExternal>
                        Video Link <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Td> 
                  </Tr>
                  <Tr>
                    <Td>{section3Name}</Td>
                    <Td>{section3Description}</Td>
                    <Td>
                      <Link href={section3Video} isExternal>
                        Video Link <ExternalLinkIcon mx="2px" />
                      </Link>
                    </Td> 
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <br />
          <div className={stylesFirstBlock.frameDiv5}>
            <Button
              variant='solid'
              w='606px'
              colorScheme='green'
              onClick={onSectionOpen}
            >
              Add Section
            </Button>     
            <Button
              variant='solid'
              w='357px'
              colorScheme='green'
              isLoading={isSectionCreationCompleted}
              onClick={() => {
                setIsSectionCreationCompleted(true);
                routeCourseCreation4();
              }}
            >
              Continue
            </Button>
          </div>
          
        </div>
      </div>
      {/* Section Modal */}
      <Modal
        isOpen={isSectionOpen}
        onClose={onSectionClose}
        size={"xl"}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Section</ModalHeader>
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
                accept='.mp4'
                ref={inputVideoFile}
                onChange={handleVideoUpload}
              />
              Upload Section Video (10mb or less)
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              variant='ghost'
              isLoading={isUploadInProgress}
              onClick={async () => {
                setIsUploadInProgress(true);
                await saveSection();
                onSectionClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Footer */}
      <div className={stylesFooter.frameDiv}>
        <h4 className={stylesFooter.nFTeachH4}>© 2022 NFTeach</h4>
      </div>
    </>
  )
}

export default CourseCreation3
