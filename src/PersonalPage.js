// @flow
'use strict';

import React from 'react';
import PersonalComponent from './PersonalComponent';

export default class PersonalPage extends React.Component<{}> {

    render() {
        return (
            <PersonalComponent name={'shangshaoshan'} sex={'F'} age={32}/>
        )
    }
}