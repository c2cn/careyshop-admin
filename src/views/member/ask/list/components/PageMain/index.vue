<template>
  <div class="cs-p">
    <el-table
      :data="currentTableData"
      :highlight-current-row="true"
      @sort-change="sortChange">
      <el-table-column
        label="编号"
        prop="ask_id"
        sortable="custom"
        min-width="100">
      </el-table-column>

      <el-table-column
        label="主题"
        prop="title"
        min-width="300"
        :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span
            v-if="auth.detail"
            class="ask-title"
            @click="openAskDetail(scope.row.ask_id)">
            {{scope.row.title}}
          </span>

          <span v-else>
            {{scope.row.title}}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        label="状态"
        prop="status"
        align="center"
        sortable="custom"
        width="100">
        <template slot-scope="scope">
          <el-tag
            :type="statusMap[scope.row.status].type"
            effect="plain"
            size="mini">
            {{statusMap[scope.row.status].text}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="类型"
        prop="ask_type"
        sortable="custom">
        <template slot-scope="scope">
          {{typeList[scope.row.type]}}
        </template>
      </el-table-column>

      <el-table-column
        label="提交账号"
        min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.get_user.username}}</span>
          <el-image
            v-if="scope.row.get_user.level_icon"
            class="level-icon"
            :src="scope.row.get_user.level_icon"
            fit="fill">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"/>
            </div>
          </el-image>
        </template>
      </el-table-column>

      <el-table-column
        label="创建日期"
        prop="create_time"
        sortable="custom"
        width="160">
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        min-width="100">
        <template slot-scope="scope">
          <el-button
            v-if="auth.del"
            @click="handleDelete(scope.$index)"
            size="small"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { delAskItem } from '@/api/user/ask'

export default {
  props: {
    typeList: {
      default: () => {}
    },
    tableData: {
      default: () => []
    }
  },
  data() {
    return {
      currentTableData: [],
      auth: {
        del: false,
        detail: false
      },
      statusMap: {
        0: {
          text: '待回复',
          type: 'warning'
        },
        1: {
          text: '已回复',
          type: 'success'
        }
      }
    }
  },
  watch: {
    tableData: {
      handler(val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  activated() {
    this.updateChange({
      name: 'member-ask-list',
      source: this.currentTableData,
      key: 'ask_id'
    })
  },
  mounted() {
    this._validationAuth()
  },
  methods: {
    ...mapActions('careyshop/update', [
      'updateChange'
    ]),
    // 验证权限
    _validationAuth() {
      this.auth.del = this.$permission('/member/ask/list/del')
      this.auth.detail = this.$permission('/member/ask/detail')
    },
    // 获取排序字段
    sortChange({ column, prop, order }) {
      let sort = {
        order_type: undefined,
        order_field: undefined
      }

      if (column && order) {
        sort.order_type = order === 'ascending' ? 'asc' : 'desc'
        sort.order_field = prop
      }

      this.$emit('sort', sort)
    },
    // 请求删除
    handleDelete(index) {
      this.$confirm('确定要执行该操作吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          delAskItem(this.currentTableData[index].ask_id)
            .then(() => {
              this.currentTableData.splice(index, 1)
              if (this.currentTableData.length <= 0) {
                this.$emit('refresh', true)
              }

              this.$message.success('操作成功')
            })
        })
        .catch(() => {
        })
    },
    // 打开问答明细
    openAskDetail(ask_id) {
      this.$router.push({
        name: 'member-ask-detail',
        params: { ask_id }
      })
    }
  }
}
</script>

<style scoped>
  .ask-title:hover {
    color: #409EFF;
    cursor: pointer;
    text-decoration: underline;
  }

  .level-icon {
    margin-left: 5px;
    line-height: 0;
    vertical-align: text-bottom;
  }
</style>
