<template>
  <view class="empty-data-cocntainer">
    <image src="/static/images/empty-data.png" class="img" />
    <view class="txt">暂无数据</view>
  </view>
</template>

<script>
export default {
  name: 'EmptyData',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.empty-data-cocntainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 35%;
  .img {
    width: 64px;
    height: 64px;
  }
  .txt {
    margin-top: $uni-spacing-col-sm;
    color: $uni-text-color-grey;
    font-size: $uni-font-size-base;
  }
}
</style>

