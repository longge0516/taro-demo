import React from 'react'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'

export default class Index extends React.Component {
  state = {
    show: true,
    businessParams: {
      channelId: 5,
      siteId: 0,
      source: "THINGS_TODO",
      productId: 18337618,
      pageId: "666666"
    }
  }

  openCoupon = () => {
    this.setState({
      show: true
    })
  }

  onClose = () => {
    this.setState({
      show: false
    })
    console.log("coupon is close")
  }

  onLoadData(e) {
    console.log("loaddata is====", e.detail)
  }

  render() {
    return (
      <View className='coupon'>
        <View className='wrapper'>
          <Button type='primary' onClick={this.openCoupon} >打卡领券弹窗</Button>
        </View>
        <claim-coupon visible={this.state.show} businessParams={this.state.businessParams} onClose={this.onClose} onLoadData={this.onLoadData} ></claim-coupon>
      </View>
    )
  }
}
