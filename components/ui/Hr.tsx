interface HrProps {
  color?: string;
  height?: string;
}

export default function Hr({ color = "#e5e5e5", height = "20px" }: HrProps) {
  return (
    <div
      style={{
        height: height,
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: color,
        }}
      />
    </div>
  );
}
