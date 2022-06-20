module.export = function Cart(oldCart) {
  this.items = oldCart.items;
  this.totalQty = oldCart.totalQty;
  this.totalPrice = oldCart.totalPrice;

  this.add = function(item, id) {
    var storedItem = this.items[id];
    if (!storedItem) {
      storedItem = this.items[id] = {
        item: item,
        cantidad: 0,
        precio: 0
      };
    }
    storedItem.cantidad++;
    storedItem.precio = storedItem.item.precio * storedItem.cantidad;
    this.totalQty++;
    this.totalPrice += storedItem.precio;
  };

  this.getCart = function() {
    var arr = [];
    for (var id in this.items) {
      arr.push(this.items[id]);
    }
    return arr;
  };
};
