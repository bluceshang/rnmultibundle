// @flow
'use strict';

import React from 'react';
import {View, Text, TextInput, Image} from 'react-native';

const defaultNull = null;
export type SEX = 'M' | 'm' | 'F' | 'f';
type PersonalProps = {
    name: string,
    sex: SEX,
    age: number,
    address?: string
}
type PersonalState = {
    text: string
}

const tangwei = require('./resource/tangwei.jpg');

export default class PersonalComponent extends React.Component<PersonalProps, PersonalState> {
    /**
     * ref的第一个参数是TextInput | null，因为当组件卸载时，React将用null调用你的ref回调。另外，在React完成渲染之前，
     * PersonalComponent上的button属性将不会被设置。在那之前你的按钮引用将是未定义的。使用可选标志?（如在?TextInput）避免引用异常。
     */
    textInput: ?TextInput;

    constructor(props: PersonalProps) {
        super(props)
        this.state = {
            text: ''
        }
    }

    render() {
        const {name, sex, age, address} = this.props;
        const {text = ''} = this.state;

        let sexComponent = defaultNull;
        if (sex.toUpperCase() == 'M') {
            sexComponent = <Text>sex:男</Text>
        } else if (sex.toUpperCase() == 'F') {
            sexComponent = <Text>sex:女</Text>
        }
        return (
            <View>
                <Text>name:{name}</Text>
                {sexComponent}
                <Text>age:{age}</Text>
                {address ? <Text>address:{address}</Text> : defaultNull}
                <Image source={tangwei} style={{width: 180, height: 180}}/>
                <TextInput
                    value={text}
                    onChangeText={this._textChange}
                    placeholder={'请输入...'}
                />
            </View>
        )
    }

    _textChange = (text: string) => {
        this.setState({
            text: text
        })
    }

    _textInputRef = (ref: TextInput) => {
        this.textInput = ref;
    }
}