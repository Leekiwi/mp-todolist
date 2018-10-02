Page({
  onReady() {
    // 调用接口
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
        })
      },

    })
  }
})
