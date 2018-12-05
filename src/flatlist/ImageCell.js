//@flow
'use strict';
import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import type {ImageItemProps} from './props';
import {defaultNull} from './defautNull';

export default class ImageCell extends React.PureComponent<ImageItemProps> {

    render() {
        const {url, name, descp} = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={this._onClick}>
                <Image style={styles.image} source={{uri: url}}/>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {name ? <Text style={styles.name}>{name}</Text> : defaultNull}
                    {descp ? <Text style={styles.descp}>{descp}</Text> : defaultNull}
                </View>
            </TouchableOpacity>
        )
    }

    _onClick = () => {
        const {url, name, descp} = this.props;
        this.props.onClick && this.props.onClick({url, name, descp});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    name: {
        fontSize: 18,
        color: '#333333'
    },
    descp: {
        fontSize: 14,
        color: '#666666'
    },
    image: {
        width: 120,
        height: 120
    }
})