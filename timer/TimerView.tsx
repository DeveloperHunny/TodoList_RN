import {Button, Text, View} from 'react-native';
import React, {memo, useEffect, useMemo, useRef, useState} from 'react';
import {color_basic_strong, space_large, styles} from '../styles';

const Timer = memo(() => {
  const [timer, setTimer] = useState(0);
  const [btnTitle, setBtnTitle] = useState('START');
  const timerId = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    return () => {
      clearInterval(Number(timerId.current));
    };
  }, []);

  const onClickBtn = () => {
    if (btnTitle === 'START') {
      timerId.current = setInterval(() => {
        setTimer(prevTime => prevTime + 1);
      }, 1000);
      setBtnTitle('STOP');
    } else {
      clearInterval(Number(timerId.current));
      setBtnTitle('START');
    }
  };

  const onResetBtn = () => {
    setTimer(0);
  };

  return (
    <View style={styles.rootContainerStyle}>
      <View style={[styles.titleContainerStyle, {justifyContent: 'center'}]}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: space_large,
          }}>
          {' '}
          TIME : {timer}
        </Text>
        <Button title={btnTitle} onPress={onClickBtn} />
        {btnTitle === 'START' && timer !== 0 && (
          <Button title="reset" onPress={onResetBtn} />
        )}
      </View>
    </View>
  );
});

export default Timer;
