import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, Textarea, } from '@tarojs/components'

import styles from './index.module.scss'
import LineView from '../lineView';



const ColumnTextarea = forwardRef((props, ref) => {

    const { title = '', placeholder = '请输入', onInput,
        boolShowLine = false, boolShowTitle = true, maxlength = 250, boolEdit = true, value = '',
        boolWrite = false, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >
        <View className={styles.content} >
            {boolShowTitle ? <Text className={styles.title_a} ><Text style={{ color: 'red' }} >{boolWrite ? '*' : ''}</Text>{title}</Text> : <View />}
            <View className={styles.content_a} >
                <Textarea className={styles.input} placeholder={placeholder} value={value} onInput={(e) => onInput(e.detail.value)}
                    maxlength={maxlength} disabled={!boolEdit} />
            </View>
        </View>
        {boolShowLine ? <LineView type={2} /> : <View />}
    </View>

})

/**
 * @参数
 * 
 * title-标题
 * 
 * boolShowTitle 是否展示标题布局 默认展示
 * 
 * boolShowLine-是否展示底部横线 默认展示
 * 
 * boolEdit-是否可编辑 默认可编辑
 * 
 * boolWrite 是否展示必填项标志*  默认不展示
 * 
 * placeholder = '请输入'
 * 
 * onInput,maxlength = 250
 * 
 * value = ''
 * 
 * @example
 * ```
 * <ColumnTextarea title={'多行输入文本标题(ColumnTextarea)'} boolWrite={true} 
 *                  boolShowLine={true} onInput={(e) => this.onInputB(e)} />
 * ```
 * 
 */
export default React.memo(ColumnTextarea)