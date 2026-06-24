
export interface IProduct {
 id: number;
 title: string;
 description: string;
 price: number;
 thumbnail: string;
 category: string;
 stock: number;
 rating: number;
}

export interface IProductResponse {
    products: IProduct[];
    total: number;
    skip: number;
    limit: number;
}

export interface ICategoriesResponse {}