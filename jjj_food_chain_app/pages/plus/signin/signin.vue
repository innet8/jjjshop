<template>
	<view :data-theme='theme()' :class="theme() || ''">
		<view class="signin-container theme-bg" v-if="!loadding">
			<view class="sigin-title d-c-c"><text>签到有礼</text></view>
			<view class="sign-main">
				<view class="sign-main-bg theme-bg">
					<view class="sign-head f28">
						<view class="small" v-if="reward.length > 0 && reward[0] >= 1">
							(再签到
							<text class="p-0-10 white fb">{{ reward[0] }}</text>
							天可得到
							<text class="p-0-10 white fb">{{ point[reward[0]] }}</text>
							积分)
						</view>
						<view class="small" v-if="reward.length > 0 && reward[0] == 1 && !is_sign">(今天签到即可得到额外奖励)</view>
					</view>
					<view class="sign-calendar-wrap">
						<view class="date-text dominant">{{ today_year }}年{{ today_month }}月</view>
						<view class="week-list">
							<view class="week-item" v-for="(item, index) in weeklist" :key="index">{{ item }}</view>
						</view>
						<view class="date-list-wrap">
							<view class="date-item" :class="item.type != 0 ? 'secondary-date-item' : ''" v-for="(item, index) in daylist" :key="index">
								<text v-if="list.indexOf(item.day) > -1 && item.type == 0" class="icon-box theme-bg">{{ item.day }}</text>
								<template v-if="list.indexOf(item.day) == -1">
									<text class="iconfont icon-libao dominant" v-if="reward.indexOf(item.day - today) > -1 && item.type == 0"></text>
									<view v-if="item.type == 0 && reward.indexOf(item.day - today) == -1">
										<text>{{ item.day }}</text>
									</view>
								</template>
							</view>
						</view>
					</view>
				</view>
				<view class="pt30 d-c-c f34 white">
					你已经累计签到
					<text class="p-0-10 white fb">{{ days }}</text>
					天
				</view>
				<view class="btns">
					<button class="shadowbtn" type="primary" @click="onSign" v-if="!is_sign">立即签到</button>
					<button v-else class="shadowbtn" type="primary">今日已签到</button>
				</view>
			</view>

			<!--活动规则-->
			<view class="rule-btn shadowbtn" @click="gotoRuleFunc">活动规则</view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				/*是否正在加载*/
				loading: true,
				/*星期*/
				weeklist: ['日', '一', '二', '三', '四', '五', '六'],
				/*天数列表*/
				daylist: [],
				/*年*/
				year: null,
				/*今天的年份*/
				today_year: null,
				/*月*/
				month: null,
				/*今天的年份*/
				today_month: null,
				/*天*/
				day: null,
				/*今天的年份*/
				today_day: null,
				/*当月签到的数据*/
				list: [],
				/*奖励天数*/
				reward: [],
				/*当月连续签到的天数*/
				days: 0,
				/*当天日期*/
				today: 0,
				/*今天是否签到*/
				is_sign: false,
				/*签到额外积分*/
				point: [],
				loadding: true
			};
		},
		mounted() {
			/*初始化*/
			this.init();

			/*获取优惠券列表*/
			this.getData();
		},
		methods: {

			/*获取数据*/
			getData() {
				let self = this;
				uni.showLoading({
					title: '加载中'
				});
				self._get('plus.sign.sign/index', {}, function(res) {
					self.list = res.data.list[0];
					self.days = res.data.list[1];
					self.today = res.data.list[2];
					self.reward = res.data.arr;
					self.point = res.data.point;
					if (self.list.indexOf(self.day) >= 0) {
						self.is_sign = true;
					}
					self.loadding = false;
					uni.hideLoading();
				});
			},

			/*签到*/
			onSign() {
				let self = this;
				if (self.is_sign) {
					uni.showToast({
						title: '今天已签到',
						duration: 2000
					});
					return false;
				}
				uni.showLoading({
					title: '正在提交',
					mask: true
				})
				self._get('plus.sign.sign/add', {}, function(res) {
					uni.hideLoading();
					self.showSuccess(res.data.msg, function() {
						self.getData();
					});
				});
			},

			/*初始化*/
			init() {
				if (this.year === null && this.month === null && this.day === null) {
					let nowDate = new Date();
					this.year = nowDate.getFullYear();
					this.today_year = nowDate.getFullYear();
					this.month = nowDate.getMonth();
					this.today_month = nowDate.getMonth() + 1;
					this.day = nowDate.getDate();
					this.today_day = nowDate.getDate();
				}
				this.joinDay();
			},

			/*组合天*/
			joinDay() {
				let res = [];
				let currentMonth = this.getMonthCount(this.year, this.month);
				let preMonth = this.getPreMonthCount(this.year, this.month);
				let nextMonth = this.getNextMonthCount(this.year, this.month);
				let whereMonday = this.getWeekday(this.year, this.month);
				let preArr = [];
				if (whereMonday != 0) {
					preArr = preMonth.slice(-1 * whereMonday);
				}
				let nextArr = nextMonth.slice(0, 42 - currentMonth.length - whereMonday);
				let preArrList = this.numConvertNode(preArr, 'pre');
				let currentMonthList = this.numConvertNode(currentMonth, null);
				let nextArrList = this.numConvertNode(nextArr, 'next');

				res = [].concat(preArrList, currentMonthList, nextArrList);
				this.daylist = res;
			},

			/*天数转换*/
			numConvertNode(arr, type) {
				let _type = 0;
				let list = [];
				let len = arr.length;
				if (type != null) {
					if (type == 'pre') {
						_type = -1;
					} else {
						_type = 1;
						if (len > 7) {
							len = len - 7;
						}
					}
				}

				for (let i = 0; i < len; i++) {
					let node = {
						type: _type,
						day: arr[i]
					};
					list.push(node);
				}
				return list;
			},

			/*判断是否闰年*/
			isLeapYear(year) {
				return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
			},

			/*获得每个月的日期有多少，注意 month - [0-11]*/
			getMonthCount(year, month) {
				let arr = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				let count = arr[month] || (this.isLeapYear(year) ? 29 : 28);
				return Array.from(new Array(count), (item, value) => value + 1);
			},

			/*获得某年某月的 1号 是星期几，这里要注意的是 JS 的 API-getDay() 是从 [日-六](0-6)，返回 number*/
			getWeekday(year, month) {
				let date = new Date(year, month, 1);
				return date.getDay();
			},

			/*获得上个月的天数*/
			getPreMonthCount(year, month) {
				if (month === 0) {
					return this.getMonthCount(year - 1, 11);
				} else {
					return this.getMonthCount(year, month - 1);
				}
			},

			/*获得下个月的天数*/
			getNextMonthCount(year, month) {
				if (month === 11) {
					return this.getMonthCount(year + 1, 0);
				} else {
					return this.getMonthCount(year, month + 1);
				}
			},

			/*跳转规则页面*/
			gotoRuleFunc() {
				this.gotoPage('/pages/plus/signin/rule/rule');
			}
		}
	};
