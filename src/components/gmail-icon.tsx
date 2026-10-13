export function GmailIcon({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 17.5v-11Z" stroke="#C5221F" strokeWidth="1.2" />
      <path d="M2 7l10 6.5L22 7" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13.5V4.5" stroke="#FBBC04" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
