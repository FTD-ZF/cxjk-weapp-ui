import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'
import NoDoublePress from '../../../utils/NoDoubleClick';

const SearchBar = forwardRef((props, ref) => {

    const { placeholder = '请输入搜索内容', onConfirm, value = '', } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >

        <View className={styles.content} >
            <Image className={styles.img} src='https://raw.githubusercontent.com/FTD-ZF/cxjk-weapp-ui/main/components/assets/images/ic_search.png'/>
            <Input className={styles.input} placeholder={placeholder} value={value}
                onConfirm={(e) => NoDoublePress.onPress(() => onConfirm(e.detail.value))} />
        </View>
    </View>

})

/**
 * @搜索框布局
 * 
 * @参数
 * 
 * placeholder = '请输入搜索内容'
 * 
 * onConfirm
 * 
 * value = ''
 * 
 * @example
 * ```
 *  <SearchBar value={searchKey} onConfirm={(e) => this.onSearchConfirm(e)} />
 * ```
 * 
 */
export default React.memo(SearchBar)