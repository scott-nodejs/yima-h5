<template>
    <section class="user-setting-lay layout-content"
             id="user-setting-profile">
      <div class="container box-container">
        <div class="row">

          <div class="col-2">
            <div class="user-setting-aside client-card">
              <h2 class="title"><i class="el-icon-setting"></i>设置</h2>
              <ul class="setting-tap-list">
                <li>
                  <router-link :to='{name:"settingProfile"}'
                               class="dropdown-item">
                    <i class="el-icon-user-solid"></i>个人资料
                  </router-link>
                </li>
                <li>
                  <router-link :to='{name:"settingResetPassword"}'
                               class="dropdown-item">
                    <i class="el-icon-lock"></i> 密码修改
                  </router-link>
                </li>
                <li>
                  <router-link :to='{name:"settingVip"}'
                               class="dropdown-item">
                    <i class="el-icon-lock"></i> 升级会员
                  </router-link>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-8">
            <router-view />
          </div>
        </div>
      </div>

    </section>
  <!--article-list-lay layout-content end-->
</template>

<script>
export default {
  name: 'Setting',
  metaInfo () {
    return {
      title: '个人设置',
      htmlAttrs: {
        lang: 'zh'
      }
    }
  },
  created () {

  },
  computed: {

  },
  components: {
  }
}
</script>

<style scoped lang="scss">
.user-setting-lay.layout-content {
  .container{
    width: 100%;
    padding-right: 5px;
    padding-left: 5px;
    margin-right: auto;
    margin-left: auto;
  }
  .box-container {
    padding-bottom: 50px;
  }
  .row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -5px;
    margin-left: -5px;
  }
  .col-8 {
    -ms-flex: 0 0 66.666667%;
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-4 {
    -ms-flex: 0 0 33.333333%;
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding-right: 5px;
    padding-left: 5px;
  }
  .col-2 {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
    padding-right: 5px;
    padding-left: 5px;
  }
  .client-card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border-radius: 2px;
    // -webkit-box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    // box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropdown-item {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #606266;
    position: relative;

    &:hover {
      color: #303133;
      background-color: #e9e9eb;
    }

    input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  }

  .user-setting-aside {
    padding: 20px 0;
    .title {
      padding: 10px 20px;
      font-weight: bold;
      i {
        margin-right: 15px;
        font-size: 18px;
      }
    }
    .setting-tap-list {
      display: block;
      li {
        a {
          display: block;
          padding: 10px 20px;
          font-size: 14px;
          i {
            margin-right: 15px;
            font-size: 18px;
          }
          &:hover {
            color: #f46e65;
          }
          &.current-active {
            color: #f46e65;
          }
        }
      }
    }
  }
}
</style>
