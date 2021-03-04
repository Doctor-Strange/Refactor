import React, { useState, useEffect, useRef } from "react";
import test_image from "../public/image/test.jpg";

let e_canvas = null;
let e_ctx = null;
let image_replica = null;
let e_rect = {};
let e_rectStartXArray = [];
let e_rectStartYArray = [];
let e_rectWArray = [];
let e_rectHArray = [];
let naturalHeight = 0;
let naturalWidth = 0;
let ratio = 0;

let box = null;

let drag_to_move_rectangle = false;
let drag_to_add_width = null;
let drag_to_add_height = null;
let drag_to_scale = null;
let drag_to_rotate = null;

let radius = 10;

let temp_x = null;
let temp_y = null;

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

const Filter_license = ({ imageSrc, pixelCrop, container_width }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    create_canvas();
  }, []);

  const create_canvas = async () => {
    // save the canvas and context globally
    e_canvas = canvasRef.current;
    e_ctx = e_canvas.getContext("2d");

    // save the image globally
    // image_replica= await createImage(imageSrc);
    // DEV vvv
    image_replica = await createImage(test_image);

    // container size
    let main_container_inner_width = container_width.current.offsetWidth - 100;
    // scale down ration
    ratio = naturalWidth / main_container_inner_width;

    // build a canvas size for the image and scale it down
    e_canvas.width = main_container_inner_width;
    e_canvas.height = e_canvas.width / (16 / 9);
    draw_the_image();
  };

  const draw_the_image = () => {
    e_ctx.drawImage(
      image_replica,
      0,
      0,
      naturalWidth,
      naturalHeight,
      0,
      0,
      e_canvas.width,
      e_canvas.height
    );
  };

  // const whiteboard = async () => {
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");
  //   ctx.fillStyle = "rgba(0,0,0,0)";
  //   ctx.clearRect(0, 0, naturalWidth, naturalHeight);
  //   canvas.style.backgroundImage = `url(${imageSrc})`;
  //   canvas.style.backgroundSize = "cover";

  //   // ctx.drawImage(
  //   //   image,
  //   //   pixelCrop.x,
  //   //   pixelCrop.y,
  //   //   pixelCrop.width,
  //   //   pixelCrop.height,
  //   //   0,
  //   //   0,
  //   //   canvas.width,
  //   //   canvas.height
  //   // );
  // };

  function mouseDown(e) {
    e.persist();
    let cx = e.pageX - canvasRef.current.offsetLeft;
    let cy = e.pageY - canvasRef.current.offsetTop;

    if (!box) {
      draw_a_rectangle_at_center();
    } else {
      if (
        cx >= box.x &&
        cx <= box.x + box.w &&
        cy >= box.y &&
        cy <= box.y + box.h
      ) {
        drag_to_move_rectangle = true;
        console.log("inside");
      }
      // resize corner
      // {
      //   console.log(box.x, e.pageX - canvasRef.current.offsetLeft - box.x);
      // box.w = e.pageX - canvasRef.current.offsetLeft - box.x;
      // box.h = e.pageY - canvasRef.current.offsetTop - box.y;
      // // box.y = e.pageY - canvasRef.current.offsetTop - box.y;
      // // clear the canvas before drawing
      // e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);

      // // draw the background of the image
      // draw_the_image();

      // draw(box);
      // }
      else {
        console.log("outside");
      }
    }
  }
  // rect.startX = e.pageX - canvasRef.current.offsetLeft;
  // rect.startY = e.pageY - canvasRef.current.offsetTop;

  // R_rect.startX = (e.pageX - canvasRef.current.offsetLeft) * ratio;
  // R_rect.startY = (e.pageY - canvasRef.current.offsetTop) * ratio;

  function mouseMove(e) {
    if (drag_to_move_rectangle) {
      console.log(box.x, e.pageX - canvasRef.current.offsetLeft - box.x);
      box.x = e.pageX - canvasRef.current.offsetLeft - box.w / 2;
      box.y = e.pageY - canvasRef.current.offsetTop - box.h / 2;
      // box.y = e.pageY - canvasRef.current.offsetTop - box.y;
      // clear the canvas before drawing
      e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);

      // draw the background of the image
      draw_the_image();

      draw(box);
    }
    //drawOldShapes();
  }

  function mouseUp() {
    if (drag_to_move_rectangle) {
      drag_to_move_rectangle = false;
      return;
    }
    // rectStartXArray[rectStartXArray.length] = rect.startX;
    // rectStartYArray[rectStartYArray.length] = rect.startY;
    // rectWArray[rectWArray.length] = rect.w;
    // rectHArray[rectHArray.length] = rect.h;

    // R_rectStartXArray[R_rectStartXArray.length] = R_rect.startX;
    // R_rectStartYArray[R_rectStartYArray.length] = R_rect.startY;
    // R_rectWArray[R_rectWArray.length] = R_rect.w;
    // R_rectHArray[R_rectHArray.length] = R_rect.h;

    // drag_to_move_rectangle = false;
  }

  // const rotation_handler = async (e) => {
  //   let value = Number(e);
  //   console.log(e);
  //   // g_ctx.clearRect(rect.startX, rect.startY, rect.w, rect.h);
  //   //
  //   // console.log(rect.w, rect.h);
  //   // console.log(R_rect.w, R_rect.h);

  //   // g_ctx.beginPath();
  //   // g_ctx.fillStyle = "#FF0000";
  //   await whiteboard();
  //   g_ctx.translate(rect.startX + rect.w / 2, rect.startY + rect.h / 2);
  //   g_ctx.clearRect(rect.startX, rect.startY, rect.w, rect.h);
  //   R_g_ctx.translate(
  //     R_rect.startX + R_rect.w / 2,
  //     R_rect.startY + R_rect.h / 2
  //   );
  //   g_ctx.rotate((value * Math.PI) / 180);
  //   R_g_ctx.rotate((value * Math.PI) / 180);
  //   g_ctx.translate(-(rect.startX + rect.w / 2), -(rect.startY + rect.h / 2));
  //   R_g_ctx.translate(
  //     -(R_rect.startX + R_rect.w / 2),
  //     -(R_rect.startY + R_rect.h / 2)
  //   );
  //   g_ctx.fillStyle = "#FF0000";
  //   R_g_ctx.fillStyle = "#FF0000";
  //   g_ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
  //   R_g_ctx.fillRect(R_rect.startX, R_rect.startY, R_rect.w, R_rect.h);
  // };

  function draw(point) {
    // draw the rectangle
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    e_ctx.fillRect(point.x, point.y, point.w, point.h);

    // draw the border container
    e_ctx.beginPath();
    e_ctx.strokeStyle = "#585858";
    e_ctx.strokeRect(point.x - 12, point.y - 12, point.w + 24, point.h + 24);

    // draw the the left handle
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    e_ctx.arc(point.x - 12, point.y + point.h / 2, radius, 0, 2 * Math.PI);
    e_ctx.fill();
    e_ctx.lineWidth = 1;
    e_ctx.strokeStyle = "#585858";
    e_ctx.stroke();

    // draw the the corner handle
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    e_ctx.arc(
      point.x + point.w + 12,
      point.y + point.h + 12,
      radius,
      0,
      2 * Math.PI
    );
    e_ctx.fill();
    e_ctx.lineWidth = 1;
    e_ctx.strokeStyle = "#585858";
    e_ctx.stroke();

    // draw the the bottom handle
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    e_ctx.arc(
      point.x + point.w / 2,
      point.y + point.h + 12,
      radius,
      0,
      2 * Math.PI
    );
    e_ctx.fill();
    e_ctx.lineWidth = 1;
    e_ctx.strokeStyle = "#585858";
    e_ctx.stroke();
  }

  const draw_a_rectangle_at_center = async () => {
    // calculate the with for the rectangle base on the container size
    let width = e_canvas.width / 4;
    let center_x = e_canvas.width / 2 - width / 2;
    let center_y = e_canvas.height / 2 - width / 4;

    // clear the canvas before drawing
    e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);

    // draw the background of the image
    draw_the_image();

    // save the rectangle data to the global variable
    box = {
      x: center_x,
      y: center_y,
      w: width,
      h: width / 2,
    };

    draw({
      x: center_x,
      y: center_y,
      w: width,
      h: width / 2,
    });
  };

  return (
    <div className='container_size'>
      {/* {console.log(rotation)} */}
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onMouseOut={mouseUp}
      />
      <span onClick={draw_a_rectangle_at_center} className='rectangle_icon' />
    </div>
  );
};

export default Filter_license;
