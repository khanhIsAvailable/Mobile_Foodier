const baseUrl = "http://192.168.1.3:45455/api";


var api = {
    uri: "http://192.168.1.3:45455/",
    getGrocery: baseUrl + "/Grocery/Get-grocery",
    getProductImage: baseUrl + "/Product/Get-product-image",
    getExclusiveOffer: baseUrl + "/Product/search-product?specialId=1",
    getBestSelling: baseUrl + "/Product/search-product?specialId=2",
    getProduct: baseUrl + "/Product/search-product"
}


export default api