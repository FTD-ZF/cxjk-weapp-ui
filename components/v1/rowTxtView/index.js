import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'
import LineView from '../lineView'
import { ImageKeys } from '../../assets'
import NoDoublePress from '../../../utils/NoDoubleClick'


/**
 * title-标题
 * title_second-右边标题
 * boolShowLine 是否展示底部横线 默认展示
 * boolWrite 是否展示必填项标志*  默认不展示
 * boolShowArrow 是否展示右边箭头 默认不展示
 */
const RowTxtView = forwardRef((props, ref) => {

    const { title = '', title_second = '', boolShowLine = true, boolWrite = false, boolShowArrow = false, onClick } = props;

    return <View className={styles.main} onClick={() => boolShowArrow && onClick && NoDoublePress.onPress(() => onClick())} >
        <View className={styles.content} >
            <View className={styles.left_v}>
                <Text className={styles.title_a} ><Text style={{ color: 'red' }} >{boolWrite ? '*' : ''}</Text>{title}</Text>
            </View>
            <View className={styles.right_v} >
                <Text className={styles.title_b} >{title_second}</Text>
                {boolShowArrow ? <Image className={styles.img} src={ImageKeys.ic_arrow} /> : <View />}
            </View>

        </View>
        {boolShowLine ? <LineView type={2} /> : <View />}
    </View>
})

export default React.memo(RowTxtView)