import React, { useState, useEffect, useRef } from "react";

let canvas2 = null;
let ctx2 = null;
let rect = {};
let R_rect = {};
let drag = false;
let g_ctx = null;
let R_g_ctx = null;
let rectStartXArray = new Array();
let rectStartYArray = new Array();
let rectWArray = new Array();
let rectHArray = new Array();

let R_rectStartXArray = new Array();
let R_rectStartYArray = new Array();
let R_rectWArray = new Array();
let R_rectHArray = new Array();

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

const Filter_license = ({ imageSrc, pixelCrop, container_width }) => {
  const [show_canv2, set_show_canv2] = useState(false);
  const canvasRef = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    setImage();
  }, []);

  const setImage = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    g_ctx = ctx;

    // Real Image
    canvas2 = canvasRef2.current;
    ctx2 = canvas2.getContext("2d");
    R_g_ctx = ctx2;

    const image = await createImage(imageSrc);
    let main_container_inner_width = container_width.current.offsetWidth - 100;
    ratio = naturalWidth / main_container_inner_width;
    console.log(main_container_inner_width, naturalWidth, ratio);

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

  function mouseDown(e) {
    e.persist();

    rect.startX = e.pageX - canvasRef.current.offsetLeft;
    rect.startY = e.pageY - canvasRef.current.offsetTop;

    R_rect.startX = (e.pageX - canvasRef.current.offsetLeft) * ratio;
    R_rect.startY = (e.pageY - canvasRef.current.offsetTop) * ratio;
    drag = true;
  }

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
    g_ctx.stroke();
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
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      />
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
