export default function MiniSite({ url }) {
  return (
    <div
      style={{
        width: "400px", // tamanho final da miniatura
        height: "250px", // tamanho final da miniatura
        overflow: "hidden",
        borderRadius: "10px",
        border: "1px solid #ccc",
      }}
    >
      <iframe
        src={url}
        style={{
          width: "1000px", // tamanho real grande
          height: "800px",
          transform: "scale(0.4)", // miniatura (40% do tamanho)
          transformOrigin: "0 0", // importante
          border: "none",
        }}
      />
    </div>
  );
}
