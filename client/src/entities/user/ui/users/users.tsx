import styles from './users.module.sass'
import { ListingUsers } from './components/listing-users/listing-users'

export const Users = () => {


    return (
        <>
            <h2 className={styles.title}>Пользователи</h2>
            <ListingUsers />
        </>
    )
}