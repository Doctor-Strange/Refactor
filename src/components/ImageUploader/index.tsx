import React, { useCallback, useState, useEffect, useRef } from "react";
// import "./ImageUploader.scss";
import jsCookie from "js-cookie";
import carVector from "../../../public/image/car_vector.png";
/**
 *
 * react-dropzone
 *
 * Npm
 *  https://www.npmjs.com/package/react-dropzone
 *
 * Git
 *  https://github.com/react-dropzone/react-dropzone
 */
import { useDropzone } from "react-dropzone";
import { REQUEST_REMOVE_CAR_MEDIA, REQUEST_NEW_CAR_MEDIA } from "../../API";
import { IoIosClose } from "react-icons/io";
import Spinner from "../Spinner";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../../utils/cropImage";
import Filter_license from "../../../utils/filter_license";
import ZoomSlider from "./ZoomSlider";

const ImageUploader = ({
  Upload_image,
  delete_image,
  default_image,
  error_status,
  container_width,
  language,
}: IImageUpload) => {
  const [picturesPreview, setPicturesPreview] = useState([]);
  const [loading, setloading] = useState(false);

  const [currentImage, setCurrentImage] = useState(null);
  const [croptStart, setCroptStart] = useState(false);
  const [image_for_draw, set_image_for_draw] = useState(null);
  const [covert_license, set_covert_license] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const [filter, setfilter] = useState(false);

  const wrapperRef = useRef(null);
  const token = jsCookie.get("token");

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      console.log("file", file);
      const reader: any = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // showCroppedImage(file, reader.result)
        setCroptStart(true);
        setCurrentImage(URL.createObjectURL(file));
        // sendTheImage(file, reader.result);
      };
    });
  }, []);

  useEffect(() => {
    // give the default images
    if (default_image) {
      setPicturesPreview(default_image);
    }
  }, [default_image]);

  const RemoveAnImage = (i) => {
    REQUEST_REMOVE_CAR_MEDIA({
      token: token,
      id: i,
    });
    setPicturesPreview((picturesPreview) =>
      picturesPreview.filter((item, index) => {
        return item.id !== i;
      })
    );
    delete_image(i);
  };

  const sendTheImage = async (file, result) => {
    setloading(true);
    // get the image by id from API
    const image_upload_res: any = await REQUEST_NEW_CAR_MEDIA({
      token: token,
      file: file,
    });
    setloading(false);
    // add the given image to preview list
    setPicturesPreview((picturesPreview) =>
      picturesPreview.concat({
        img: result,
        id: image_upload_res.id,
      })
    );
    // sent the image id to parent component
    Upload_image(image_upload_res.id);
  };

  const { getRootProps, getInputProps } = useDropzone({
    // acceptable formats for upload
    accept: ".jpeg, .jpg, .png",

    // active Drop and use custom function
    onDrop,
  });

  // useEffect(() => {
  //   if (error_status) {
  //     scrollTo(0, wrapperRef.current.offsetTop);
  //   }
  // }, [error_status]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    console.log(croppedAreaPixels);

    console.log(window.innerWidth);
    try {
      const image = await getCroppedImg(currentImage, croppedAreaPixels, true);
      set_covert_license(URL.createObjectURL(image));
      set_image_for_draw(image);
      // sendTheImage(image, URL.createObjectURL(image));
      setCroptStart(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <div ref={wrapperRef}>
      <label>{language.car_picture}</label>
      <p className='image_upload_under_label'>
        {language.text_1}
        {language.text_2}
      </p>
      {croptStart && (
        <div className='crop_container'>
          <Cropper
            image={currentImage}
            crop={crop}
            zoom={zoom}
            aspect={16 / 9}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropShape='rect'
          />
          <ZoomSlider zoomChange={setZoom} zoom={zoom} />
          <div className='Crop_BTN_container'>
            <span className='Blue_BTN local_class' onClick={showCroppedImage}>
              تایید
            </span>
            <span
              className='Blue_BTN cancel_class'
              onClick={() => {
                setCurrentImage(null);
                setCroptStart(false);
                // if (data.thumbnail_url) {
                //   dispatch({ type: "image", image: data.thumbnail_url });
                // }
                // file_input.current.value = null;
              }}
            >
              لغو
            </span>
          </div>
        </div>
      )}
      {/* {covert_license ? ( */}
      {filter && (
        <Filter_license
          // imageSrc={image_for_draw}
          imageSrc={covert_license}
          pixelCrop={croppedAreaPixels}
          container_width={container_width}
        />
      )}
      <span onClick={() => setfilter(true)}>show</span>
      {/* ) : null} */}
      <div className='drop_zone' {...getRootProps()}>
        <input {...getInputProps()} multiple={false} />
        <p className='uploadText'>{language.text_3}</p>
        {picturesPreview.length > 0 ? (
          <div
            // if the image is uploading the drop-zone will be unreachable
            className={["Image_box", loading ? "loading_class" : null].join(
              " "
            )}
            onClick={(e) => e.preventDefault()}
          >
            {picturesPreview.map((i, index) => {
              return (
                <div
                  className='Each_image'
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    RemoveAnImage(i.id);
                  }}
                >
                  {/* onClick on trash icon the image will deleted for the car and sent the id to parent */}
                  <IoIosClose size='2rem' color='#ea2d2d' />
                  <img src={i.img} alt={i.id} />
                </div>
              );
            })}
            {loading ? (
              <Spinner display='inline-block' width={20} color='#b5b5b5' />
            ) : null}
          </div>
        ) : loading ? (
          <Spinner display='block' width={20} color='#b5b5b5' />
        ) : (
          <img
            className='vector_car_upload'
            src={carVector}
            alt='car vector image'
          />
        )}
        <p className='gallery_button'>{language.choose_from_gallery}</p>
      </div>
    </div>
  );
};

interface IImageUpload {
  // Send the id after upload to the parent component
  Upload_image: any;

  // Send the id of the deleted image to parent component
  delete_image: any;

  // receive an array of image ids
  default_image?: any;
  error_status?: boolean;
  language: any;
  container_width: any;
}

export default ImageUploader;
