<template>
    <el-result
      status="404"
      title="404"
      icon="warning"
      sub-title="抱歉，您访问的页面不存在"
      style="scale: 1.5;pointer-events: none;"
    />
    <el-button type="primary" @click="$router.push('/')" style="margin-top: 20px;" size="large">返回首页</el-button>
</template>
<style scoped>
  .not-found{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>