export default function TelaAviso() {
    return (
      <div style={{
        background:"#ffdfc4",
        padding:"30px",
        width:"350px",
        margin:"auto",
        marginTop:"100px",
        borderRadius:"20px",
        textAlign:"center",
        border:"3px solid #c44"
      }}>
        <h2>Atenção!</h2>
        <p>Esta tentativa não contará pontos por acertos.</p>
  
        <button
          style={{margin:"10px", padding:"10px"}}
          onClick={() => window.location.href = "/PrepararQuiz"}
        >
          OK
        </button>
  
        <button
          style={{margin:"10px", padding:"10px"}}
          onClick={() => window.location.href = "/Ranking"}
        >
          Cancelar
        </button>
      </div>
    );
  }
  