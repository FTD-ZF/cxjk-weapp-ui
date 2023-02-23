import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, Textarea, } from '@tarojs/components'

import styles from './index.module.scss'
import NoDoublePress from '../../../utils/NoDoubleClick';


const BottomSubmitView = forwardRef((props, ref) => {

    const { title_a = '保存', onClick, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >

        <View className={styles.content} onClick={() => NoDoublePress.onPress(onClick)} >
            {title_a}
        </View>

    </View>

})
export default React.memo(BottomSubmitView)