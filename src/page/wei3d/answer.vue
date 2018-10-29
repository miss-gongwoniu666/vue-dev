<template>
    <div class="answer">
        <div class="bg-wrap">
            <div class="bg"></div>
        </div>
        <!-- 初始slogan -->
        <div class="perspective">
            <div class="transform-style">
                <div class="slogan"></div>
            </div>
        </div>
        <!-- 类似dock动画  -->
        <div class="score-wrap">
            <!-- <ul class='score-example'>
                <li v-for='(item,index) in items' :data-index='formateindex(index)' @click="changeexample(index)">{{item}}</li>
            </ul> -->
            <ul class='score-main'>
                <li v-for="(list,index) in lists" :data-index="formateindex(index)" @click='changemain(index)'>{{list.day}}</li>
            </ul>
        </div>
        <div class="banner">
            <div class="banner-out">哈哈哈哈，啦啦啦啦啦，吧吧吧吧吧</div>      
            <div class="banner-in">哈哈哈哈，啦啦啦啦啦，吧吧吧吧吧</div>
        </div>
    </div>
</template>
<script>
export default {
    name:'answer',
    data(){
        return {
            selectample:0,
            lists: [
                {
                    day: '周一'
                },
                 {
                    day: '周二'
                },
                 {
                    day: '周三'
                },
                 {
                    day: '周四'
                },
                 {
                    day: '周五'
                },
                 {
                    day: '周六'
                }
            ],
            items: [
                123,124,125,126,127
            ]
        }
    },
    methods:{
        formateindex(index){
            console.log(index,this.selectample)
            return (this.selectample-index)+ 6;
        },
        // 点击记录点击索引
        changemain(index){
            this.selectample = index;
        }
    },
    created(){

    }
}
</script>

<style lang="scss">
@function rpx($size){
    $template: $size/100;
    @if(unit($template) == 'px'){
        @return $template /1px *1rem;
    }@else if(unit($template) == ''){
        @return $template;
    }@else {
        @return $size;
    }
}
.answer{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    height: 100vh;
    .bg-wrap{
        position: absolute;
        top: 0;
        left: 0;
        width: 2rem;
        height: 2rem;
        animation: circle_ani 8s infinite linear;
        transform-origin: 48% 40%;
        @keyframes circle_ani{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(360deg);
            }
        }
        .bg{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url(../../images/answer/ball1.png) center center no-repeat;
            background-size: contain;
            animation: circle_ani_reverse 8s infinite linear;
            @keyframes circle_ani_reverse{
                from{
                    transform: rotate(0deg);
                }
                to{
                    transform: rotate(-360deg);
                }
            }
        }
    }
    .perspective{
        perspective: 1000px;
        .transform-style{
            transform-style: preserve-3d;
            animation: slogan_ani 2s ease-in-out;
            @keyframes slogan_ani {
                0%,20%{
                    transform: rotateY(-90deg);
                }
                60%{
                    transform: rotateY(15deg);
                }
                85%{
                    transform: rotateY(-5deg);
                }
                100%{
                    transform: rotateY(0deg);
                }
            }
            .slogan{
                position: absolute;
                left: 50%;
                top: 1.5rem;
                margin-left: -2rem;
                width: 4.05rem;
                height: 1.9rem;
                background: url(../../images/answer/slogan_03.png) center center no-repeat;
                background-size: 100% 100%;

                // 3d效果
                transform: translateZ(80px);
                backface-visibility: hidden;
            }
        }
    }
    // score-main
    .score-wrap{
        position: absolute;
        top: 5rem;
        left: 50%;
        width: 7rem;
        height: 5rem;
        margin-left: -3.5rem;
        background: white;
        border-radius: .5rem;
        ul.score-example{
            position: absolute;
            top: .5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            height: 1rem;
            li{
                float: left;
                width: 0.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                border-radius: 50%;
                font-size: .24rem;
                background: greenyellow;
                color: white;
                &[data-index='5']{
                    background: pink;
                }
            }
        }
        ul.score-main{
            position: absolute;
            left: 15%;
            top: 1rem;
            width: 70%;
            height: 2rem;
            list-style: none;
            li{
                position: absolute;
                left: 0;
                top: 0;
                margin-left: -.35rem;
                width: 0.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                border-radius: 50%;
                font-size: .24rem;
                background-color: yellow;
                &:nth-of-type(2n){
                    background-color: pink;
                }
                transition: transform .3s ease-in-out;
                @for $i from 1 through 6 {
                    &:nth-of-type(#{$i}) {
                        left: ($i)*100%/7;
                    }
                    &[data-index="#{$i}"], &[data-index="#{12-$i}"] {
                        z-index: #{$i};
                    }
                    @if ($i!=6){
                         &[data-index='#{$i}']{
                            transform: translateX($i*.09rem);
                         }
                        &[data-index="#{12-$i}"]{
                            transform: translateX(-$i*.09rem);
                        }
                    }
                   
                }
                &[data-index='6']{
                    transform: scale(2.2);
                    transform-origin: center 80%;
                }
            }
        }
        
       
    }
    //banner
    .banner{
        position: absolute;
        left: 50%;
        top: 4rem;
        margin-left: -3.5rem;
        width: 7rem;
        height: .6rem;
        line-height: .6rem;
        background: white;
        color: red;
        font-size: .24rem;
        overflow: hidden;
        .banner-out{
            animation: right_ani infinite 10s linear;
                @keyframes right_ani {

                    to{
                        transform: translate(7rem);
                    }
                }
        }
        .banner-in{
            position: absolute;
            left: 0;
            top: 0;
            background: white;
            width: 100%;
            height: 100%;
            animation: right_ani infinite 10s linear;
                @keyframes right_ani {

                    to{
                        transform: translate(7rem);
                    }
                }
            &:after{
                position: absolute;
                left: 0;
                top: 0;
                content: '';
                width: 1rem;
                height: 100%;
                background: yellow;
                animation: right_ani_reverse infinite 10s linear;
                @keyframes right_ani_reverse {

                    to{
                        transform: translate(-7rem);
                    }
                }
            }
            
        }
       
    }   
}
</style>

