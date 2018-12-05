//@flow
'use strict';

import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import type {TextItemProps} from './props';
import {defaultNull} from './defautNull';

export default class TextCell extends React.PureComponent<TextItemProps> {

    render() {
        const {title, descp, createTime} = this.props;
        return (
            <TouchableOpacity style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                {descp ? <Text style={styles.descp}>{descp}</Text> : defaultNull}
                {createTime ? <Text style={styles.createTime}>{createTime}</Text> : defaultNull}
            </TouchableOpacity>
        )
    }

    _onPress = () => {
        this.props.onClick && this.props.onClick();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 18,
        color: '#333'
    },
    descp: {
        fontSize: 14,
        color: '#666'
    },
    createTime: {
        fontSize: 12,
        color: '#999'
    }
})