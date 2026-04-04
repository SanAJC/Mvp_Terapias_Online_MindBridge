import logoImg from "@/assets/logo.png";

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <img src={logoImg} alt="MindBridge" className="w-9 h-9 rounded-lg" />
    <span className="font-semibold text-lg text-foreground">MindBridge</span>
  </div>
);
