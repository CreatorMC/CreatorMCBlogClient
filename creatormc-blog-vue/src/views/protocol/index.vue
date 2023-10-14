<template>
  <div>
    <div class="main-container">
      <div class="seat"></div>
      <el-row :gutter="gutter">
        <el-col :sm="24" :md="16">
          <el-card class="body" shadow="never">
            <template #header>
              <h1>网站协议</h1>
            </template>
            <div>
              <strong>一、引言</strong>
              <p>
                本协议是您与本网站所有者之间的法律协议。在使用本网站提供的服务之前，请您仔细阅读本协议，确保您理解并同意其中的条款。注册使用本网站即表示您已同意遵守本协议。
              </p>
              <strong>二、服务使用</strong>
              <p>
                <ol>
                  <li>本网站旨在为您提供学习笔记、心得体会和个人作品展示等服务。您有权在遵守本协议的前提下使用这些服务。</li>
                  <li>您在使用本网站服务时，应遵守相关法律法规，不得发布或传播违法、不良信息。</li>
                  <li>用户在本站注册账号所有权归本站所有，用户仅享有使用权。本站有权随时回收，删除，封禁账号。</li>
                </ol>
              </p>
              <strong>三、知识产权</strong>
              <p>
                <ol>
                  <li>本网站上的所有内容，包括但不限于文字、图片、音频、视频等，均受版权保护。未经本网站所有者书面许可，禁止任何形式的复制、转载或使用。</li>
                  <li>您在使用本网站服务时，应尊重他人的知识产权，不得上传或分享侵犯他人版权的内容。</li>
                </ol>
              </p>
              <strong>四、隐私保护</strong>
              <p>
                <ol>
                  <li>本网站将严格遵守相关法律法规，保护您的个人隐私。</li>
                  <li>在使用本网站服务时，您应了解并同意，本网站可能会收集您的个人信息，以便提供更好的服务。这些信息将受到严格保护，未经您同意，不会向第三方泄露。</li>
                </ol>
              </p>
              <strong>五、免责声明</strong>
              <p>
                <ol>
                  <li>本网站提供的服务仅供参考，不保证信息的准确性、完整性和及时性。因使用本网站服务而导致的任何损失，本网站不承担任何责任。</li>
                  <li>本网站不承担因网络故障、系统维护等原因导致的服务中断或数据丢失等责任。</li>
                </ol>
              </p>
              <strong>六、协议修改</strong>
              <p>
                本网站有权随时修改本协议，并在修改后的协议中列明修改日期。修改后的协议一经公布，立即生效。如您继续使用本网站服务，即表示您已接受修改后的协议。
              </p>
              <strong>七、法律适用和争议解决</strong>
              <p>
                本协议适用中华人民共和国法律。因使用本网站服务而产生的争议，双方应首先通过友好协商解决；协商不成的，任何一方均有权向本网站所在地人民法院提起诉讼。
              </p>
              <strong>八、其他</strong>
              <p>
                <ol>
                  <li>本协议未尽事宜，由本网站所有者负责解释。</li>
                  <li>本协议自您使用本网站服务之日起生效，并具有法律效力。</li>
                </ol>
              </p>
            </div>
          </el-card>
        </el-col>
        <RightSideComponent />
      </el-row>
    </div>
    <ToTopComponent />
  </div>
</template>

<script>
import RightSideComponent from '@/components/content/index/RightSideComponent.vue';
import ToTopComponent from '@/components/utils/ToTopComponent.vue';
export default {
  data() {
    return {};
  },
  computed: {
    gutter() {
      return window.innerWidth <= 800 ? 5 : 30;
    }
  },
  components: { RightSideComponent, ToTopComponent }
}
</script>

<style lang="scss" scoped>
.body {
  position: relative;
  margin-bottom: 30px;
  h1 {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
  }
}
</style>