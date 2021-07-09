import * as k from '../AppConstants/utilConsts';

export const resolver = (id)=>{
    let storeloc = k.storageCart
    let navlink = k.navlinkListCart
    if(id=="CartList"){
        navlink = k.navlinkListCart
        storeloc = k.storageCart
    }else if(id=="CartAdd"){
        navlink = k.navlinkAddCart
        storeloc = k.storageCart
    }else if(id=="CartEdit"){
        navlink = k.navlinkEditCart
        storeloc = k.storageCart
    }else if(id=="WishlistList"){
        navlink = k.navlinkListWishlist
        storeloc = k.storageWishlist
    }else if(id=="WishlistAdd"){
        navlink = k.navlinkAddWishlist
        storeloc = k.storageWishlist
    }else if(id=="WishlistEdit"){
        navlink = k.navlinkEditWishlist
        storeloc = k.storageWishlist
    }else if(id=="StockList"){
        navlink = k.navlinkListStock
        storeloc = k.storageStock
    }else if(id=="StockAdd"){
        navlink = k.navlinkAddStock
        storeloc = k.storageStock
    }else if(id=="StockEdit"){
        navlink = k.navlinkEditStock
        storeloc = k.storageStock
    } 
    return {navlink, storeloc}
}

