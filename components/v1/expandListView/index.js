import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'
import { ImageKeys } from '../../assets';


const ExpandListView = forwardRef((props, ref) => {

    const { title = '', boolShowRight = true, boolUp = false, clickDown, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >
        {/* 展开点击 */}
        <View className={styles.top} onClick={() => clickDown && clickDown()} >
            <View className={styles.top_left} >
                <View className={styles.line_a} />
                <Text className={styles.name} >{title}</Text>
            </View>

            {
                boolShowRight ? boolUp ? <View className={styles.top_right}  >
                    <Text className={styles.title_up} >收起</Text>
                    <Image className={styles.img} src={ImageKeys.ic_blue_up} />
                </View> : <View className={styles.top_right} >
                    <Text className={styles.title_up} >展开</Text>
                    <Image className={styles.img_a} src={ImageKeys.ic_blue_down} />
                </View> : <View />
            }
        </View>
        {
            boolUp ? <View className={styles.content} >
                {
                    props.children
                }
            </View> : <View />
        }
    </View>

})

/**
 * @参数
 * title-标题
 * boolShowRight-是否开启展开收起功能，默认开启
 * boolUp-判定展开收起布局
 * clickDown-点击展开收起
 */
export default React.memo(ExpandListView)