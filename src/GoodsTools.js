let obj = {};
// 保存到本地
obj.saveItem = function (goodslist) {
  window.localStorage.setItem("goodsList",JSON.stringify(goodslist));
}

// 取出数据
obj.getItem = function () {
  let goods = JSON.parse(window.localStorage.getItem("goodsList")  || '{}')
  return goods;
}

//删除
obj.delete = function(id){
  let goodslist = this.getItem()
  delete goodslist[id];
  this.saveItem(goodslist)
}

// 添加数据
obj.addItem = function (goods) {
  let goodslist = this.getItem()
  if (goodslist[goods.id]){
    goodslist[goods.id] += goods.num;
  }else{
    goodslist[goods.id] = goods.num;
  }
  this.saveItem(goodslist)
}

// 获取总数
obj.getTotalCount = function (goods) {
  let sum = 0;
  let goodsList = this.getItem();
  let values = Object.values(goodsList);
  values.forEach(item=>sum+=item)
  return sum
}

export default obj;
