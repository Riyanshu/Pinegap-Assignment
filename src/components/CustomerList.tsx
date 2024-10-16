import React, { memo } from 'react';
import { List, AutoSizer, ListRowRenderer, InfiniteLoader } from 'react-virtualized';
import styles from '../styles/CustomerList.module.scss';
import { Customer } from '@/types/customer';

const CustomerList: React.FC<{
    customers: Customer[];
    onSelect: (index: number) => void;
    selected: number;
    loadMore: () => void;
}> = memo(({ customers, onSelect, selected, loadMore }) => {
    
    const isRowLoaded = ({ index }: { index: number }) => index < customers.length;

    const loadMoreRows = async () => {
        await loadMore();
    };

    const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
        const customer = customers[index];
        
        return (
            <div
                key={key}
                style={style}
                className={`${styles.card} ${selected === index ? styles.active : ''}`}
                onClick={() => onSelect(index)}
            >
                <div>{`${customer.name.title} ${customer.name.first} ${customer.name.last}`}</div>
            </div>
        );
    };

    return (
        <div className={styles.list}>
            <AutoSizer>
                {({ height, width }) => (
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={customers.length + 1} // Extra row for loading
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                height={height}
                                rowCount={customers.length}
                                rowHeight={100}
                                rowRenderer={rowRenderer}
                                width={width}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                overscanRowCount={10}
                            />
                        )}
                    </InfiniteLoader>
                )}
            </AutoSizer>
        </div>
    );
});

CustomerList.displayName = 'CustomerList';

export default CustomerList;
