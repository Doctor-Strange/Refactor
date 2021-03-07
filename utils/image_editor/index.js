import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Rect, Group, Circle } from "react-konva";
import test_image from "../../public/image/test.jpg";
import "./image_editor.scss";

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
let image = null;
let naturalHeight = null;
let naturalWidth = null;
// let rotation = 0;

let temp_x = null;
let temp_y = null;
let temp_x_touch = null;
let temp_y_touch = null;

let drag_to_move_rectangle = false;
let drag_to_add_width = null;
let drag_to_add_height = null;
let drag_to_scale = null;
let drag_to_rotate = null;

// let box = {
//   x: 1,
//   y: 1,
//   w: 1,
//   h: 1,
// };

// let scale = {
//   x: 1,
//   y: 1,
// };

let multiTouch = null;
let coefficient = 1.5;
let scale_coefficient = 0.1;

const ImageEditor = ({ show_change, show_image_final } = props) => {
  const [show_rectangle, set_show_rectangle] = useState(false);
  const [rotation, set_rotation] = useState(0);
  const [scale, set_scale] = useState({
    x: 1,
    y: 1,
  });
  const [group_drag, set_group_drag] = useState(true);
  const [box, set_box] = useState({
    x: 1,
    y: 1,
    w: 1,
    h: 1,
  });
  const stage_ref = useRef(null);
  const image_ref = useRef(null);

  useEffect(() => {
    loadImage();

    return () => {
      image = null;
      naturalHeight = null;
      naturalWidth = null;
      temp_x = null;
      temp_y = null;
      temp_x_touch = null;
      temp_y_touch = null;
      drag_to_move_rectangle = false;
      drag_to_add_width = null;
      drag_to_add_height = null;
      drag_to_scale = null;
      drag_to_rotate = null;
      // scale = {
      //   x: 1,
      //   y: 1,
      // };
      multiTouch = null;
      coefficient = 1.5;
      scale_coefficient = 1;
    };
  }, []);

  const loadImage = async () => {
    // save to "this" to remove "load" handler on unmount
    image = await createImage(test_image);
  };

  const stage_click = () => {
    let width = window.innerWidth / 8;
    let height = 20;
    console.log(stage_ref);
    // save the rectangle data to the global variable
    set_box({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      w: width,
      h: height,
    });
    set_show_rectangle(true);
  };

  const rotation_button_handler = (e, mobile) => {
    drag_to_rotate = true;
    // drag_to_scale = true;

    temp_x = e.evt.pageX;
    temp_y = e.evt.pageY;
    if (mobile) {
      stage_click();
      if (e.evt.touches.length > 1) {
        temp_x = e.evt.touches[0].pageX;
        temp_y = e.evt.touches[0].pageY;
        temp_x_touch = e.evt.touches[1].pageX;
        temp_y_touch = e.evt.touches[1].pageY;
        multiTouch = true;
        drag_to_rotate = false;
        drag_to_scale = false;
        set_group_drag(false);
      } else {
        temp_x = e.evt.touches[0].pageX;
        temp_y = e.evt.touches[0].pageY;
      }
    }
  };
  const handle_rotation_drag = (e, mobile) => {
    let cx = e.evt.pageX;
    let cy = e.evt.pageY;
    let cx_2 = null;
    let cy_2 = null;
    if (mobile) {
      if (multiTouch) {
        cx = e.evt.touches[0].pageX;
        cy = e.evt.touches[0].pageY;
        cx_2 = e.evt.touches[1].pageX;
        cy_2 = e.evt.touches[1].pageY;
        console.log("cx", cx, "cx_2", cx_2, scale.x);
        if (cx < cx_2 && cx < temp_x && cx_2 > temp_x_touch && scale.x < 3) {
          console.log("scale up");
          set_scale({
            x: scale_coefficient + scale.x,
            y: scale_coefficient + scale.y,
          });
        } else if (
          cx > cx_2 &&
          cx > temp_x &&
          cx_2 < temp_x_touch &&
          scale.x < 3
        ) {
          console.log("scale up");
          set_scale({
            x: scale_coefficient + scale.x,
            y: scale_coefficient + scale.y,
          });
        } else if (
          cx < cx_2 &&
          cx > temp_x &&
          cx_2 < temp_x_touch &&
          scale.x > 1
        ) {
          set_scale({
            x: scale.x - scale_coefficient,
            y: scale.y - scale_coefficient,
          });
        } else if (
          cx > cx_2 &&
          cx < temp_x &&
          cx_2 > temp_x_touch &&
          scale.x > 1
        ) {
          set_scale({
            x: scale.x - scale_coefficient,
            y: scale.y - scale_coefficient,
          });
        }

        temp_x_touch = cx_2;
        temp_y_touch = cy_2;
      } else {
        cx = e.evt.touches[0].pageX;
        cy = e.evt.touches[0].pageY;
        if (temp_y > cy) {
          set_rotation(rotation - coefficient);
          // rotation = rotation + 1;
        } else if (temp_y < cy) {
          set_rotation(rotation + coefficient);
          // rotation = rotation - 1;
        }
      }
    } else {
      if (drag_to_rotate) {
        if (temp_y > cy) {
          set_rotation(rotation - coefficient);
          // rotation = rotation + 1;
        } else if (temp_y < cy) {
          set_rotation(rotation + coefficient);
          // rotation = rotation - 1;
        }
      } else if (drag_to_scale) {
        console.log(temp_x, cx, scale.x, scale.y);
        if (temp_x > cx && scale.x > 1) {
          set_scale({
            x: scale.x - scale_coefficient,
            y: scale.y - scale_coefficient,
          });
          // rotation = rotation + 1;
        } else if (temp_x < cx && scale.x < 3) {
          set_scale({
            x: scale.x + scale_coefficient,
            y: scale.y + scale_coefficient,
          });
          // rotation = rotation - 1;
        }
      }
    }
    temp_x = cx;
    temp_y = cy;
  };

  const deactivate_rotation = () => {
    set_group_drag(true);
    drag_to_rotate = false;
    multiTouch = false;
    drag_to_scale = false;
  };

  const scale_button_handler = (e, mobile) => {
    console.log("xlixk");
    drag_to_rotate = false;
    drag_to_scale = true;
    set_group_drag(false);
    temp_x = e.evt.pageX;
    temp_y = e.evt.pageY;
    if (mobile) {
      stage_click();
      temp_x = e.evt.touches[0].pageX;
      temp_y = e.evt.touches[0].pageY;
    }
  };
  // const handle_scale_drag = (e, mobile) => {
  //   console.log("handle_scale_drag move");
  //   let cx = e.evt.pageX;
  //   let cy = e.evt.pageY;
  //   if (mobile) {
  //     cx = e.evt.touches[0].pageX;
  //     cy = e.evt.touches[0].pageY;
  //   }
  //   if (drag_to_scale && scale.x >= 1) {
  //     if (temp_x > cx) {
  //       scale = {
  //         x: scale.x + 0.1,
  //         y: scale.y + 0.1,
  //       };
  //       // rotation = rotation + 1;
  //     } else if (temp_x < cx) {
  //       scale = {
  //         x: scale.x - 0.1,
  //         y: scale.y - 0.1,
  //       };
  //       // rotation = rotation - 1;
  //     }
  //     temp_x = cx;
  //     temp_y = cy;
  //   }
  // };
  // const deactivate_scale = () => {
  //   drag_to_scale = false;
  // };

  const save_change = async () => {
    const uri = stage_ref.current.toDataURL({
      mimeType: "image/jpeg",
      pixelRatio: 16 / 9,
    });
    console.log(uri);
    // we also can save uri as file
    // but in the demo on Konva website it will not work
    // because of iframe restrictions
    // but feel free to use it in your apps:
    // let myImage = await get_the_final_image(uri);
    // downloadURI(myImage, "stage.png");
    show_image_final(uri);
    show_change();
  };

  const get_the_final_image = (url) =>
    new Promise((resolve) => {
      canvas.toBlob((file) => {
        const new_image = new File([file], `my_image${new Date()}.jpeg`, {
          type: "image/jpeg",
          lastModified: new Date(),
          size: 2,
        });
        resolve(new_image);
      }, "image/jpeg");
    });

  return (
    <div className='editor_container'>
      <Stage
        width={window.innerWidth}
        height={window.innerWidth / (16 / 9)}
        onClick={stage_click}
        ref={stage_ref}
        onMouseDown={rotation_button_handler}
        onTouchStart={(e) => rotation_button_handler(e, true)}
        onMouseMove={handle_rotation_drag}
        onTouchMove={(e) => handle_rotation_drag(e, true)}
        onMouseUp={deactivate_rotation}
        onTouchEnd={deactivate_rotation}
        onMouseout={deactivate_rotation}
      >
        <Layer>
          <Image
            image={image}
            ref={image_ref}
            x={0}
            y={window.innerHeight / 2 - window.innerWidth / (16 / 9) / 2}
            y={0}
            width={window.innerWidth}
            height={window.innerWidth / (16 / 9)}
          />
          {show_rectangle ? (
            <Group
              draggable={group_drag}
              rotation={rotation}
              offset={{
                x: box.x + box.w / 2,
                y: box.y + box.h / 2,
              }}
              x={window.innerWidth / 2}
              y={
                window.innerWidth < 720
                  ? window.innerHeight / 2 - 150
                  : window.innerHeight / 2 - 50
              }
              scale={{
                x: scale.x,
                y: scale.y,
              }}
            >
              <Rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                cornerRadius={20}
                fill='#ffffff'
                // onClick={handleClick}
              />
              {/* <Rect x={} y={} width={50} height={50} fill='#ffffff' /> */}
              <Rect
                x={box.x - 50}
                y={box.y - 50}
                width={box.w + 100}
                height={box.h + 100}
                stroke='#bdbdbd'
                strokeWidth={1}
                draggable={false}
                // onClick={handleClick}
              />
              <Circle
                x={box.x + box.w + 50}
                y={box.y + box.h + 50}
                radius={12}
                fill='blue'
                // onMouseDown={scale_button_handler}
                // onTouchStart={(e) => scale_button_handler(e, true)}
                // onMouse={handle_scale_drag}
                // onTouchMove={(e) => handle_scale_drag(e, true)}
                // onMouseUp={deactivate_scale}
                // onMouseout={deactivate_scale}
              />
            </Group>
          ) : null}
        </Layer>
      </Stage>
      <span className='closeit' onClick={show_change}>
        close
      </span>
      <span className='saveit' onClick={save_change}>
        save
      </span>
    </div>
  );
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.addEventListener("load", (e) => {
      naturalHeight = e.path[0].naturalHeight;
      naturalWidth = e.path[0].naturalWidth;
      resolve(image);
    });
    image.addEventListener("error", (error) => reject(error));
    image.src = url;
  });

export default ImageEditor;
