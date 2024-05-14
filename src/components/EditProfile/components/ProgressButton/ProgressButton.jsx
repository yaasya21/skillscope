import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

const Button = styled.div`
  user-select: none;
  cursor: pointer;
  font-size: 15px bold;
  background-color: red;
  color: white;
  padding: 10px 5px;
  position: relative;
  width: 150px;
  height: 45px;
  margin: auto;
`;

const Progress = styled.div`
  margin: -15px -5px;
  background-color: blue;
  height: 5px;
  position: absolute;
  width: 0;
  transition: width 0s;

  &.start,
  &.done {
    width: 100%;
    transition: width 3s;
  }
`;

const Container = styled.div`
  text-align: center;
`;

const useLongPress = (callback = () => {}, ms = 300) => {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return [
    startLongPress,
    {
      onMouseDown: start,
      onMouseUp: stop,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: stop,
    },
  ];
};

const ProgressButton = (props) => {
  const [startLongPress, backspaceLongPress] = useLongPress(
    props.longPressBackspaceCallback,
    3000
  );
  let className = "progress";
  if (startLongPress) {
    className += " start";
  }

  return (
    <Button {...backspaceLongPress}>
      <Progress className={className}></Progress>
      <Container>HOLD TO DELETE</Container>
    </Button>
  );
};

export { ProgressButton };
