<template>
    <div class="contrainer" @click="toUserInfo">
        <div class="image-box">
            <img class="avatar" :src="userInfo.headImg" alt="" srcset="">
        </div>
        <span class="name" :class="{isMe:own}">{{ userInfo.nickName }}</span>
    </div>
</template>

<script>
import serivce from "@/api/user"
export default {
    name: 'user',
    data() {
        return {
            userInfo: {
                userId: 0,
                headImg: '',
                nickName: ''
            }
        }
    },
    props: ['userId','disclickAble'],
    computed: {
        own(){
            return this.$store.state.userInfo.userId === this.userId
        }
    },
    components: {},
    created() {
        serivce._getUserInfo({ userId: this.userId }).then(res => {
            this.userInfo.userId = res.data[0].user_id
            this.userInfo.headImg = res.data[0].headImg
            this.userInfo.nickName = res.data[0].nickname
        })
    },
    mounted() {

    },
    methods: {
        toUserInfo(){
            if (Boolean(this.disclickAble)) {
                return        
            }
            event.stopPropagation()
            // this.$router.push({
            //     name:`userInfo`,
            //     query:{
            //         userId:this.userId
            //     }
            // })
            this.$router.push({
                path:`/userInfo/${this.userId}`,
                // query:{
                //     userId:this.userId
                // }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.contrainer {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 70%;
    height: 100%;
    line-height: 100%;
    font-size: 1em;
    padding-left: 5%;

    .image-box {
        max-width: 25%;
        // flex: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .avatar {
            max-width: 100%;
            max-height: 100%;
            object-fit: scale-down;
            border-radius: 5%;
        }
    }



    .name {
        flex: 3;
        padding-left: 0.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .isMe{
        color:#f881a8
    }
}
</style>
