<template>
  <div>
    <div class="main-container">
      <div class="seat"></div>
      <el-row :gutter="gutter">
        <el-col :sm="24" :md="16">
          <el-card class="body" shadow="never">
            <template #header>
              <h1>关于我</h1>
            </template>
            <div>
              <p>
                <strong>我是谁？</strong><br>
                &emsp;&emsp;芸芸众生中的普通一人，仅此而已。<br><br>
                <strong>我的经历？</strong><br>
                &emsp;&emsp;小学的时候，我喜欢玩迷宫、积木等，我仍然记得我那时候买过的书，内容多是迷宫等益智类的内容。当然，我和那时候的多数同龄人一样，也喜欢看《阿衰》之类的四格漫画书。关于计算机，我很幸运，在当时的小学就有计算机课程，教的内容是Photoshop（我现在还在用这个软件，当然，版本早已更新换代了），当时的Ps界面看起来非常简单，工具栏和画布是分离的。那时候，家里还有一台电脑，虽然在当时那台电脑都算老的了（亲戚换下来不用的），一些像《穿越火线》之类的3D游戏都玩不了，但它创造了让我接触计算机的机会。那时候的我还不知道“编程”这个词，只是单纯的玩游戏而已。现在看到小学生都在学Python，不由得感叹时代的变化。<br><br>
                &emsp;&emsp;初中时，智能手机渐渐普及，但是家里比较穷，没钱买。忘了是什么时候了，有天我妈说移动还是联通来着搞活动，花100元能买iPhone4s（在当时，iPhone4s已属于老旧机型了），不过要办一个套餐，其实就相当于分期买手机了，然后我就有了我的第一部智能手机。之后，我了解到了《Minecraft》这个游戏，于是就在手机上下载了一个（当时没钱买正版游戏，从网上找的盗版。当然，现在已经有正版了）。我被这个完全自由创作的世界所吸引，开始了自己的创作。后来，我就以“创造者MC”的身份在百度贴吧开始活跃，玩别人制作的地图存档、模组等，并且尝试自己制作。在这个时期，我掌握了游戏里的命令，并尝试了模组制作，开始写点代码（当时其实写的是json，算不上编程）。我认为这是我走上编程之路的开端。还有一个点忘了说，初中时的信息技术课教了VB，这算是我接触的第一个编程语言。我初中时有个叫“会考”的考试，考一些科目的基础知识，我依然记得所有的科目中，只有信息技术我是A，其他都是B、C之类的。<br><br>
                &emsp;&emsp;高中时，在学习上我表现出了对理科的天赋，在没有老师单独指导的情况下，能够理解的比别人快，还成为了班里的“理科状元”。但与之相反的是，文科比较差，尤其是英语，差的一塌糊涂......。高中时有一段时间让我感到很迷茫，在学校里混日子过，想着能过一天是一天。我是住校生，学校要求每两个星期才能回家一次，不能带手机等电子设备来学校，这也意味着我不能把时间用在我喜欢做的事上，每天只能在教室里学习那些课程，只因为了分数......。那段时间感觉是我活到现在最难熬的一段时光，每天看学校都跟监狱一样，天天数着还有几天就能回家，不过好在我并没有出心理问题......。对于我喜欢的事物，我会主动去钻研学习。高中我自学了Ps、Ae、Pr、Au（学这些是为了做Minecraft的作品），还学了HTML、C语言。<br><br>
                &emsp;&emsp;到了大学，我对编程这件事豁然开朗，做Minecraft模组的技术也有了飞跃般的提升，忽然就对以前一些没有理解的东西理解了，这时我感觉自己被解放了，仿佛获得了新生一样。但是大一的课程还是很让我失望的，没有用的非专业课一堆，乱七八糟的活动对我来说也没有吸引力，我只想坐在电脑前敲代码。后来我逐渐发现，大学里教的技术太浅，或者太旧，无法满足我的要求，学了一年了，连个网站怎么搭建起来都不教，而且理论大于实践。我终于发现，想要满足自己，还是得靠自学。<br><br>
                <strong>我的爱好？</strong><br>
                &emsp;&emsp;我的爱好并不多，除了编程之外，我还喜欢看番、听电子音乐、玩MC、红警、音游等。最近不怎么看番了，很少有喜欢的，最近（2023年9月21日）一次看的应该是《孤独摇滚》。电子音乐的话，我涉猎的风格还是比较多的。常听的有Techno、HardStyle、HardCore、Trance、Bigroom、Progressive House、Electro House、Future Bounce、Future Rave。我喜欢在写代码的时候听这些音乐。我还没有去过电音节，希望在有生之年能去一次，感受下现场气氛。作为一个土生土长的北方人，我是希望到南方去生活的，感觉南方无论是经济上还是思想上都比北方要开放，各种电音节、漫展之类的活动也多在南方举办，人们对文化的包容度更高。
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