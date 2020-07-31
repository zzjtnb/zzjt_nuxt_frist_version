<!--  -->
<template>
	<div class="ml-5 mr-5 mt-5">
		<b-row cols-sm="1" cols-md="2" cols-lg="4" align="center">
			<b-card-group v-for="(item,index) in blogList.blogs" :key="index">
				<b-card no-body class="shadow m-1">
					<div class="card img-fluid" @click="goDetails(item.id)">
						<b-card-img-lazy src="http://static.blinkfox.com/20181124-design.jpg" blankColor="#bbb" style="opacity:1;max-width:450px;max-height:367px"></b-card-img-lazy>
						<div class="card-img-overlay">
							<b-card-title class="text-white mt-5">{{item.title}}</b-card-title>
							<b-card-text class="text-light">{{item.description}}</b-card-text>
						</div>
					</div>
					<div>
						<div>
							最近更新:
							{{item.updateTime}}
						</div>
						<div>
							<Tools :id="item.id" :index="index"></Tools>
						</div>
					</div>
				</b-card>
			</b-card-group>
		</b-row>
		<div class="overflow-auto">
			<b-pagination-nav number-of-pages="10" pills size="lg" first-text="⏮" prev-text="⏪" next-text="⏩" last-text="⏭" align="center" @change="pageChange" :link-gen="linkGen">
				<template v-slot:page ontent>
					<!-- <em>用户</em> -->
				</template>
			</b-pagination-nav>
		</div>
	</div>
</template>

<script >
import Tools from "../../components/Tools";
export default {
	//使用middleware引入中间件
	middleware: ["cookie"],
	data() {
		return {
			query: {
				pageNum: 1,
				per_page: 16,
			},
		};
	},
	mounted() {
		// this.$axios({
		// 	url: "/gist/users/zzjtnb/gists?page=1&per_page=10"
		// }).then(res => {
		// 	console.log("gist: ", res);
		// });
		// this.$axios({
		// 	url: "/frist/scripts/quote/q.php?type=detailed&symbol=TRNX"
		// }).then(res => {
		// 	console.log("frist: ", res);
		// });
	},
	methods: {
		goDetails(id) {
			// console.log(id);
			this.$router.push("/blog/details/" + id);
		},
		// 分页点击事件的方法
		pageChange(pageNum) {
			this.query.pageNum = pageNum;
			this.$store.commit("common/SET_QUERY", this.query);
		},
		linkGen(pageNum) {
			return {
				path: `/blog/${pageNum}`,
				// query: { query: this.query },
				name: "blog-id",
				params: { id: pageNum, per_page: 16 },
			};
		},
	},
	components: {
		Tools,
	},
	async asyncData({ app, params, query, store, route }) {
		let blogList = await app.$axios.get(`/github/users/zzjtnb/gists?page=${params.id}&per_page=${params.per_page || 16}`).then((res) => {
			let result = res.data;
			let blogs = [];
			for (let i = 0; i < result.length; i++) {
				for (let key in result[i].files) {
					let data = {};
					data["title"] = key;
					data["url"] = result[i].files[key];
					data["description"] = result[i]["description"];
					data["id"] = result[i]["id"];
					data["createTime"] = app.util.utcToLocal(result[i]["created_at"]);
					data["updateTime"] = app.util.utcToLocal(result[i]["updated_at"]);
					data["hide"] = false;
					blogs.push(data);
					break;
				}
			}
			return { blogs };
		});
		return { blogList };
	},
};
</script>

<style scoped lang='scss'>
</style>