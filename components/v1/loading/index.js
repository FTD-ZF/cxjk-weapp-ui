import React from 'react'
import { View, Image, } from '@tarojs/components'
import styles from './index.module.scss'


const Loading = (props) => {

    const { isLoading = false, mask = true,
        imgSource = 'https://raw.githubusercontent.com/FTD-ZF/cxjk-weapp-ui/main/components/assets/images/loading.gif' } = props;

    if (isLoading) {
        return <View className={mask ? styles.loading : styles.loading2}>
            <View className={mask ? styles.wm_loading_box : styles.wm_loading_box2}>
                <Image src={imgSource} className={styles.wm_loading_img} />
            </View>
        </View>
    } else {
        return <View />
    }
}

/**
 * @参数
 * isLoading 是否显示loading
 * mask是否防止触摸穿透(模块化部分加载时使用:false)
 * imgSource -默认gif图案
 */
export default React.memo(Loading)
