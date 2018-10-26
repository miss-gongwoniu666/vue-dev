<template>
    <div class="answer">
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
                },
                 {
                    day: '周日'
                }
            ],
            items: [
                123,124,125,126,127
            ]
        }
    },
    methods:{
        formateindex(index){
            return (index-this.selectample)+5;
        },
        // 点击记录点击索引
        changeexample(index){
            console.log('change')
            this.selectample = index;
        },

        changemain(){
            console.log('lele')
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
                top: .5rem;
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
        top: 4rem;
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
            margin: 0 auto;
            width: 80%;
            height: 1rem;
            list-style: none;
            li{
                list-style: none;
                float: left;
                width: 0.7rem;
                height: .7rem;
                text-align: center;
                line-height: .7rem;
                border-radius: 50%;
                font-size: .24rem;
                background: url(../../images/answer/circle-right.png) no-repeat;
                background-size: 100% 100%;
                -webkit-transition: -webkit-transform .3s ease-in-out;
                transition: transform .3s ease-in-out;
                -webkit-transform-origin: center 80%;
                transform-origin: center 80%;
                @for $i from 1 through 6 {
                    &:nth-of-type(#{$i}) {
                        left: ($i)*100%/7;
                    }
                    &[data-index="#{$i}"], &[data-index="#{12-$i}"] {
                        z-index: #{$i};
                    }
                }
            }
        }
        
        .score-status-this {
            li {
                &[data-index="6"] {
                    -webkit-transform: scale((150/70));
                    transform: scale((150/70));
                }
                @for $i from 1 through 6 {
                    &:nth-of-type(#{$i}) {
                        left: ($i)*100%/7;
                    }
                    &[data-index="#{$i}"], &[data-index="#{12-$i}"] {
                        z-index: #{$i};
                    }
                    @if ($i!=6) {
                        &[data-index="#{$i}"] {
                            transform: translateX(rpx(-$i*9));
                            -webkit-transform: translateX(rpx(-$i*9));
                            span {
                                box-shadow: inset rpx(5) 0 rpx(2) rpx(0) rgba(0, 0, 0, .08);
                            }
                        }
                        &[data-index="#{12-$i}"] {
                            transform: translateX(rpx($i*9));
                            -webkit-transform: translateX(rpx($i*9));
                            span {
                                box-shadow: rpx(5) 0 rpx(2) rpx(0) rgba(0, 0, 0, .08);
                            }
                        }
                    }
                }
                &:nth-of-type(1) span, &:nth-of-type(6) span {
                    box-shadow: none;
                }
            }

        }
    }
    
}
</style>

