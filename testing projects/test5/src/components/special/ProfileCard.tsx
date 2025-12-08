import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface ProfileCardProps {
  name: string;
  title: string;
  handle: string;
  avatarUrl: string;
}

const ProfileCard = ({ name, title, handle, avatarUrl }: ProfileCardProps) => {
  return (
    <motion.div
      className="bg-card p-6 rounded-lg subtle-shadow text-center"
      whileHover={{ y: -5, scale: 1.02, boxShadow: '0 8px 24px rgba(27, 10, 10, 0.1)' }}
    >
      <img src={avatarUrl} alt={name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
      <h3 className="font-heading text-lg font-bold">{name}</h3>
      <p className="text-primary text-sm font-medium">{title}</p>
      <p className="text-muted-foreground text-xs mt-1">@{handle}</p>
      <Button variant="outline" size="sm" className="mt-4">Contact</Button>
    </motion.div>
  );
};

export default ProfileCard;