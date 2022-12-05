type ProductId = number;
type productInCart = {
    id: ProductId;
    quantity: number
};

export const useUrlIdParams = (urlParams: productInCart[]) => {
    let params = '';
    if(urlParams) {
        urlParams.map((p: any) => {
            params += `&id=${p.id}`
        })
        return params.substring(1)
    }
    return ""
        
}