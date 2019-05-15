import request from '@/utils/request'

/**
 * 添加一个区域
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function addRegionItem(data) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'add.region.item'
    },
    data
  })
}

/**
 * 编辑一个区域
 * @param {Object} data
 * @returns {AxiosPromise}
 */
export function setRegionItem(data) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'set.region.item'
    },
    data
  })
}

/**
 * 编辑一个区域
 * @param {Array} region_id
 * @returns {AxiosPromise}
 */
export function delRegionList(region_id) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'del.region.list'
    },
    data: {
      region_id
    }
  })
}

/**
 * 获取指定区域
 * @param {Number} region_id
 * @param {Number} region_all
 * @returns {AxiosPromise}
 */
export function getRegionItem(region_id, region_all = 0) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'get.region.item'
    },
    data: {
      region_id,
      region_all
    }
  })
}

/**
 * 获取指定Id下的子节点(不包含本身)
 * @param {Number} region_id
 * @param {Number} region_all
 * @returns {AxiosPromise}
 */
export function getRegionList(region_id, region_all = 0) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'get.region.list'
    },
    data: {
      region_id,
      region_all
    }
  })
}

/**
 * 获取指定Id下的所有子节点(包含本身)
 * @param {Array} region_id
 * @param {Number} region_all
 * @returns {AxiosPromise}
 */
export function getRegionSonList(region_id, region_all = 0) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'get.region.son.list'
    },
    data: {
      region_id,
      region_all
    }
  })
}

/**
 * 设置区域排序
 * @param {Number} region_id
 * @param {Number} sort
 * @returns {AxiosPromise}
 */
export function setRegionSort(region_id, sort) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'set.region.sort'
    },
    data: {
      region_id,
      sort
    }
  })
}

/**
 * 根据区域编号获取区域名称
 * @param {Array} region_id
 * @returns {AxiosPromise}
 */
export function getRegionName(region_id) {
  return request({
    url: '/v1/region',
    method: 'post',
    params: {
      method: 'get.region.name'
    },
    data: {
      region_id
    }
  })
}
