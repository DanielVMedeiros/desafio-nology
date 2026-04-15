export default function CashbackModal({ cashback, onClose }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>💸 Cashback</h2>
        <p style={{ fontSize: 22 }}>
          R$ {cashback?.toFixed(2)}
        </p>
        <button onClick={onClose}>Fechar</button>
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
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 10,
    textAlign: "center",
  },
};