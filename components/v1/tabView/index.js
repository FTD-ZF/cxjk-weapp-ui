import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'


const TabView = forwardRef((props, ref) => {

    const { list = [], onClick, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >

        {
            list && list.map((item, index) => {
                return <View className={styles.item} key={index} onClick={() => onClick(index)} >
                    <Text className={item.select ? styles.txt_active : styles.txt_default} >{item.name}</Text>
                    <View className={item.select ? styles.line : styles.line_a} />
                </View>
            })
        }
    </View>

})


/**
 * @切换布局
 * 
 * @list数据格式
 * 
 * ```
 * tabList: [{ name: '切换一', select: true }, { name: '切换二', select: false }, { name: '切换三', select: false }]
 * ```
 * 
 * @example
 * 
 * ```
 *  <TabView list={tabList} onClick={(index) => this.toTabClick(index)} />
 * ```
 */
export default React.memo(TabView)