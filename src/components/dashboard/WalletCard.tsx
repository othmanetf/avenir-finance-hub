
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

type WalletType = {
  id: string;
  name: string;
  icon: LucideIcon;
  amount: number;
  currency: string;
  transactions: number;
  color: string;
  accent: string;
}

type WalletCardProps = {
  wallet: WalletType;
  delay?: number;
}

export function WalletCard({ wallet, delay = 0 }: WalletCardProps) {
  const { name, icon: Icon, amount, currency, transactions, color } = wallet;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={`rounded-3xl border shadow-sm overflow-hidden h-full hover:shadow-md transition-shadow ${amount < 0 ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5' : 'bg-white'}`}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{name}</div>
              <div className={`${color} p-2 rounded-full`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xl font-bold">
                {amount < 0 ? '-' : ''}${Math.abs(amount).toFixed(2)} {currency}
              </div>
              <div className="text-gray-500 text-sm">
                {transactions} transaction{transactions !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
