<template>
  <el-tabs v-model="searchForm.tab" @tab-change="getData" style=" padding-left: 22px;">
    <el-tab-pane v-for="item in tabbars" :key="item.key" :label="item.name" :name="item.key"></el-tab-pane>
  </el-tabs>
  <el-card shadow="never" class="border-0">
    <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
      <SearchItem label="关键词">
        <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
      </SearchItem>
      <template #show>
        <SearchItem label="商品分类">
          <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" clearable>
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </SearchItem>
      </template>
    </Search>

    <ListHeader @create="handleCreate" @refresh="getData" layout="create,,restore">
      <el-button v-if="searchForm.tab == 'all' || searchForm.tab == 'off'" class="listbtn" type="primary"
        @click="handleMultiStatusChange(1)">上架</el-button>
      <el-button v-if="searchForm.tab == 'all' || searchForm.tab == 'saling'" class="listbtn" type="primary"
        @click="handleMultiStatusChange(0)">下架</el-button>
      <el-button v-if="searchForm.tab == 'delete'" class="listbtn" style="background-color: #AEDF97; color: #fff;"
        @click="handleRestoreGoods">恢复</el-button>
      <el-button v-else class="listbtn" type="danger" @click="handleMultiDelete">删除</el-button>
      <el-popconfirm title="是否要彻底删除该商品？" confirmButtonText="确认" cancelButtonText="取消" 
              @confirm="handleDestroyGoods" v-if="searchForm.tab == 'delete'">
              <template #reference>
                <el-button type="danger"  >彻底删除</el-button>
              </template>
            </el-popconfirm>
    </ListHeader>
    <el-table ref="multipleTableRef" :data="tableData" stripe style="width: 100%;height: 60vh;" v-loading="loading"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="商品" width="500">
        <template #default="{ row }">
          <div class="flex items-center" style="width: 100%;">
            <el-image :src="row.cover" fit="fill" :lazy="true"
              style="width: 50px; height: 50px;border-radius: 12px;margin-right: 15px;"></el-image>
            <div class="flex">
              <div class="ml-2">
                <p class="font-bold">{{ row.title }}</p>
                <div>
                  <span class="text-red-500">￥{{ row.min_price }}</span>
                  <el-divider direction="vertical" />
                  <span>￥{{ row.min_oprice }}</span>
                </div>
                <p>分类：{{ row.category ? row.category.name : "未分类" }}</p>
                <p>创建时间：{{ (row.create_time) }}</p>
              </div>
            </div>
          </div>

        </template>
      </el-table-column>
      <el-table-column label="实际销量" width="100" prop="sale_count" align="center" />
      <el-table-column label="商品状态" width="120">
        <template #default="{ row }">
          <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{ row.status ? '上架' : '仓库' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" width="120" align="center" v-if="searchForm.tab != 'delete'">
        <template #default="{ row }">
          <div class="flex flex-col" v-if="row.ischeck == 0">
            <el-button type="success" size="small" plain>审核通过</el-button>
            <el-button type="danger" size="small" plain>审核拒绝</el-button>
          </div>
          <span v-else>{{ row.ischeck == 1 ? '通过' : '拒绝' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="总库存" width="90" prop="stock" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <div v-if="searchForm.tab != 'delete'" style="display: flex;width: 100%;flex-wrap: wrap;">
            <el-button class="px-1" type="primary" @click="handleEdit(scope.row)">修改</el-button>

            <el-button class="px-1"
              :type="(scope.row.sku_type == 0 && !scope.row.sku_value) || (scope.row.sku_type == 1 && !scope.row.goods_skus.length) ? 'danger' : 'primary'"
              :loading="scope.row.skusLoading" @click="handleSetGoodsSkus(scope.row)">商品规格</el-button>

            <el-button class="px-1" :type="scope.row.goods_banner.length == 0 ? 'danger' : 'primary'"
              @click="handleSetGoodsBanner(scope.row)" :loading="scope.row.bannersLoading">设置轮播图</el-button>

            <el-button class="px-1" :type="!scope.row.content ? 'danger' : 'primary'"
              @click="handleSetGoodsContent(scope.row)" :loading="scope.row.contentLoading">商品详情</el-button>

            <el-popconfirm title="是否要删除该商品？" confirmButtonText="确认" cancelButtonText="取消"
              @confirm="handleDelete([scope.row.id])">
              <template #reference>
                <el-button type="primary">删除</el-button>
              </template>
            </el-popconfirm>
          </div>
          <span v-else>暂无操作</span>
        </template>
      </el-table-column>
    </el-table>

    <div class="flex items-center justify-center mt-5">
      <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage" :page-size="limit"
        @current-change="getData" />
    </div>

    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" :rules="rules" style="width: 100%;" :inline="false">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品名称，不能超过60个字符"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <ChooseImage v-model="form.cover" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="form.category_id" placeholder="选择所属商品分类">
            <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="选填，商品卖点"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label="总库存" prop="stock">
          <el-input v-model="form.stock" type="number" style="width:40%;">
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存预警" prop="min_stock">
          <el-input v-model="form.min_stock" type="number" style="width:40%;">
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最低销售价" prop="min_price">
          <el-input v-model="form.min_price" type="number" style="width:40%;">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最低原价" prop="min_oprice">
          <el-input v-model="form.min_oprice" type="number" style="width:40%;">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存显示" prop="stock_display">
          <el-radio-group v-model="form.stock_display">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">放入仓库</el-radio>
            <el-radio :label="1">立即上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </FormDrawer>
    <Banners ref="bannersRef" @reloadData="getData" />
    <Content ref="contentRef" @reloadData="getData" />
    <Skus ref="skusRef" @reloadData="getData" />
  </el-card>
</template>
<script setup>
import { onMounted, ref } from "vue"
import ListHeader from "@/components/ListHeader.vue";
import FormDrawer from "@/components/FormDrawer.vue";
import ChooseImage from "@/components/ChooseImage.vue";
import Search from "@/components/Search.vue";
import SearchItem from "@/components/SearchItem.vue";
import { getCategoryList } from "@/api/category"
import Banners from "@/pages/goods/Banners.vue";
import Skus from "@/pages/goods/Skus.vue";
import { toast } from '@/composables/util'
import Content from "@/pages/goods/Content.vue";
import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods,
  restoreGoods,
  destroyGoods
} from "@/api/goods"

import { useInitTable, useInitForm } from '@/composables/useCommon'

const roles = ref([])

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  multipleTableRef,
  handleDelete,
  handleMultiStatusChange,
  handleSelectionChange,
  handleMultiDelete,
  multiSelectionIds,

} = useInitTable({
  searchForm: {
    title: "",
    tab: "delete",
    category_id: null
  },
  getList: getGoodsList,
  onGetListSuccess: (res) => {
    tableData.value = res.list.map(o => {
      o.bannersLoading = false
      o.contentLoading = false
      o.skusLoading = false
      return o
    })
    total.value = res.totalCount
    roles.value = res.roles
  },
  delete: deleteGoods,
  updateStatus: updateGoodsStatus
})

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form: {
    title: null,
    category_id: null,
    cover: null,
    desc: null,
    unit: "件",
    stock: 100,
    min_stock: 10,
    status: 1,
    stock_display: 1,
    min_price: 0,
    min_oprice: 0
  },
  getData,
  update: updateGoods,
  create: createGoods
})
const tabbars = [{
  key: "all",
  name: "全部"
}, {
  key: "checking",
  name: "审核中"
}, {
  key: "saling",
  name: "出售中"
}, {
  key: "off",
  name: "已下架"
}, {
  key: "min_stock",
  name: "库存预警"
}, {
  key: "delete",
  name: "回收站"
}]
const categoryList = ref([])

