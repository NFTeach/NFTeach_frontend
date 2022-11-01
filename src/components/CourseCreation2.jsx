import React, { useRef, useState } from 'react';
import {
  Button,
  Box,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Logo from "../images/Logo.png";
import moralis from "moralis";
import { useMoralis } from "react-moralis";
import stylesHeader from "../styles/CourseCreation_Pages/2/Header.module.css";
import stylesFirstBlock from "../styles/CourseCreation_Pages/2/FirstBlock.module.css";
import stylesFooter from "../styles/CourseCreation_Pages/2/Footer.module.css";

moralis.initialize(process.env.REACT_APP_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.REACT_APP_MORALIS_SERVER_URL;

const CourseCreation2 = () => {
  const history = useHistory();
  const { Moralis } = useMoralis();
  const user = moralis.User.current();
  const toast = useToast();
  const inputImageFile = useRef(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  const saveImage = async () => {
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
      setIsUploadInProgress(false);
      console.log("No image file uploaded");
      return;
    }

    const Courses = Moralis.Object.extend("Courses");
    const query = new Moralis.Query(Courses);
    const account = user.attributes.accounts[0];
    query.equalTo("educatorAddress", account);
    query.descending("createdAt");
    const Course = await query.first();

    Course.set("imageFile", imgObject);

    await Course.save();
    setIsUploadInProgress(false);
    // console.log("Image saved!");
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

  const routeCourseCreation3 = () => {
    history.push("/courseCreation3");
  };

  return (
    <>
       {/* Header */}
      <div className={stylesHeader.frameDiv}>
        <img className={stylesHeader.nFTeach1Icon} alt="" src={Logo} />
      </div>
      {/* First Block */}
      <div className={stylesFirstBlock.courseCreationPage2}>
        <div className={stylesFirstBlock.frameDiv}>
          <div className={stylesFirstBlock.frameDiv1}>
            <div className={stylesFirstBlock.titleDiv}>
              Create your course (2/4)
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv2}>
            <div className={stylesFirstBlock.titleDiv1}>
              Please choose high quality images and videos for your course. We
              personally veto every course, and low-quality/effort courses will
              be scrapped and stake fees slashed. Ask yourself the question,
              “Would I pay for this course?”
            </div>
          </div>
        </div>
        <div className={stylesFirstBlock.frameDiv3}>
          <div className={stylesFirstBlock.frameDiv4}>
            <div className={stylesFirstBlock.frameDiv5}>
              <div className={stylesFirstBlock.titleDiv2}>
                Upload a course image (500px/500px)
              </div>
              <div className={stylesFirstBlock.titleDiv3}>
                This image will be shown around NFTeach and suggested to other
                students. Make sure it’s appropriate to the course!
              </div>
            </div>
            <div className={stylesFirstBlock.uploadFormDiv}>
              <Box position='relative' height='100%' width='100%'>
                <Box
                  position='absolute'
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
              </Box>
            </div>
          </div>
          <div className={stylesFirstBlock.frameDiv6}>
            <div className={stylesFirstBlock.frameDiv7}>
              <div className={stylesFirstBlock.frameDiv7}>
                <Button
                  variant='solid'
                  w='357px'
                  isLoading={isUploadInProgress}
                  colorScheme='green'
                  onClick={async () => {
                    setIsUploadInProgress(true);
                    await saveImage();
                    routeCourseCreation3();
                  }}
                >
                  Continue
                </Button>
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

export default CourseCreation2
