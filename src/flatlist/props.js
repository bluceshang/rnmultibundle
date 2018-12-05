//@flow
'use strict';

export type ITEM_TYPE = 'Image' | 'Text'

export type ImageItemProps = {
    url: string,
    name?: string,
    descp?: string,
    onClick?: Function
}

export type TextItemProps = {
    title: string,
    descp?: string,
    createTime?: string,
    onClick?: Function
}

export type ItemProps = {
    type?: ITEM_TYPE,
    onClick?: Function,
    data?: any
}



