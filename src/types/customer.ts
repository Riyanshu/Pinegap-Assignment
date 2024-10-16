export interface Customer {
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        country: string;
        postcode: string | number;
    };
    login: {
        uuid: string;
        username: string;
    };
}

export interface CustomerResponse {
    results: Customer[];
    info: {
        results: number;
        page: number;
    }
}