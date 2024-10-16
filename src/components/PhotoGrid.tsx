import React, { useCallback, useEffect, useState } from 'react';
import styles from '../styles/PhotoGrid.module.scss';
import Image from 'next/image';

interface PhotoGridProps {
    customerId: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ customerId }) => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean[]>(Array(9).fill(true));

    const fetchPhotos = useCallback(async () => {
        setLoading(Array(9).fill(true));
        const newPhotos = await Promise.all(
            Array(9)
                .fill(null)
                .map(() =>
                    fetch('https://picsum.photos/300').then((res) => res.url)
                )
        );
        setPhotos(newPhotos);
    }, []);

    useEffect(() => {
        fetchPhotos();
        const interval = setInterval(fetchPhotos, 10000);
        return () => clearInterval(interval);
    }, [customerId, fetchPhotos]);

    const handleImageLoad = (index: number) => {
        setLoading((prev) => {
            const newState = [...prev];
            newState[index] = false;
            return newState;
        });
    };

    return (
        <div className={styles.grid}>
            {photos.map((photo, index) => (
                <div
                    key={index}
                    className={`${styles.imageWrapper} ${
                        loading[index] ? styles.loading : styles.loaded
                    }`}
                >
                    <Image
                        src={photo}
                        alt={`Random Photo ${index}`}
                        width={300}
                        height={300}
                        onLoad={() => handleImageLoad(index)}
                        className={styles.image}
                        layout='responsive'
                    />
                </div>
            ))}
        </div>
    );
};

export default PhotoGrid;
