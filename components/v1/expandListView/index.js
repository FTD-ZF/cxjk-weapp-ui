import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'


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
                    <Image className={styles.img} src='https://raw.githubusercontent.com/FTD-ZF/cxjk-weapp-ui/main/components/assets/images/icon_blue_up.png' />
                </View> : <View className={styles.top_right} >
                    <Text className={styles.title_up} >展开</Text>
                    <Image className={styles.img_a} src='https://raw.githubusercontent.com/FTD-ZF/cxjk-weapp-ui/main/components/assets/images/ic_blue_down.png' />
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
 * 
 * title-标题
 * 
 * boolShowRight-是否开启展开收起功能，默认开启
 * 
 * boolUp-判定展开收起布局
 * 
 * clickDown-点击展开收起
 * 
 * @list数据格式
 * ```
 *   expandList: [{ name: '测试1', select: false, list: [{ name: '1' }, { name: '2' }] },
            { name: '测试2', select: false, list: [{ name: '2' }, { name: '2' }] }],
 * ```
 * 
 * @example
 * ```
 *  <ExpandListView title={'标题(ExpandListView)无展开'} boolShowRight={false} />
 *     
 * ```
 * ```
 *              {
                        expandList && expandList.map((item, index) => {
                            return <ExpandListView key={index} title={'标题(ExpandListView)'} boolUp={item.select} clickDown={() => this.clickDown(index)} >
                                {
                                    item.list && item.list.map((item2, index2) => {
                                        return <View className={styles.item} key={index2} >
                                            {item2.name}
                                        </View>
                                    })
                                }
                            </ExpandListView>
                        })
                    }
 * ```
 * 
 */
export default React.memo(ExpandListView)