import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'
import { ImageKeys } from '../../assets';
import LineView from '../lineView';
import NoDoublePress from '../../../utils/NoDoubleClick'


const ColumnSelectArrow = forwardRef((props, ref) => {

    const { title = '', title_second = '请选择',
        boolShowLine = true, onClick, boolEdit = true, boolWrite = false, } = props;

    useImperativeHandle(ref, () => ({

    }))

    const onClickItem = () => {
        if (!boolEdit) {
            return
        }
        onClick && onClick()
    }

    return <View className={styles.main}>
        <View className={styles.content} onClick={() => NoDoublePress.onPress(() => onClickItem())} >
            <View className={styles.content_a}>
                <Text className={styles.title_a} ><Text style={{ color: 'red' }} >{boolWrite ? '*' : ''}</Text>{title}</Text>
                <Text className={styles.title_b} >{title_second}</Text>
            </View>
            <View className={styles.img}>
                <Image className={styles.img} src={ImageKeys.ic_arrow} />
            </View>
        </View>
        {boolShowLine ? <LineView type={2} /> : <View />}
    </View>

})

/**
 * @参数
 * title-标题
 * boolShowLine-是否展示底部横线 默认展示
 * boolEdit-是否可编辑 默认可编辑
 * boolWrite 是否展示必填项标志*  默认不展示
 * title_second 第二标题内容
 * onClick
 * 
 */
export default React.memo(ColumnSelectArrow)