onMounted(() => {
  getCategoryList().then(res => {
    categoryList.value = res
  })
})
const bannersRef = ref(null)
const handleSetGoodsBanner = (row) => {
  bannersRef.value.open(row)
}
const contentRef = ref(null)
const handleSetGoodsContent = (row) => {
  contentRef.value.open(row)
}
const skusRef = ref(null)
const handleSetGoodsSkus = (row) => {
  skusRef.value.open(row)
}
const handleRestoreGoods = () => {
  loading.value = true;
  restoreGoods(multiSelectionIds.value).then(res => {
    toast("恢复商品成功")
    if (multipleTableRef.value) {
      multipleTableRef.value.clearSelection()
    }
    getData()
  })
    .finally(() => {
      loading.value = false;
    })
}
const handleDestroyGoods = () => {
  loading.value = true;
  destroyGoods(multiSelectionIds.value).then(res => {
    toast("彻底删除商品成功")
    if (multipleTableRef.value) {
      multipleTableRef.value.clearSelection()
    }
    getData()
  })
    .finally(() => {
      loading.value = false;
    })
}
</script>
<style scoped>
:deep(.el-switch.is-checked .el-switch__core) {
  background-color: #7D71F1 !important;
  border-color: #7D71F1 !important;
}

.el-table__body-wrapper .el-button {
  padding: 8px 16px;
  margin: 10px;
  width: 80px;
}

.el-table__body-wrapper .el-button--primary {
  background-color: #a298ff !important;
  border-color: #7D71F1 !important;

}

:deep(.el-checkbox.is-checked .el-checkbox__inner) {
  background-color: #7D71F1 !important;
  border-color: #7D71F1 !important;
  border-radius: 5px !important;
}

:deep(.el-checkbox__input.is-indeterminate .el-checkbox__inner) {
  background-color: #7D71F1 !important;
  border-color: #7D71F1 !important;
  border-radius: 5px !important;
}
</style>
