
import React from "react";
import { 
  LucideIcon, 
  LucideProps,
  Home,
  BookOpen,
  Brain,
  TrendingUp,
  User,
  Settings,
  Bell,
  ArrowRightLeft,
  PiggyBank,
  BarChart3,
  Building,
  Target,
  Briefcase,
  CreditCard,
  DollarSign,
  Landmark,
  Loader2,
  Check,
  X,
  CircleUser,
  Wallet,
  LineChart,
  Phone,
  Banknote,
  Calendar,
  Info,
  BookText,
  BadgePercent,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export type IconName = 
  | "home"
  | "education"
  | "analysis"
  | "investments"
  | "profile"
  | "settings"
  | "notifications"
  | "transactions"
  | "savings"
  | "investChart"
  | "bank"
  | "goals"
  | "portfolio"
  | "creditCard"
  | "finances"
  | "stocks"
  | "loader"
  | "check"
  | "x"
  | "phone"
  | "wallet"
  | "lineChart"
  | "user"
  | "banknote"
  | "calendar"
  | "info"
  | "bookText"
  | "badgePercent"
  | "graduationCap";

type IconProviderProps = {
  name: IconName;
  className?: string;
  size?: number;
  strokeWidth?: number;
} & Omit<LucideProps, "size" | "strokeWidth">;

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  education: BookOpen,
  analysis: Brain,
  investments: TrendingUp,
  profile: CircleUser,
  settings: Settings,
  notifications: Bell,
  transactions: ArrowRightLeft,
  savings: PiggyBank,
  investChart: BarChart3,
  bank: Building,
  goals: Target,
  portfolio: Briefcase,
  creditCard: CreditCard,
  finances: Brain,
  stocks: Landmark,
  loader: Loader2,
  check: Check,
  x: X,
  wallet: Wallet,
  lineChart: LineChart,
  user: User,
  phone: Phone,
  banknote: Banknote,
  calendar: Calendar,
  info: Info,
  bookText: BookText,
  badgePercent: BadgePercent,
  graduationCap: GraduationCap
};

export const Icon = ({ 
  name, 
  className, 
  size = 24, 
  strokeWidth = 2,
  ...props 
}: IconProviderProps) => {
  const LucideIcon = iconMap[name];

  if (!LucideIcon) {
    console.error(`Icon "${name}" not found in icon map`);
    return null;
  }

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={cn(
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
};

// Icon with gradient styling
export const GradientIcon = ({
  name,
  className,
  size = 24,
  strokeWidth = 1.5,
  ...props
}: IconProviderProps) => {
  return (
    <div className="relative inline-block">
      <svg width={size} height={size} className="absolute top-0 left-0">
        <defs>
          <linearGradient id={`icon-gradient-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1F6FEB" />
            <stop offset="100%" stopColor="#00CFFF" />
          </linearGradient>
        </defs>
      </svg>
      <Icon
        name={name}
        className={cn(
          "text-transparent",
          className
        )}
        size={size}
        strokeWidth={strokeWidth}
        style={{
          stroke: `url(#icon-gradient-${name})`,
          ...props.style
        }}
        {...props}
      />
    </div>
  );
};

// Icon with primary color styling
export const PrimaryIcon = ({
  name,
  className,
  size = 24,
  strokeWidth = 1.5,
  ...props
}: IconProviderProps) => {
  return (
    <Icon
      name={name}
      className={cn(
        "text-[#1F6FEB]",
        className
      )}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

// Icon with secondary color styling
export const SecondaryIcon = ({
  name,
  className,
  size = 24,
  strokeWidth = 1.5,
  ...props
}: IconProviderProps) => {
  return (
    <Icon
      name={name}
      className={cn(
        "text-[#00CFFF]",
        className
      )}
      size={size}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};
