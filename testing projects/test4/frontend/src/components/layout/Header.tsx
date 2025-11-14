import { useAuth } from "@/context/AuthContext";
import { Bell, ChevronDown, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Button } from "../common/Button";

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="flex-shrink-0 bg-card border-b border-border">
            <div className="flex items-center justify-end h-16 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            {user?.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                         <Button variant="ghost" size="icon" onClick={logout}>
                            <LogOut className="h-5 w-5 text-destructive" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;