import {TextInput, View} from 'react-native';
import DialogContainer from 'react-native-dialog/lib/Container';
import DialogTitle from 'react-native-dialog/lib/Title';
import DialogDescription from 'react-native-dialog/lib/Description';
import DialogButton from 'react-native-dialog/lib/Button';
import React, {FC, memo, useCallback, useState} from 'react';
import {todoItem} from './types';
import DialogInput from 'react-native-dialog/lib/Input';
import DialogCodeInput from 'react-native-dialog/lib/CodeInput';
import {Colors} from 'react-native-paper';

const DialogView: FC<{
  item: todoItem;
  visible: boolean;
  onSaveItem: (content: string) => void;
  onCloseDialog: () => void;
  onDeleteItem: () => void;
}> = memo(({item, visible, onSaveItem, onCloseDialog, onDeleteItem}) => {
  console.log('rendered Dialog');
  const [content, setContent] = useState(item.content);

  const handleOnChangeText = useCallback((newText: string) => {
    setContent(newText);
  }, []);

  return (
    <View>
      <DialogContainer visible={visible}>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <DialogTitle>{item.title}</DialogTitle>
          <TextInput
            style={{
              minHeight: 150,
              maxWidth: '80%',
              textAlign: 'left',
              textAlignVertical: 'top',
              overflow: 'scroll',
              flexShrink: 1,
            }}
            multiline={true}
            autoFocus={true}
            value={content}
            onChangeText={handleOnChangeText}
          />
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <DialogButton label="SAVE" onPress={() => onSaveItem(content)} />
            <DialogButton label="DELETE" onPress={onDeleteItem} />
            <DialogButton label="CLOSE" onPress={onCloseDialog} />
          </View>
        </View>
      </DialogContainer>
    </View>
  );
});

export default DialogView;
