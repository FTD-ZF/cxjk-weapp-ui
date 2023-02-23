import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'


const TitleContentView = forwardRef((props, ref) => {

    const { title = '标题', children, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >
        <View className={styles.top} >
            <Text className={styles.name} >{title}</Text>
        </View>
        <View className={styles.content} >
            {
                children
            }
        </View>

    </View>

})
/**
 * @容器布局
 * title = '标题'
 */
export default React.memo(TitleContentView)