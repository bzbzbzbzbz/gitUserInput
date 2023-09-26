<template>
	<div
			class="v-input"
			:class="{__suggestions: showSuggestions && valueExist}"
	>
		<input
				type="text"
				class="v-input_item"
				:placeholder="placeholder"
				:class="{__suggestions: showSuggestions && valueExist}"
				v-model="value"
		>
		<img
				class="v-input_item_icon"
				src="@/assets/images/arrow.svg"
				@click="showSuggestions = !showSuggestions"
				:class="{
					__rotated: showSuggestions,
					__showed: valueExist
				}"
		>
		<transition name="fade">
			<img
					v-if="fetching"
					class="v-input_loader"
					src="@/assets/images/loader.png"
					alt=""
			>
		</transition>
		<transition name="fade">
			<div class="v-input_suggest" v-if="valueExist && showSuggestions">
				<div class="v-input_suggest_content">
					<p class="v-input_suggest_content_item" v-for="item in data" @click="value = item.login">
						@{{ item.login }}
					</p>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'VInput',
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		data: {
			type: Array
		},
		fetching: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		value () {

			this.$emit('fetch-data', this.value)
		}
	},
	computed: {
		valueExist () {
			return this.data && this.data.length
		}
	},
	data () {
		return {
			showSuggestions: true,
			value: ''
		}
	}
}
</script>

<style lang="scss">
.v-input {
	max-width: 260px;
	position: relative;
	border-radius: 4px;
	background: var(--c-white);
	display: flex;
	padding: 4px;
	align-items: center;
	gap: 4px;
	height: 24px;
	transition: all .3s ease;
	&:before {
		content: '';
		position: absolute;
		top: -1px;
		left: -1px;
		bottom: -1px;
		right: -1px;
		background: linear-gradient(to right, #FFC700, #A5E870);
		z-index: -1;
		border-radius: inherit;
	}
	&.__suggestions {
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	}
}
.v-input_item {
	padding: 0 4px;
	outline: none;
	border: none;
	color: var(--c-black);
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
}
.v-input_loader {
	width: 16px;
	height: 16px;
	animation: rotating 1s ease infinite;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	right: 32px;
	z-index: 3;
}
.v-input_item_icon {
	width: 24px;
	height: 24px;
	transform: rotateX(180deg);
	cursor: pointer;
	transition: transform .3s ease, opacity .3s ease;
	opacity: 0;
	pointer-events: none;
	&.__rotated {
		transform: rotateX(0deg);
	}
	&.__showed {
		opacity: 1;
		pointer-events: all;
	}
}
.v-input_suggest {
	position: absolute;
	bottom: 0;
	left: -1px;
	right: -1px;
	transform: translateY(100%);
	background: linear-gradient(to right, #FFC700, #A5E870);;
	max-height: 300px;
	overflow: hidden;
	display: flex;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	z-index: -1;
}
.v-input_suggest_content {
	background: var(--c-white);
	margin: 1px;
	overflow-y: auto;
	width: 100%;
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	&::-webkit-scrollbar {
		width: 7px;
	}
	&::-webkit-scrollbar-thumb {
		background: #26262680;
		border: solid 2px var(--c-white);
		border-radius: 4px;
	}
}
.v-input_suggest_content_item {
	padding: 5px 8px;
	background: var(--c-white);
	transition: background-color .3s ease;
	overflow-wrap: break-word;
	line-height: 120%;
	&:hover {
		background: var(--c-orange);
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

@keyframes rotating {
	from {
		transform: translateY(-50%) rotate(0);
	}
	to {
		transform: translateY(-50%) rotate(360deg);
	}
}
</style>