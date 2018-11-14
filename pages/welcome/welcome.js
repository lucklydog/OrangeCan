Page({
  onTapJump:function(event){
    /**redirectTo 将关闭当前页面
     * navigateTo 保留当前页面
     * switchTo 只能用于跳转到带tabbar的页面
     */
      wx.navigateTo({
        url:"../posts/posts",
        success:function(){
          console.log("jump success")
        },
        fail:function(){
          console.log("jump fail")
        },
        complete:function(){
          console.log("jump complete")
        }
      })
  }
})