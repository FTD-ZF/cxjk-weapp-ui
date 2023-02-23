import { View, Image, Text, Input, } from '@tarojs/components'
import styles from './index.module.scss'

const ListBottomViewLoading = (props) => {

    const { title = '加载中' } = props;

    return <View className={styles.bottom_v} >
        <Text className={styles.bottom_v_txt} >{title}</Text>
        <View style={{ width: '10px', height: '1px' }} />
        <View className={styles.at_loading} >
            <View className={styles.at_loading__ring} />
            <View className={styles.at_loading__ring} />
            <View className={styles.at_loading__ring} />
        </View>
    </View>
}

export default ListBottomViewLoading