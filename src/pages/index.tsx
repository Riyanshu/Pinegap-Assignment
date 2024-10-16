import { useEffect, useState } from 'react';
import { useGetCustomersQuery } from '../features/customerApi';
import CustomerList from '../components/CustomerList';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
import { Customer } from '@/types/customer';

interface HomeProps {
    initialCustomers: Customer[];
    initialPhotos: string[];
}

const CustomerDetails = dynamic(() => import('../components/CustomerDetails'));
const PhotoGrid = dynamic(() => import('../components/PhotoGrid'));

const Home: React.FC<HomeProps> = ({ initialCustomers, initialPhotos }) => {
    const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState(0);
    const [page, setPage] = useState(1);

    const { data, isFetching, isError } = useGetCustomersQuery(page);

    useEffect(() => {
        if (data) {
            setCustomers((prev) => [...prev, ...data.results]);
        }
    }, [data]);

    const loadMore = () => {
        if (!isFetching && !isError) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <div className={styles.container}>
            <h1>Customer Details</h1>
            <div className={styles.content}>
                <CustomerList
                    customers={customers}
                    onSelect={setSelectedCustomer}
                    selected={selectedCustomer}
                    loadMore={loadMore}
                />
                <div className={styles.detailsSection}>
                    {!!customers.length && <CustomerDetails customer={customers[selectedCustomer]} />}
                    {!!customers.length && <PhotoGrid initialPhotos={initialPhotos} customerId={customers[selectedCustomer]?.login.uuid} />}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
    const customerRes = await fetch('https://randomuser.me/api/?results=10');
    const customerData = await customerRes.json();
  
    const photos = await Promise.all(
        Array(9)
            .fill(null)
            .map(() => fetch('https://picsum.photos/300').then((res) => res.url))
    );
  
    return {
        props: {
            initialCustomers: customerData.results,
            initialPhotos: photos,
        },
    };
};

export default Home;