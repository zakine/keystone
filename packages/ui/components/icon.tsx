import type { SVGProps } from "react";

export type KeystoneIconName =
  | "arrow"
  | "bell"
  | "cal"
  | "cam"
  | "check"
  | "chev"
  | "chevL"
  | "filter"
  | "home"
  | "inbox"
  | "lead"
  | "message"
  | "more"
  | "paperclip"
  | "phone"
  | "pin"
  | "plus"
  | "search"
  | "send"
  | "spark"
  | "voice"
  | "x";

export type IconProps = SVGProps<SVGSVGElement> & {
  name: KeystoneIconName;
  size?: number;
  stroke?: number;
};

const paths: Record<KeystoneIconName, JSX.Element> = {
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5a6 6 0 0112 0v5l2 2H4z" />
      <path d="M10 21a2 2 0 004 0" />
    </>
  ),
  cal: (
    <>
      <rect height="15" rx="2" width="16" x="4" y="5" />
      <path d="M4 9h16M9 3v4M15 3v4" />
    </>
  ),
  cam: (
    <>
      <rect height="13" rx="2" width="18" x="3" y="7" />
      <path d="M9 7l2-3h2l2 3" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),
  check: (
    <>
      <path d="M5 12l4 4 10-10" />
    </>
  ),
  chev: (
    <>
      <path d="M9 6l6 6-6 6" />
    </>
  ),
  chevL: (
    <>
      <path d="M15 6l-6 6 6 6" />
    </>
  ),
  filter: (
    <>
      <path d="M4 5h16l-6 8v6l-4-2v-4z" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7v9h-5v-6h-6v6H4z" />
    </>
  ),
  inbox: (
    <>
      <path d="M4 13l3-8h10l3 8" />
      <path d="M4 13v6h16v-6" />
      <path d="M4 13h5l1 2h4l1-2h5" />
    </>
  ),
  lead: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c1-4 4-6 7-6s6 2 7 6" />
    </>
  ),
  message: (
    <>
      <path d="M4 6h16v11H8l-4 3z" />
    </>
  ),
  more: (
    <>
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </>
  ),
  paperclip: (
    <>
      <path d="M15 7l-7 7a3 3 0 004 4l8-8a5 5 0 00-7-7L5 11a7 7 0 0010 10l5-5" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 3c-3 0-5 2-5 5 0 4 5 12 5 12s5-8 5-12c0-3-2-5-5-5z" />
      <circle cx="12" cy="8" r="1.5" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l4 4" />
    </>
  ),
  send: (
    <>
      <path d="M4 12l16-8-6 16-2-7z" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6z" />
    </>
  ),
  voice: (
    <>
      <rect height="12" rx="2" width="4" x="10" y="3" />
      <path d="M6 12a6 6 0 0012 0" />
      <path d="M12 18v3" />
    </>
  ),
  x: (
    <>
      <path d="M6 6l12 12M18 6L6 18" />
    </>
  ),
};

export function Icon({ color = "currentColor", name, size = 18, stroke = 1.5, ...props }: IconProps) {
  return (
    <svg
      fill="none"
      height={size}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={stroke}
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
