import type { SVGProps } from "react";

export function BrandLogo({ className = "w-8 h-8", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" role="img" aria-label="ManakSetu institutional logo" {...props}>
      <rect x="1.5" y="1.5" width="37" height="37" rx="9" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M8 28.5V15.5M8 28.5H32M32 28.5V15.5M8 15.5L14 10.5L20 15.5L26 10.5L32 15.5" stroke="#3B82F6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 22H32M14 10.5V28.5M26 10.5V28.5" stroke="#2563EB" strokeOpacity="0.72" strokeWidth="1.15" strokeLinecap="round" />
      <path d="M20 7.25L23.2 9.1V12.8L20 14.65L16.8 12.8V9.1L20 7.25Z" fill="#10B981" stroke="#6EE7B7" strokeWidth="0.9" />
      <path d="M18.7 10.9L19.65 11.8L21.45 9.95" stroke="#052E2B" strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default BrandLogo;
