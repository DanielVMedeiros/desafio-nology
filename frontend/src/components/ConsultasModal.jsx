export default function ConsultasModal({ consultas, onClose }) {
    return (
        <div style={styles.overlay}>
            <div style={{ ...styles.modal, width: 500 }}>
                <button style={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <h2>Consultas feitas pelo seu IP</h2>

                {consultas.length === 0 ? (
                    <p>Nenhuma consulta encontrada</p>
                ) : (
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Tipo Cliente</th>
                                    <th style={styles.th}>Valor Final</th>
                                    <th style={styles.th}>Cashback</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consultas.map((c) => (
                                    <tr key={c.id_consulta}>
                                        <td style={styles.td}>{c.tipo_cliente}</td>
                                        <td style={styles.td}>R$ {Number(c.valor).toFixed(2)}</td>
                                        <td style={styles.td}>R$ {Number(c.cashback).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
    },
    tableContainer: {
        maxHeight: "300px",
        overflowY: "auto",
        marginTop: 10,
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 10,
    },
    th: {
        background: "#2196F3",
        color: "#fff",
        padding: 8,
    },
    td: {
        padding: 8,
        borderBottom: "1px solid #ddd",
        textAlign: "center",
    },
};