</script>

<style lang="scss">
	.signin-container {
		position: fixed;
		top: var(--window-top);
		right: 0;
		bottom: 0;
		left: 0;
		overflow-y: auto;
	}

	.signin-container .sigin-title {
		padding-top: 40rpx;
		height: 200rpx;
		color: #ffe19f;
	}

	.signin-container .sigin-title text {
		font-size: 80rpx;
		font-weight: bold;
	}

	.signin-container .sign-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 1;
	}

	.signin-container .sign-main {
		margin: 45rpx;
	}

	.signin-container .sign-main-bg {
		border-radius: 20rpx;
		box-shadow: 0 10rpx 16rpx 0 rgba(0, 0, 0, .2);
	}

	.signin-container .sign-main .sign-head {
		padding: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #ffffff;
	}

	.signin-container .sign-main .sign-head .big {
		font-size: 30rpx;
	}

	.signin-container .sign-calendar-wrap {
		width: 100%;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 0.9);
		box-shadow: 0 -4rpx 8rpx 0 rgba(0, 0, 0, .1);
	}

	.sign-calendar-wrap .date-text {
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.sign-calendar-wrap .week-list {
		display: flex;
		justify-content: flex-start;
	}

	.sign-calendar-wrap .week-list .week-item {
		width: 94rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #999999;
		font-size: 28rpx;
		font-weight: bold;
	}

	.sign-calendar-wrap .date-list-wrap {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.sign-calendar-wrap .date-list-wrap .date-item {
		width: 94rpx;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		font-weight: bold;
	}

	.sign-calendar-wrap .date-list-wrap .date-item .icon-box {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		color: #FFFFFF;
	}

	.sign-calendar-wrap .date-list-wrap .date-item image {
		width: 60rpx;
		height: 60rpx;
	}

	.sign-calendar-wrap .date-list-wrap .date-item .iconfont {
		color: #ff5850;
		font-size: 50rpx;
		font-weight: 100;
	}

	.sign-calendar-wrap .date-list-wrap .secondary-date-item {
		color: #efe3c8;
	}

	.sign-main .btns {
		margin-top: 40rpx;
		padding: 0 20rpx 40rpx;
	}

	.sign-main .btns button {
		height: 100rpx;
		line-height: 100rpx;
		text-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.3);
		border-radius: 50rpx;
		font-size: 36rpx;
		box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, 0.1);
		color: #ffe4e2;
	}

	.rule-btn {
		position: fixed;
		top: calc(var(--window-top) + 30rpx);
		padding: 0 20rpx 0 30rpx;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		border-radius: 40rpx 0 0 40rpx;
		color: #ffffff;
		right: 0;
		z-index: 1;
		text-shadow: 0 0 8rpx 0 rgba(0, 0, 0, 0.3);
		box-shadow: 0 10rpx 20rpx 0 rgba(0, 0, 0, 0.1);
	}

	.shadowbtn {
		background-color: #1aad19;
		background: linear-gradient(to left, rgba(0, 0, 0, 0.15) 100%, rgba(255, 255, 255, 0.5) 100%);
	}

	.signin-container .btns .iconfont {
		font-size: 40rpx;
		color: yellow;
	}
</style>
