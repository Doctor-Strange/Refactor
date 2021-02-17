import React, { useState, useEffect, useRef } from "react";
import ZoomSlider from "../src/components/ImageUploader/ZoomSlider";

let canvas2 = null;
let ctx2 = null;
let g_image = null;
let g_canvas = null;
//  it's a copy of main ctx
let g_ctx = null;

let R_g_ctx = null;
let rect = {};
let R_rect = {};
let drag = false;
let rectStartXArray = [];
let rectStartYArray = [];
let rectWArray = [];
let rectHArray = [];

let R_rectStartXArray = [];
let R_rectStartYArray = [];
let R_rectWArray = [];
let R_rectHArray = [];

let naturalHeight = 0;
let naturalWidth = 0;
let ratio = 0;

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", (e) => {
      naturalHeight = e.path[0].naturalHeight;
      naturalWidth = e.path[0].naturalWidth;
      resolve(image);
    });
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

const reset_values = () => {
  rect = {};
  R_rect = {};
  drag = false;
  rectStartXArray = [];
  rectStartYArray = [];
  rectWArray = [];
  rectHArray = [];
  R_rectStartXArray = [];
  R_rectStartYArray = [];
  R_rectWArray = [];
  R_rectHArray = [];
};

const Filter_license = ({ imageSrc, pixelCrop, container_width }) => {
  const [show_canv2, set_show_canv2] = useState(false);
  const [rotation, set_rotation] = useState(0);

  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    setImage();
  }, []);

  const setImage = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    g_canvas = canvas;
    g_ctx = ctx;

    // Real Image
    canvas2 = canvasRef2.current;
    ctx2 = canvas2.getContext("2d");
    R_g_ctx = ctx2;

    const image = await createImage(imageSrc);
    g_image = image;
    let main_container_inner_width = container_width.current.offsetWidth - 100;
    ratio = naturalWidth / main_container_inner_width;
    // console.log(main_container_inner_width, naturalWidth, ratio);

    // scale down
    canvas.width = main_container_inner_width;
    canvas.height = canvas.width / (16 / 9);
    ctx.drawImage(
      image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      0,
      0,
      canvas.width,
      canvas.height
    );
    // ctx.drawImage(
    //   image,
    //   pixelCrop.x,
    //   pixelCrop.y,
    //   pixelCrop.width,
    //   pixelCrop.height,
    //   0,
    //   0,
    //   canvas.width,
    //   canvas.height
    // );
  };

  const whiteboard = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.clearRect(0, 0, naturalWidth, naturalHeight);
    canvas.style.backgroundImage = `url(${imageSrc})`;
    canvas.style.backgroundSize = "cover";

    // ctx.drawImage(
    //   image,
    //   pixelCrop.x,
    //   pixelCrop.y,
    //   pixelCrop.width,
    //   pixelCrop.height,
    //   0,
    //   0,
    //   canvas.width,
    //   canvas.height
    // );
  };

  function mouseDown(e) {
    e.persist();
    reset_real_image();
    setImage();
    rect.startX = e.pageX - canvasRef.current.offsetLeft;
    rect.startY = e.pageY - canvasRef.current.offsetTop;

    R_rect.startX = (e.pageX - canvasRef.current.offsetLeft) * ratio;
    R_rect.startY = (e.pageY - canvasRef.current.offsetTop) * ratio;
    drag = true;
  }

  const rotation_handler = async (e) => {
    let value = Number(e);
    console.log(e);
    // g_ctx.clearRect(rect.startX, rect.startY, rect.w, rect.h);
    //
    // console.log(rect.w, rect.h);
    // console.log(R_rect.w, R_rect.h);

    // g_ctx.beginPath();
    // g_ctx.fillStyle = "#FF0000";
    await whiteboard();
    g_ctx.translate(rect.startX + rect.w / 2, rect.startY + rect.h / 2);
    g_ctx.clearRect(rect.startX, rect.startY, rect.w, rect.h);
    R_g_ctx.translate(
      R_rect.startX + R_rect.w / 2,
      R_rect.startY + R_rect.h / 2
    );
    g_ctx.rotate((value * Math.PI) / 180);
    R_g_ctx.rotate((value * Math.PI) / 180);
    g_ctx.translate(-(rect.startX + rect.w / 2), -(rect.startY + rect.h / 2));
    R_g_ctx.translate(
      -(R_rect.startX + R_rect.w / 2),
      -(R_rect.startY + R_rect.h / 2)
    );
    g_ctx.fillStyle = "#FF0000";
    R_g_ctx.fillStyle = "#FF0000";
    g_ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
    R_g_ctx.fillRect(R_rect.startX, R_rect.startY, R_rect.w, R_rect.h);
  };

  function mouseMove(e) {
    if (drag) {
      rect.w = e.pageX - canvasRef.current.offsetLeft - rect.startX;
      rect.h = e.pageY - canvasRef.current.offsetTop - rect.startY;
      R_rect.w = (e.pageX - canvasRef.current.offsetLeft - rect.startX) * ratio;
      R_rect.h = (e.pageY - canvasRef.current.offsetTop - rect.startY) * ratio;
      draw();
    }
    //drawOldShapes();
  }

  function draw() {
    g_ctx.beginPath();
    g_ctx.fillStyle = "#FF0000";
    g_ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
    // g_ctx.stroke();
    R_draw();
  }

  function R_draw() {
    R_g_ctx.beginPath();
    R_g_ctx.fillStyle = "#FFFFFF";
    R_g_ctx.fillRect(R_rect.startX, R_rect.startY, R_rect.w, R_rect.h);
    R_g_ctx.stroke();
  }

  function mouseUp() {
    rectStartXArray[rectStartXArray.length] = rect.startX;
    rectStartYArray[rectStartYArray.length] = rect.startY;
    rectWArray[rectWArray.length] = rect.w;
    rectHArray[rectHArray.length] = rect.h;

    R_rectStartXArray[R_rectStartXArray.length] = R_rect.startX;
    R_rectStartYArray[R_rectStartYArray.length] = R_rect.startY;
    R_rectWArray[R_rectWArray.length] = R_rect.w;
    R_rectHArray[R_rectHArray.length] = R_rect.h;

    drag = false;
  }

  const scale_down = async () => {
    set_show_canv2(true);
    const image = await createImage(imageSrc);
    canvas2.width = naturalWidth;
    canvas2.height = naturalHeight;
    ctx2.drawImage(
      image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      0,
      0,
      canvas2.width,
      canvas2.height
    );
    R_draw();
  };

  const reset_real_image = async () => {
    set_show_canv2(true);
    const image = await createImage(imageSrc);
    canvas2.width = naturalWidth;
    canvas2.height = naturalHeight;
    ctx2.drawImage(
      image,
      0,
      0,
      naturalWidth,
      naturalHeight,
      0,
      0,
      canvas2.width,
      canvas2.height
    );
  };

  return (
    <div className='container_size'>
      {/* {console.log(rotation)} */}
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      />
      <ZoomSlider
        rotation={(e) => {
          rotation_handler(e);
        }}
        zoomChange={() => {}}
        zoom={Number(rotation)}
        min={0}
        max={180}
        step={1}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      >
        چرخش
      </span>
      <span>resize</span>
      <canvas ref={canvasRef2} />
      <span onClick={scale_down}>scale</span>
      <span
        className='Blue_BTN'
        onClick={() => {
          setImage();
          reset_real_image();
        }}
      >
        تلاش مجدد
      </span>
    </div>
  );
};

export default Filter_license;
