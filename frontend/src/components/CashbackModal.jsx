export default function CashbackModal({ cashback, onClose }) {
    const isValid = cashback !== null && cashback !== undefined && !isNaN(cashback);

    return (
        <div style={styles.overlay}>
            <div style={{ ...styles.modal, width: 300 }}>
                <button style={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <h2>Valor do Cashback</h2>

                {isValid ? (
                    <p style={{ fontSize: 22 }}>
                        R$ {cashback.toFixed(2)}
                    </p>
                ) : (
                    <p style={{ fontSize: 18, color: "red" }}>
                        Não foi possível calcular o cashback
                    </p>
                )}
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        background: "transparent",
        border: "none",
        fontSize: "24px",
        cursor: "pointer",
    },
    modal: {
        position: "relative",
        background: "#fff",
        padding: 20,
        borderRadius: 10,
        textAlign: "center"
    },
};