<!--  -->
<template>
	<div class="container">
		<div class="markdown-body">
			<!-- 页面使用，不支持ssr，需要用client-only包裹，低版本是no-ssr标签，article_content为接口获取的markdown内容，想看配置请查看文档 -->
			<client-only>
				<mavon-editor v-model="blog.content" :subfield="false" defaultOpen="preview" :toolbarsFlag="false" :ishljs="true" codeStyle="agate" />
			</client-only>
		</div>
	</div>
</template>

<script >
export default {
	data() {
		return {};
	},
	mounted() {},
	methods: {},
	components: {},
	async asyncData({ app, params, query, store, route }) {
		let blog = {};
		await app.$axios.get(`/github/gists/${params.id}`).then(res => {
			let result = res.data;
			for (let key in result.files) {
				blog["title"] = key;
				blog["content"] = result.files[key]["content"];
				blog["description"] = result["description"];
				blog["createTime"] = app.util.utcToLocal(result["created_at"]);
				blog["updateTime"] = app.util.utcToLocal(result["updated_at"]);
				break;
			}
		});
		return { blog: blog };
	}
};
</script>

<style scoped lang='scss'>
.v-note-wrapper {
	z-index: 0;
}
</style>