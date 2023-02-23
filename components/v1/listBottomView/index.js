import React from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'


const ListBottomView = (props) => {

    const { title = '我是有底线的～', boolShow = false } = props;


    return <View className={styles.bottom_v} >
        {boolShow ? <View>
            <Text className={styles.title} >{title}</Text>
        </View> : <View />}
    </View>
}

/**
 * @参数
 * 
 * title
 * 
 * boolShow 是否展示布局 默认不展示
 * 
 */
export default React.memo(ListBottomView)
