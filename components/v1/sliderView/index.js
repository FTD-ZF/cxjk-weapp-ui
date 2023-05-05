import { Text, View, Image, ScrollView, MovableArea, MovableView } from '@tarojs/components'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import Taro, { getCurrentInstance } from "@tarojs/taro";
import styles from './index.module.scss'


const SliderView = forwardRef((props, ref) => {

    const { sliderHeight = '100px', children, onDelClick, toRefreshData, } = props;

    const [list, setList] = useState([])

    const [moveAction, setmoveAction] = useState(false)

    useImperativeHandle(ref, () => ({
        toChangeData, toSetListData,
    }))

    //设置当前data数据
    const toSetListData = (data) => {
        setList(data)
    }

    const toChangeData = (key) => {
        let _lists = list
        _lists.map((_item, index, _lists) => {
            if (Number(_item.key) === Number(key)) {
                _lists.splice(index, 1);
            }
        });
        setList(_lists)
        toRefreshData()
    }

    const onTouchStartHandler = (event) => {
        const { item } = event.currentTarget.dataset;
        const { pageX } = event.changedTouches[0];
        let _lists = list;
        _lists.map(_item => {
            if (_item.key != item.key) {
                _item.x = 0;
            } else {
                _item.startX = pageX;
            }
        });
        setList[_lists]
    }

    const onHandleSlideOut = (event) => {

        if (!moveAction) {
            return;
        }
        const { pageX } = event.changedTouches[0];
        const { item } = event.currentTarget.dataset;
        const distance = pageX - item.startX;
        if (distance >= 0) {
            item.x = 0;
            item.slideOut = false;
        } else {
            item.x = -distance > 60 ? -180 : -distance;
            item.slideOut = -distance > 60;
        }
        let _lists = list;
        _lists.map(_item => {
            if (_item.key == item.key) {
                _item.x = item.x;
                _item.slideOut = item.slideOut;
                _item.startX = 0;
            }
        });
        setList(_lists)
        setmoveAction(false)

    }

    const onHTouchMoveHandler = (_event) => {

        if (!moveAction) {
            setmoveAction(true)
        }
    }

    const onDeleteItem = (event) => {
        console.log(event)
        console.log(event.currentTarget)
        event.stopPropagation();
        const { item } = event.currentTarget.dataset;

        onDelClick(item, Number(item.key))
    }

    const navigateToNextPage = (event) => {
        event.stopPropagation();
        const { item } = event.currentTarget.dataset;
        const _lists = list;
        let hasSlideOut = false;
        _lists.map(_item => {
            if (_item.slideOut) {
                hasSlideOut = true;
            }
            _item.x = 0;
            _item.slideOut = false;
            _item.startX = 0;
        });
        if (!hasSlideOut) {
            console.log(`跳转nextPage key ${item.key}`);
        } else {
            setList(_lists)
        }
    }

    return (
        <ScrollView>
            {list.map((item, index) => {
                return (
                    <MovableArea className={styles.movablearea} style={{ height: sliderHeight }} key={item.key}>
                        <MovableView
                            className={styles.movableview}
                            style={{ height: sliderHeight }}
                            damping={50} //阻尼系数
                            friction={20} //摩擦系数
                            onHTouchMove={onHTouchMoveHandler} //触摸动作开始-微信小程序
                            onTouchStart={onHTouchMoveHandler} //触摸动作开始-钉钉小程序
                            direction="horizontal" //movable-view 的移动方向
                            inertia={true} //movable-view 是否带有惯性
                            x={item.x} //定义 x 轴方向的偏移
                        >
                            <View
                                className={styles.content}
                                data-item={item}
                                onTouchStart={onTouchStartHandler}
                                onTouchEnd={onHandleSlideOut}
                                onClick={navigateToNextPage}>

                                {children(item, index)}

                            </View>
                            <View
                                className={styles.del}
                                data-item={item}
                                onClick={onDeleteItem} >
                                    
                                <Image src='https://raw.githubusercontent.com/FTD-ZF/cxjk-weapp-ui/main/components/assets/images/ic_del.png'
                                    className={styles.delimg} />
                                <Text className={styles.delTxt} >删除</Text>
                            </View>
                        </MovableView>
                    </MovableArea>
                )
            })}
        </ScrollView>

    )
})

/**
 * @侧滑删除组件
 * 
 * @参数
 * 
 * sliderHeight (MovableArea, MovableView 需要固定高度进行使用)
 * 
 * onDelClick 删除触发方法
 * 
 * @list数据格式
 * 
 * ```
 *  lists: [{
        key: "1",
        x: 0,
        startX: 0,
        slideOut: false
      }]
 * ```
 * 
 * @example
 * ```
 * 1.设置初始化数据   
 * this.sliderRef.toSetListData(sliderList)
 * 
 * 2.布局中使用
 *  <SliderView
        ref={ref => this.sliderRef = ref}
        onDelClick={(item, index) => this.delClick(item, index)}
        toRefreshData={() => this.setState({})} >
        {
            (item, index) => {
                return <View className={styles.sliderItem} >{item.name}</View>
            }
        }
    </SliderView>
 * 3.删除方法使用
    delClick(item, position) {
        this.sliderRef.toChangeData(position)
    }
    ```
 * 
 * 
 * 
 */
export default React.memo(SliderView)