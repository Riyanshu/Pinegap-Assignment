import React from 'react';
import styles from '../styles/CustomerDetails.module.scss';
import { Customer } from '@/types/customer';

const CustomerDetails: React.FC<{ customer: Customer }> = ({ customer }) => (
    <div className={styles.details}>
        <h2>{`${customer.name.title} ${customer.name.first} ${customer.name.last}`}</h2>
        <p>{`${customer.location.street.name}, ${customer.location.city}, ${customer.location.state}, ${customer.location.country}, ${customer.location.postcode}`}</p>
    </div>
);

export default CustomerDetails;
