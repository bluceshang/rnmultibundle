// @flow
'use strict';

import * as React from 'react';
import {View, Text, FlatList} from 'react-native';
import ItemCell from './ItemCell';

type Props = {
    data: Array<any>
}
export default class PureFlatList extends React.PureComponent<Props> {


    render() {
        const {data} = this.props;
        return (
            <View>

                {/*<FlatList*/}
                    {/*renderItem={this._renderItem}*/}
                    {/*data={data}*/}
                    {/*_keyExtractor={this._keyExtractor}*/}
                {/*/>*/}
            </View>
        )
    }

    _renderItem = (item, index) => {
        const {type, data} = item;
        return (
            <ItemCell
                type={type}
                data={data}/>
        )
    };

    _keyExtractor = (item, index) => {

    };
}