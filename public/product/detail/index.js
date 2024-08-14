const url = window.location.href
const params = new URLSearchParams(new URL(url).search);
const id = params.get('id');


const fetchProduct= async (id) => {
    try {
      const fetchResult = await fetch(`/api/product/detail/${id}`);

      
      if (fetchResult.ok) {
        const result = await fetchResult.json();
        const product = result.data;
        return product
        
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const productWrapper = document.getElementById("product-wrapper");
renderProduct = async ()=>{
    const v = await fetchProduct(id);
    if(!v){
        alert("(!)상품 정보를 불러올 수 없습니다.");
        return null
    }else{
        const itemElem = document.createElement("div");
        itemElem.innerHTML = `
            <div>${v.title}</div>
            <div>
                <a href="./detail?id=${v.productId}"><img src="${v.imgUrl}"/></a>
            </div>
            <div>[가격]: ${v.price}</div>
            <div>[상세설명]: ${v.description}</div>
            <div>[재고]: ${v.stock}</div>
            `;
    productWrapper.append(itemElem);

    }
}
renderProduct();
  