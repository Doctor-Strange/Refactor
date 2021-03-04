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

let e_angle = 1;

let scale_rate = 2;

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
    e_ctx.save();
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

  function mouseDown(e) {
    console.log((e_angle * Math.PI) / 180);
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
        console.log("inside");
        drag_to_move_rectangle = true;
      } else if (
        cx >= box.x - 32 &&
        cx <= box.x &&
        cy >= box.y + box.h / 2 - 20 &&
        cy <= box.y + box.h / 2 + 20
      ) {
        drag_to_add_width = true;
      } else if (
        cx >= box.x + box.w / 2 - 20 &&
        cx <= box.x + box.w / 2 + 20 &&
        cy >= box.y + box.h &&
        cy <= box.y + box.h + 30
      ) {
        drag_to_add_height = true;
      } else if (
        cx >= box.x + box.w &&
        cx <= box.x + box.w + 30 &&
        cy >= box.y + box.h &&
        cy <= box.y + box.h + 30
      ) {
        drag_to_scale = true;
      } else if (
        cx >= box.x + box.w &&
        cx <= box.x + box.w + 30 &&
        cy >= box.y + -30 &&
        cy <= box.y
      ) {
        console.log("top");
        drag_to_rotate = true;
      } else {
        console.log("outside");
      }
    }
  }

  function mouseMove(e) {
    let cx = e.pageX - canvasRef.current.offsetLeft;
    let cy = e.pageY - canvasRef.current.offsetTop;
    // console.log(cx, cy);
    // move
    if (drag_to_move_rectangle) {
      box.x = cx - box.w / 2;
      box.y = cy - box.h / 2;
      // clear the canvas before drawing
      e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);
      // draw the background of the image
      draw_the_image();
      draw(box);
    }
    // width
    else if (drag_to_add_width) {
      if (temp_x > cx) {
        box.x = box.x - scale_rate;
        box.w = box.w + scale_rate;
      } else if (temp_x < cx && box.w > 50) {
        box.x = box.x + scale_rate;
        box.w = box.w - scale_rate;
      }
      // clear the canvas before drawing
      e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);
      // draw the background of the image
      draw_the_image();
      draw(box);
    }
    // height
    else if (drag_to_add_height) {
      if (temp_y < cy) {
        box.y = box.y;
        box.h = box.h + scale_rate;
      } else if (temp_y > cy && box.h > 50) {
        box.y = box.y;
        box.h = box.h - scale_rate;
      }
      // clear the canvas before drawing
      e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);
      // draw the background of the image
      draw_the_image();
      draw(box);
    }
    // scale
    else if (drag_to_scale) {
      if (temp_x > cx && box.w > 40 && box.h > 40) {
        box.w = box.w - scale_rate;
        box.h = box.h - scale_rate;
      } else if (temp_x < cx) {
        box.w = box.w + scale_rate;
        box.h = box.h + scale_rate;
      }
      // // clear the canvas before drawing
      e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);

      // draw the background of the image
      draw_the_image();

      draw(box);
    }
    // rotate
    else if (drag_to_rotate) {
      let center_x = box.x + box.w / 2;
      let center_y = box.y + box.h / 2;
      if (temp_y < cy) {
        e_angle = e_angle + 1;
      } else if (temp_y > cy) {
        e_angle = e_angle - 1;
      }
      // // clear the canvas before drawing
      e_ctx.clearRect(0, 0, e_canvas.width, e_canvas.height);
      // draw the background of the image
      draw_the_image();
      console.log(e_angle);
      draw(box, {
        tx: center_x,
        ty: center_y,
        angle: e_angle,
      });
    }
    //drawOldShapes();
    temp_x = cx;
    temp_y = cy;
  }

  function mouseUp() {
    if (drag_to_move_rectangle) {
      drag_to_move_rectangle = false;
      temp_x = null;
      temp_y = null;
      return;
    }
    if (drag_to_add_width) {
      drag_to_add_width = false;
      temp_x = null;
      temp_y = null;
      return;
    }
    if (drag_to_add_height) {
      drag_to_add_height = false;
      temp_x = null;
      temp_y = null;
      return;
    }
    if (drag_to_scale) {
      drag_to_scale = false;
      temp_x = null;
      temp_y = null;
      return;
    }
    if (drag_to_rotate) {
      drag_to_rotate = false;
      temp_x = null;
      temp_y = null;
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

  function draw(point, rotation = null) {
    e_ctx.save();
    e_ctx.beginPath();
    e_ctx.fillStyle = "red";
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
    // e_ctx.fillRect(box.x + box.w + e_angle, box.y + e_angle - 30, 30, 30);
    e_ctx.fillRect(box.x + box.w, box.y - 30, 30, 30);
    e_ctx.restore();

    // draw the rectangle
    e_ctx.save();
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
    e_ctx.fillRect(point.x, point.y, point.w, point.h);
    e_ctx.restore();

    // draw the border container
    e_ctx.save();
    e_ctx.beginPath();
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
    e_ctx.strokeStyle = "#585858";
    e_ctx.strokeRect(point.x - 12, point.y - 12, point.w + 24, point.h + 24);
    e_ctx.restore();

    // draw the the left handle
    e_ctx.save();
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
    e_ctx.arc(point.x - 12, point.y + point.h / 2, radius, 0, 2 * Math.PI);
    e_ctx.fill();
    e_ctx.lineWidth = 1;
    e_ctx.strokeStyle = "#585858";
    e_ctx.stroke();
    e_ctx.restore();

    // draw the the corner handle
    e_ctx.save();
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
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
    e_ctx.restore();

    // draw the the top right corner handle
    e_ctx.save();
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
    e_ctx.arc(point.x + point.w + 12, point.y - 12, radius, 0, 2 * Math.PI);
    e_ctx.fill();
    e_ctx.lineWidth = 1;
    e_ctx.strokeStyle = "#585858";
    e_ctx.stroke();
    e_ctx.restore();

    // draw the the bottom handle
    e_ctx.save();
    e_ctx.beginPath();
    e_ctx.fillStyle = "#FFFFFF";
    if (rotation) {
      e_ctx.translate(rotation.tx, rotation.ty);
      e_ctx.rotate((rotation.angle * Math.PI) / 180);
      e_ctx.translate(-rotation.tx, -rotation.ty);
    }
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
    e_ctx.restore();
  }

  const draw_a_rectangle_at_center = async () => {
    // calculate the with for the rectangle base on the container size
    let width = e_canvas.width / 4;
    let center_x = e_canvas.width / 2 - width / 2;
    let center_y = e_canvas.height / 2 - width / 4;
    e_angle = 1;
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
