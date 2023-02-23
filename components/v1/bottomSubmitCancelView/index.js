import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, Textarea, } from '@tarojs/components'

import styles from './index.module.scss'
import NoDoublePress from '../../../utils/NoDoubleClick';


const BottomSubmitCancelView = forwardRef((props, ref) => {

    const { title_a = '删除', title_b = '保存', onClickDelete, onClickSave, } = props;

    useImperativeHandle(ref, () => ({

    }))

    return <View className={styles.main} >

        <View className={styles.content_delete} onClick={() => NoDoublePress.onPress(onClickDelete)} >
            {title_a}
        </View>
        <View className={styles.content} onClick={() => NoDoublePress.onPress(onClickSave)} >
            {title_b}
        </View>

    </View>

})
/**
 * 底部双按钮 取消 确定
 * @参数
 * title_a = '删除'
 * title_b = '保存'
 * onClickDelete
 * onClickSave, 
 */
export default React.memo(BottomSubmitCancelView)