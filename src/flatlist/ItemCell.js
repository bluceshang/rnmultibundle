//@flow
'use strict';

import React from 'react';
import {} from 'react-native';

import type {ItemProps} from './props';
import {defaultNull} from './defautNull';

import ImageCell from './ItemCell';
import TextCell from './TextCell';

export default class ItemCell extends React.PureComponent<ItemProps> {

    render() {
        // const {type, data, onClick} = this.props;
        // if (type === 'Image') {
        //     const {url, name, descp} = data;
        //     return <ImageCell
        //         data={data}
        //         type={type}
        //         url={url}
        //         name={name}
        //         descp={descp}
        //         onClick={onClick}/>
        // } else if (type === 'Text') {
        //     const {title, descp, createTime} = data;
        //     return <TextCell
        //         title={title}
        //         createTime={createTime}
        //         descp={descp}
        //         onClick={onClick}/>
        // } else {
            return defaultNull;
        // }
    }
}