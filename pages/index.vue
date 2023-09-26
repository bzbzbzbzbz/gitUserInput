<template>
	<div class="index">
		<v-input
				placeholder="@"
				@fetch-data="getUsers"
				:data="users"
				:fetching="isFetching"
		/>
	</div>
</template>

<script>
import VInput from "../components/ui/VInput";

export default {
	name: 'index',
	data () {
		return {
			controller: null,
			users: null,
			isFetching: false
		}
	},
	components: {
		VInput
	},
	methods: {
		async getUsers (value) {
			value = value.replace(/\s+/, "")
			if (!value || value === '@') {
				this.users = null
				return
			}
			if (value.includes('@')) {
				value = value.replace('@', '')
			}
			try {
				if (this.controller) {
					this.controller.abort()
				}
				this.controller = new AbortController
				let signal = this.controller.signal
				this.isFetching = true
				fetch(`https://api.github.com/search/users?q=${value}`, { signal })
						.then(res => {
							return res.json()
						})
						.then(res => {
							this.users = res.items
							this.isFetching = false
							this.controller = null
						})
						.catch(e => {
							this.isFetching = false
							throw new Error(e)
						})
			}
			catch (e) {
				this.isFetching = false
				throw new Error(e)
			}
		}
	}
}
</script>

<style lang="scss">
.index {
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>