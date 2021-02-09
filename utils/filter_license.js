import React, { useState, useEffect, useRef } from "react";

let rect = {};
let drag = false;
let g_ctx = null;
var rectStartXArray = new Array();
var rectStartYArray = new Array();
var rectWArray = new Array();
var rectHArray = new Array();

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

const Filter_license = ({ imageSrc, pixelCrop }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setImage();
  }, []);

  const setImage = async () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    g_ctx = ctx;
    const image = await createImage(imageSrc);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  };

  function mouseDown(e) {
    e.persist();
    rect.startX = e.pageX - canvasRef.current.offsetLeft;
    rect.startY = e.pageY - canvasRef.current.offsetTop;
    console.log(rect.startX, rect.startY);
    drag = true;
  }

  function mouseMove(e) {
    if (drag) {
      rect.w = e.pageX - canvasRef.current.offsetLeft - rect.startX;
      rect.h = e.pageY - canvasRef.current.offsetTop - rect.startY;
      draw();
    }
    //drawOldShapes();
  }

  function draw() {
    g_ctx.beginPath();
    g_ctx.fillStyle = "#FF0000";
    g_ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
    g_ctx.stroke();
  }

  function mouseUp() {
    rectStartXArray[rectStartXArray.length] = rect.startX;
    rectStartYArray[rectStartYArray.length] = rect.startY;
    rectWArray[rectWArray.length] = rect.w;
    rectHArray[rectHArray.length] = rect.h;
    drag = false;
  }

  return (
    <div className='container_size'>
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
      />
    </div>
  );
};

export default Filter_license;
