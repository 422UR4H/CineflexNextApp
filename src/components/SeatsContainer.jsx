import styles from "@/styles/SeatsContainer.module.css";

export default function SeatsContainer({ seats, setSeats }) {
    function select(seat, i) {
        if (!seat.isAvailable) {
            alert("Esse assento não está disponível");
            return;
        }
        const temp = [...seats];

        temp[i].isSelected = !seat.isSelected;
        setSeats(temp);
    }

    return (
        <div className={styles.seatsContainer}>
            {seats.map((s, i) => (
                <div key={s.id} className={`
                    ${styles.seatItem}
                    ${s.isSelected && styles.selected}
                    ${!s.isAvailable && styles.disabled}
                `}>
                    <span onClick={(() => select(s, i))} data-test="seat">
                        {s.name}
                    </span>
                </div>
            ))}
        </div>
    );
}