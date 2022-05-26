import {View} from 'react-native';
import DialogContainer from 'react-native-dialog/lib/Container';
import DialogTitle from 'react-native-dialog/lib/Title';
import DialogDescription from 'react-native-dialog/lib/Description';
import DialogButton from 'react-native-dialog/lib/Button';
import React, {FC, useState} from 'react';
import {todoItem} from './types';

const DialogView: FC<{
  item: todoItem;
  closeDialog: () => void;
  visible: boolean;
}> = ({item, closeDialog, visible}) => {
  return (
    <View>
      <DialogContainer visible={visible}>
        <DialogTitle>{item.title}</DialogTitle>
        <DialogDescription> {item.content} </DialogDescription>
        <DialogButton label="CLOSE" onPress={closeDialog} />
      </DialogContainer>
    </View>
  );
};

export default DialogView;
