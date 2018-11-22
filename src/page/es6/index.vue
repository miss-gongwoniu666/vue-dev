<script>
import loayLoad from '../../components/js/lazy-load.js';
export default {
  name: 'es6',
  data() {
    return {
      arr: [1, 3, 'ab', 'ac', 'ad', 'ae'],
      imgSrc: ['http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1301/05/c0/17135331_1357355776882.jpg',
      "http://file03.16sucai.com/2017/1100/16sucai_p20161106032_0c2.JPG",
      "http://pic1.win4000.com/wallpaper/2/58b61f7dc6c1d.jpg",
      ]
    }
  },
  created() {
    this.addFunction();
    this.promiseFunction().then(()=>{
      this.total();
    });
    //generator调用
    this.generatorFunction();
    //async
    this.generatorAsync();
    
  },
  mounted(){
    new loayLoad('img');
  },
  methods: {

    addFunction() {
      console.log('数组arr是否包含af字段', this.arr.includes('af'));
      let a = 4;
      console.log(a **= 2);
    },
    //promise 测试demo
    promiseFunction() {
     return new Promise(resolve => {
        this.getA();
        resolve()
      });
    },
    getA() {
      this.a = 66;
      
    },
    total(){
      console.log(this.a+3);
    },
    // generator方法
    generatorFunction(){
      function* generatorfn(){
        yield 'hello';
        yield 'world';
        return 'ending';
      }
      let a = generatorfn();
      a.next();
      console.log(a.next());
      console.log(a.next())
    },
    // async
    generatorAsync(){
      // async function fn(){
      //   console.log(this)
      //   let p1 = await this.getA();
      //   console.log(p1,'p1')
      //   let p2 = await this.total();
      //   console.log(p2,'p2')
      // }
      // fn();
     
    }
  }
}
</script>
<template>
<div class="imgs">
  <img alt="" :data-src='item' :key='index' v-for='(item,index) in imgSrc'>
</div>
</template>
<style lang="scss" scoped>
.imgs{
  width: 100%;
  min-height: 100%;
  img{
    width: 100%;
    height: 3em;
    background: url('../../images/loading.gif') center center no-repeat;
  }
}
</style>



