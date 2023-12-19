<template>
	<view><u-parse :content="explain || ''"></u-parse></view>
</template>

<script>
export default {
	data() {
		return {
			explain: '',
			group_id: 0
		};
	},
	onLoad(e) {
		this.group_id = e.group_id;
		this.getData();
	},
	methods: {
		getData() {
			let self = this;
			self._get(
				'plus.group.Group/detail',
				{
					group_id: self.group_id,
					longitude: 0,
					latitude: 0
				},
				res => {
					self.explain = res.data.detail.explain;
					console.log(self.explain)
				}
			);
		}
	}
};
</script>

<style></style>
