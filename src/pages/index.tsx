import { useEffect, useState } from 'react';
import { useGetCustomersQuery } from '../features/customerApi';
import CustomerList from '../components/CustomerList';
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.scss';
import { Customer } from '@/types/customer';

const CustomerDetails = dynamic(() => import('../components/CustomerDetails'));
const PhotoGrid = dynamic(() => import('../components/PhotoGrid'));

const Home: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
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
                    {!!customers.length && <PhotoGrid customerId={customers[selectedCustomer]?.login.uuid} />}
                </div>
            </div>
        </div>
    );
};

export default Home;