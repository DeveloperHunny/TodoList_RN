import {Button, Text, TextInput, View} from 'react-native';
import React, {FC, memo, useEffect, useMemo, useRef, useState} from 'react';
import {space_large, styles} from '../styles';
import {Colors} from 'react-native-paper';

const TimeView: FC<{time: number; setTime: (num: number) => void}> = ({
  time,
  setTime,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInput
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: space_large,
        }}
        value={time.toString()}
        onChangeText={newText => setTime(Number(newText))}
      />
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: space_large,
          color: Colors.black,
        }}>
        초
      </Text>
    </View>
  );
};

const AlarmView = memo(() => {
  const timerId = useRef<NodeJS.Timer | null>(null);
  const [time, setTime] = useState(0);

  const onClickBtn = () => {
    timerId.current = setInterval(() => {
      setTime(prevTime => prevTime - 1);
    }, 1000);
  };

  useEffect(() => {
    console.log(time);
    if (timerId.current !== null && time === 0) {
      clearInterval(timerId.current);
    }
  }, [time]);

  return (
    <View style={styles.rootContainerStyle}>
      <View style={[styles.titleContainerStyle, {justifyContent: 'center'}]}>
        <TimeView time={time} setTime={setTime} />
        <Button title="START" onPress={onClickBtn} />
      </View>
    </View>
  );
});

export default AlarmView;
