import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInputProps, View } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import {Input} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { patchWebProps } from 'react-native-elements/dist/helpers';


//  picker-selectでinput部を隠して、ボタン部分のみを実装する
const SelectView: React.FC<PickerSelectProps> = (props) => {
  return (
      <View>
        <RNPickerSelect
          style={{
            inputIOS:{
              opacity:0
            }
          }}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
          }}
          {...props}
        />
      </View>
  )
}

type InputSelectProps = {
  inputProps: TextInputProps;
  selectProps: PickerSelectProps;
};

//  直接入力と選択が可能なコントロール
//  内部的には入力コントトールのrightIconにselect-pickerを埋め込む
const InputSelect: React.FC<InputSelectProps> = (props) => {
  //  値によって、InputのrightIconを切り替える
  const rightArea = (
    <View style={{flexDirection:'row',  width:40, justifyContent:'center'}}>
      { props.inputProps?.value ? <Text>☒</Text> : null }
      { props.selectProps?.items ? <SelectView {...props.selectProps} /> : undefined}
    </View>
  )

  return (
    <Input
      {...props.inputProps}
      rightIcon = {rightArea}
    />
  )
}

export default function App() {
  const [textVal,setTextVal] = useState<string>("1");
  const items=[
              { label: 'Football2', value: 'football' },
              { label: 'Baseball2', value: 'baseball' },
              { label: 'Hockey2', value: 'hockey' },
          ]
  return (
    <View style={styles.container}>
      <InputSelect inputProps={
        {value: textVal,onChangeText:setTextVal}
      } selectProps={{onValueChange:(val:string) => {setTextVal(val)}, items:items}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
