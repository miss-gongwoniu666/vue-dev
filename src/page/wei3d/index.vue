<template>
    <div class="wei3d">
          <!-- 旋转动画 -->
        <div class="xuanzhuan">
            <div class="perspective">
                <div class="transform-style wei3d-wrap1">
                    <div class="logo"></div>
                    <div class="slogan1"></div>
                    <div class="slogan2"></div>
                </div>
            </div>
        </div>
        <!-- 灯笼摇摆 -->
        <div class="lantern"></div>
        <div class="car">
            <div class="car1"></div>
            <div class="car2"></div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'home',
    components: {
    },
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
    .wei3d{
        position: absolute;
		left: 0;
		top: 0;
		width: 100%;
        height: 100%;
         background: url(../../images/wei3d/bg.jpg) no-repeat; 
        background-size: 100% 100%;

    }
   // wei3d动画效果
    .xuanzhuan{
        position: relative;
        width: 100%;
        height: 4rem;
        &:after{
            position: absolute;
            right: 0;
            top: 100%;
            content: '';
            width: 3.68rem;
            height: 2.13rem;
            background: url(../../images/wei3d/tree.png);
            background-size: contain;
        }
        .perspective{
            perspective: 1000px;
            .transform-style{
                transform-style: preserve-3d;
                &.wei3d-wrap1{
                        position: relative;
                    animation: wei_ani 1.8s forwards;
                    @keyframes wei_ani{
                        0%,20%{
                            transform: rotateY(-90deg);
                        }
                        76%{
                            transform: rotateY(10deg);
                        }
                        90%{
                            transform: rotateY(10deg);
                        }
                    }
                }
                >div{
                    backface-visibility: hidden;
                }
                .logo{
                    position: absolute;
                    left: 50%;
                    top: .2rem;
                    margin-left: -1.6rem;
                    width: 3.2rem;
                    height: 1rem;
                    background: url('../../images/wei3d/logo.png') center center no-repeat;
                    background-size: 100% 100%;
                    transform: translateZ(80px);
                }
                .slogan1{
                    position: absolute;
                    left: 50%;
                    top: 1.2rem;
                    margin-left: -2.5rem;
                    width: 5rem;
                    height: 2.8rem;
                    background: url('../../images/wei3d/slogan.png') center top no-repeat;
                    background-size: 100% 100%;
                    transform: translateZ(90px);

                }
                .slogan2{
                        position: absolute;
                    left: 50%;
                    top: 1.2rem;
                    margin-left: -2.5rem;
                    width: 5rem;
                    height: 2.8rem;
                    background: url('../../images/wei3d/slogan02.png') center bottom no-repeat;
                    background-size: 100% 100%;
                    transform: translateZ(70px);

                }
            }
        }
    }
    // 灯笼摇摆
    .lantern {
        margin-left: 4.5rem;
        margin-top: 1.5rem;
        width: 2rem;
        height: 1.72rem;
        background: url(../../images/wei3d/glim.png) center center no-repeat;
        background-size: 100% 100%;
        animation: lantern_ani 2.2s infinite ease-in-out;
        @keyframes lantern_ani {
            0%, 100%{
                transform: rotateZ(0);
                transform-origin: top center;
            }
            50%{
                transform: rotateZ(-15deg);
                transform-origin: top center; 
            }
        }
    }
    // car
    .car{
       margin: 0 auto;
       width:  6.75rem;
       height: 5rem;
       position: relative;
       transform: scale(.2,.2);
       animation: car_ani 1s forwards;
       @keyframes car_ani {
           to{
               transform: scale(1,1);
           }
       }
       .car1{
           position: absolute;
           left: 50%;
           top: 0;
           margin-left: -3.375rem;
           width: 6.75rem;
           height: 2.45rem;
           background: url(../../images/wei3d/car01.png) no-repeat;
           background-size: contain;
       }
       .car2{
           position: absolute;
           left: 50%;
           top: 2rem;
           margin-left: -3.375rem;
           width: 6.75rem;
           height: 3.12rem;
           background: url(../../images/wei3d/car02.png) no-repeat;
           background-size: contain;

       } 
    }
</style>