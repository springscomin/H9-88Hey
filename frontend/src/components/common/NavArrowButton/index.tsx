interface NavArrowButtonProps {
  isCurrent: boolean;
}

export function NavArrowButton({ isCurrent }: NavArrowButtonProps) {
  const color = isCurrent ? '#232323' : '#BEBEBE';
  return (
    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.726562 7.06L3.7799 4L0.726562 0.94L1.66656 0L5.66656 4L1.66656 8L0.726562 7.06Z" fill={color} />
    </svg>
  );
}
