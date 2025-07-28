export interface SpacerProps {
  /**
   * @title Tamanho do espaçamento
   * @description Selecione o tamanho do espaçamento vertical
   */
  size: "small" | "medium";
}

export default function Spacer({ size = "small" }: SpacerProps) {
  const sizeClasses = {
    small: "h-[21px] lg:h-[28px]", // 28px desktop (75% mobile)
    medium: "h-[30px] lg:h-[40px]", // 40px desktop (75% mobile)
  };

  return <div className={`w-full ${sizeClasses[size]}`} />;
}
