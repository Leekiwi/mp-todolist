Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    leftCount:0,
    list:[],
    index:0
  },
  //删除任务
  del(e){
   let id = e.currentTarget.dataset.id
   let index = this.data.list.findIndex(item=>item.id===id)
   this.data.list.splice(index,1)
   this.setData(this.data)
   this.setLeftCount()
   this.save()
  },
  change(e){
    let id = e.currentTarget.dataset.id
    let index = this.data.list.findIndex(item=>item.id===id)
    this.data.list[index].completed = !this.data.list[index].completed
    this.setData(this.data)
    this.setLeftCount()
    this.save()
  },
  toggleAll(e){
    let flag = this. data.list.every(item=>item.completed)
    this.data.list.forEach(item=>item.completed=!flag)
    this.setData(this.data)
    // console.log(flag)
    this.setLeftCount()
    this.save()
  },
  getName(e){
    this.data.name=e.detail.value
    this.setData(this.data)
  },
  add(){
    this.data.list.push({
      id:++this.data.index,
      name:this.data.name,
      completed:false
    })
    this.data.name=""
    this.setData(this.data)
    this.setLeftCount()
    this.save()
  },
  //保留未完成的任务,清除完成的
  clearCom(){
    this.data.list=this.data.list.filter(item=>!item.completed)
    this.setData(this.data)
    this.setLeftCount()
    this.save()
  },
  //动态修改leftCount
  setLeftCount(){
    //list中为完成的任务
    this.data.leftCount=  this.data.list.filter(item=>!item.completed).length
    this.setData(this.data)
  },
  save(){
    wx.setStorageSync('todos', this.data.list)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    //获取内存中的数据
    this.data.list=wx.getStorageSync('todos')||[]
    if(this.data.list.length>0){
    this.data.index = this.data.list[this.data.list.length - 1].id
    }else{
      this.data.index=0
    }
    this.setData(this.data)
    this.setLeftCount()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    wx.showToast({
      title:'刷新成功'

    }
    )
    setTimeout(function(){
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    },1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})