import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'
import styles from './index.module.scss'
import LineView from '../lineView';

const ColumnInput = forwardRef((props, ref) => {

    const { title = '', placeholder = '请输入', onInput, type = 'text',
        boolShowLine = true, boolEdit = true, value = '', maxlength = 250,
        boolWrite = false, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >
        <View className={styles.content} >
            <Text className={styles.title_a} ><Text style={{ color: 'red' }} >{boolWrite ? '*' : ''}</Text>{title}</Text>
            <Input className={styles.title_b} placeholder={placeholder} onInput={(e) => onInput && onInput(e.detail.value)}
                type={type} value={value} disabled={!boolEdit} maxlength={maxlength} />
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
 * placeholder = '请输入' 
 * onInput
 * type = 'text'
 * value = ''
 * maxlength = 250
 */
export default React.memo(ColumnInput)