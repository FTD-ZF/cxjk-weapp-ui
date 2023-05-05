import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'

const EmptyView = forwardRef((props, ref) => {

    const { title = '暂无任何内容', } = props;

    const [boolShow, setBoolShow] = useState(false)

    useImperativeHandle(ref, () => ({

    }))

    setTimeout(() => {
        setBoolShow(true)
    }, 1200);

    if (boolShow) {
        return <View className={styles.main} >
            <Image className={styles.img} src='https://raw.githubusercontent.com/FTD-ZF/cxjk-weapp-ui/main/components/assets/images/icon_empty.png' />
            <Text className={styles.txt}>{title}</Text>
        </View>
    } else {
        return <View />
    }
})

/**
 * 缺省页布局
 */
export default React.memo(EmptyView)