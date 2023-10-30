const baseUrl = "http://192.168.1.3:45455/api";


var api = {
    uri: "http://192.168.1.3:45455/",

    login: baseUrl + "/Account/Login", // ?username=username&password=password
    register: baseUrl + "/Account/Register",
    
    
    getGrocery: baseUrl + "/Grocery/Get-grocery",

    
    getProductImage: baseUrl + "/Product/Get-product-image",
    getExclusiveOffer: baseUrl + "/Product/search-product?specialId=1",
    getBestSelling: baseUrl + "/Product/search-product?specialId=2",
    
    
    getProduct: baseUrl + "/Product/search-product",
    
    
    addToCart: baseUrl + "/CartItem/Add-to-cart",
    checkOut: baseUrl + "/Order/Check-out",


    getCartItem: baseUrl + "/Order/Get-order-details",
}


export default api