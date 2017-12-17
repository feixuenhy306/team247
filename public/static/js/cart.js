/**
 * Created by jacksoft on 16/10/22.
 */
window.vm = new Vue({
	el:'#app',
	data:{
		showModal:false,
        showEditModal:false,
        showDelModal:false,
		productList:[],
		totalMoney:0,
		checkAll:false,
		currentProduct:'',
        listData:[],
        page: 1,//当前页码
        pageSize: 10,//每页条数
        total:0,//总数
        pageData: {
            curPage: 1,
            pageSize: 10,
            total: 0,
            totalPage: 0,
            pageIndex: [],
            itemStart: 0,
            itemEnd: 0
        }
	},
	mounted: function () {
		var _this = this;
		this.cartView();
	},
	filters: {
		formatMoney: function (value,quentity) {
			if(!quentity)quentity=1;
			return "¥ "+(value*quentity).toFixed(2) +"元";
		}
	},
	methods:{
		cartView: function () {
			this.$http.get("/static/data/cartData.json").then(response=>{
				var res = response.data;
				if(res && res.status=="1"){
					this.productList = res.result.list;
					this.calcTotalMoney();
				}
			});
		},
		selectAll: function (isCheck) {
			this.checkAll=isCheck;
			this.productList.forEach(function (item) {
				if(typeof item.checked == "undefined"){
					Vue.set(item,"checked",isCheck);
				}else{
					item.checked = isCheck;
				}
			})
			this.calcTotalMoney();
		},
		selectedProduct: function (product) {
			if(typeof product.checked == "undefined"){
				//Vue.set(product,"checked",true);
				this.$set(product,"checked",true);
			}else{
				product.checked = !product.checked;
			}
			this.calcTotalMoney();
			this.isCheckAll();
		},
		isCheckAll: function () {
			let flag = true;
			this.productList.forEach(function (item) {
				if(!item.checked){
					flag = false;
				}
			})
			if(flag){
				this.checkAll = true;
			}else{
				this.checkAll = false;
			}

		},
		calcTotalMoney: function () {
			let totalMoney = 0;
			this.productList.forEach(function (item) {
				if(item.checked){
					totalMoney+=item.productPrice*item.productQuentity;
				}
			});
			this.totalMoney = totalMoney;
		},
		changeMoney: function (product,way) {
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity<0){
					product.productQuentity=0;
				}
			}
			this.calcTotalMoney();
		},
		delConfirm: function (product) {
			this.showModal = true;
			this.currentProduct = product;
		},
        addConfirm: function (product) {
            this.showModal = true;
            this.currentProduct = product;
        },
		addCurrentProduct: function () {
			this.showModal = false;
			var index = this.productList.indexOf(this.currentProduct);
			this.productList.splice(index,1);

            $.ajax({
               type: 'POST',
               url: "/addProduct",
               data: {name: this.$refs.name.value,description: this.$refs.description.value,price: this.$refs.price.value},
               success: function (res) {
                   window.location = "/";
               }
            });
		},
        editCurrentProduct: function () {
            this.showEditModal = false;
            var that = this,$id = this.$refs.id.value,$name = this.$refs.nameEdit.value,$descriptionEdit = this.$refs.descriptionEdit.value,$price = this.$refs.priceEdit.value;
            $.ajax({
                type: 'POST',
                url: "/updateProduct",
                data: {id: this.$refs.id.value,name: this.$refs.nameEdit.value,discription: this.$refs.descriptionEdit.value,price: this.$refs.priceEdit.value},
                success: function (res) {
                    that.listData.forEach(function (item) {
                        if($id){
                            if(item.id == $id){
                                item.name = $name;
                                item.descriptionEdit = $descriptionEdit;
                                item.price = $price;
                            }
                        }

                    })
                }
            });
        },
        delCurrentProduct: function () {
            this.showDelModal = false;
            var that = this
            $.ajax({
                type: 'GET',
                url: "/delProduct?id=" + that.$refs.id.value,
                success: function (res) {
                    window.location="/"
                }
            });
        },
        listItems: function () {//列出需要的数据
            var that = this
            $.ajax({
                url: "/products",
                type: 'GET',
                dataType: 'json',
                data: {},
                success: function (res) {
                    var returnData = {'data':res,'total':103};
                    that.listData = returnData.data;
                    that.total=returnData['total'];
                    that.setPageList(this.total, this.page, this.pageSize);
                }
            });
        },
        editItem:function ($id,$name,$price,$description) {//编辑操作在这儿哟
            this.showEditModal = true;
            this.$refs.id.value = $id;
            this.$refs.nameEdit.value = $name;
            this.$refs.priceEdit.value = $price;
            this.$refs.descriptionEdit.value = $description;
        },
        deleteItem:function ($id) {//这里可以删除数据
            this.showDelModal = true;
            this.$refs.id.value = $id;
        },
        setPageList: function (total, page, pageSize) {
            total = parseInt(total);
            var curPage = parseInt(page);
            pageSize = parseInt(pageSize);
            var totalPage = Math.ceil(total / pageSize);
            var itemStart = (curPage - 1) * pageSize + 1;
            if (curPage == totalPage) {
                itemEnd = total;
            } else {
                itemEnd = curPage * pageSize;
            }
            var pageIndex = [];
            if (curPage >= 1 && curPage <= totalPage) {
                if (totalPage < 5) {//5页以内
                    for (var $i = 1; $i <= totalPage; $i++) {
                        pageIndex.push($i);
                    }
                } else {//大于5页
                    if (curPage == 1) {
                        pageIndex = [curPage, curPage + 1, curPage + 2, curPage + 3, curPage + 4];
                    } else if (curPage == 2) {
                        pageIndex = [curPage - 1, curPage, curPage + 1, curPage + 2, curPage + 3];
                    } else if (curPage == totalPage - 1) {
                        pageIndex = [curPage - 3, curPage - 2, curPage - 1, curPage, totalPage];
                    } else if (curPage == totalPage) {
                        pageIndex = [curPage - 4, curPage - 3, curPage - 2, curPage - 1, curPage];
                    } else {
                        pageIndex = [curPage - 2, curPage - 1, curPage, curPage + 1, curPage + 2];
                    }
                }
            }

            this.pageData.curPage = curPage;
            this.pageData.pageSize = pageSize;
            this.pageData.total = total;
            this.pageData.totalPage = totalPage;
            this.pageData.pageIndex = pageIndex;
            this.pageData.itemStart = itemStart;
            this.pageData.itemEnd = itemEnd;
        },
        changeCurPage: function (page, pageSize) {//换页
            this.page = page;
            this.pageSize = pageSize;
            this.listItems();
        },
        goPage: function (pageSize, totalPage) {//跳转页
            var pageIndex = this.$refs.goPage.value;
            if (pageIndex <= 0) {
                pageIndex = 1;
                this.$refs.goPage.value = 1;
            } else if (pageIndex >= totalPage) {
                pageIndex = totalPage;
                this.$refs.goPage.value = totalPage;
            }
            this.changeCurPage(pageIndex, pageSize);
        }
	}
});

window.onload = function(){
    console.log('Hello World!');
    vm.listItems();
};