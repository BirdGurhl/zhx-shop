<template>
  <div class="shopInfo">
    <div>
      <aside>
        <i class="el-icon-user-solid"></i>
      </aside>
      <aside>
        <span>用户数量</span>
        <p>32123</p>
      </aside>
    </div>
    <div>
      <aside class="moneyTitle">
        <svg
          t="1637755744114"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2413"
          width="48"
          height="48"
        >
          <path
            d="M463.3 958.3V772.1H228.8v-77.5h234.5v-80.5H228.8v-83.5H420L191.5 128h113.7L469 420.6c18.2 33.4 32.4 62.4 42.7 86.9 9-19.8 24.6-50.5 46.8-92.1L713.9 128h120.8L605.5 530.6h192.9v83.5H564.9v80.5h233.5v77.5H564.9v186.2H463.3z"
            p-id="2414"
            fill="#d81e06"
          ></path>
        </svg>
      </aside>
      <aside>
        <span>交易数额</span>
        <p>32123</p>
      </aside>
    </div>
    <div>
      <aside>
        <i class="el-icon-s-data t-2"></i>
      </aside>
      <aside>
        <span>商品数量</span>
        <p>32123</p>
      </aside>
    </div>
    <div>
      <aside>
        <i class="el-icon-question"></i>
      </aside>
      <aside>
        <span>用户反馈</span>
        <p>66</p>
      </aside>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// .fade1-leave {
//   opacity: 0;
// }
.shopInfo {
  display: flex;
  justify-content: space-between;
  width: 100%;

  > div {
    width: 22%;
    height: 108px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;

    > aside:first-child {
      width: 50%;
      > i {
        display: block;
        text-align: center;
        line-height: 108px;
        font-size: 45px;
        color: #44ccc5;
      }
      > span {
        display: block;
        text-align: center;
      }
    }

    > aside:last-child {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > span {
        color: #7b87a9;
        margin-bottom: 10px;
        font-size: 16px;
      }
      > p {
        color: #556574;
        font-size: 20px;
      }
    }
  }
}
.moneyTitle{
  display: flex;
  justify-content: center;
  align-items: center;
}
.t-1 {
  color: red !important;
}

.t-2 {
  color: #3CA4F6 !important;
}
.t-3 {
  color: red !important;
}
</style>
