import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'
import styles from './index.module.scss'


const LineView = forwardRef((props, ref) => {

    const { type = 1, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={type == '3' ? styles.line_mar32 : type == '2' ? styles.line_marleft32 : styles.line} />

})

/**
 * @参数
 * 
 * type 1-正常线 2-左边距离32 3-左右边距离32
 * 
 */
export default React.memo(LineView)