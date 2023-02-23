import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { View, Image, Text, Input, } from '@tarojs/components'

import styles from './index.module.scss'
import LineView from '../lineView'


const SelectRadius = () => {
    return <View className={styles.ra_a} >
        <View className={styles.ra_b} />
    </View>
}

const UnSelectRadius = () => {
    return <View className={styles.ra_c} />
}

const ColumnSelect = forwardRef((props, ref) => {

    const { title = '', boolShowLine = true, getSelectStatus, boolEdit = true, boolWrite = false,
        select_left_txt = '男', select_right_txt = '女', } = props;

    const [selectStatus, setSelectStatus] = useState('-1')

    useImperativeHandle(ref, () => ({
        toSetSelectStatus,
    }))

    const onClickSelect = (type) => {
        if (!boolEdit) {
            return
        }
        setSelectStatus(type)
        getSelectStatus && getSelectStatus(type)
    }

    const toSetSelectStatus = (type) => {
        setSelectStatus(type)
    }

    return <View className={styles.main} >
        <View className={styles.content} >
            <Text className={styles.title_a} ><Text style={{ color: 'red' }} >{boolWrite ? '*' : ''}</Text>{title}</Text>
            <View className={styles.item} >
                <View className={styles.item_a} onClick={() => onClickSelect(0)} >
                    {selectStatus == '-1' ? <UnSelectRadius /> :
                        selectStatus != '1' ? <SelectRadius /> : <UnSelectRadius />}
                    <Text className={styles.title_c}>{select_left_txt}</Text>
                </View>
                <View style={{ width: '36px' }} />
                <View className={styles.item_a} onClick={() => onClickSelect(1)}>
                    {selectStatus == '-1' ? <UnSelectRadius /> :
                        selectStatus == '1' ? <SelectRadius /> : <UnSelectRadius />}
                    <Text className={styles.title_c}>{select_right_txt}</Text>
                </View>
            </View>
        </View>
        {boolShowLine ? <LineView type={2} /> : <View />}
    </View>

})


/**
 * @参数
 * title-标题
 * boolShowLine 是否展示底部横线 默认展示
 * boolEdit 是否可编辑 默认可编辑
 * boolWrite 是否展示必填项标志*  默认不展示
 * select_left_txt 展示左边选择文本
 * select_right_txt 展示右边选择文本
 * getSelectStatus 获取选择值
 */
export default React.memo(ColumnSelect)