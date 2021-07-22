import React from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import TaroBase from "../../taroCwx/base"

export default class Index extends TaroBase {
  componentDidMount () {
    // logRaw()
    console.log(1111111);
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
