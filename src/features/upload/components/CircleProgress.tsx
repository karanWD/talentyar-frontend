type Props = {
  progress: number;
};

export default function CircleProgress({ progress }: Props) {
  const radius = 21;
  const stroke = 2;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative size-10.5 rounded-full bg-zinc-800/80">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-200 ease-linear"
        />
      </svg>

      <div className="text-background absolute inset-0 flex items-center justify-center text-xs leading-4">
        %{progress}
      </div>
    </div>
  );
}
