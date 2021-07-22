import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { printCommon } from '../common'
import { printTool } from '../common/tools'
import TaroStatusBar from '../components/status-bar'
import TaroBase from "../../../../taroCwx/base"

export default class Index extends TaroBase {
  componentDidMount () {
    printCommon()
    printTool()
  }

  render () {
    return (
      <View className='index'>
        <Text>Page foo</Text>
        <TaroStatusBar></TaroStatusBar>
      </View>
    )
  }
}
