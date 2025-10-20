import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth";
import { Eye, EyeOff } from "lucide-react";
import { useLocation } from "wouter";   // 👈 добавлено

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onShowRegister: () => void;
}

export default function LoginModal({ open, onClose, onShowRegister }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation(); // 👈 для программной навигации

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // authService.login должен делать fetch('/api/auth/login', { credentials: 'include', ... })
      const user = await authService.login(email, password);

      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в PsychPlatform!",
      });

      // 🔁 закроем модалку и почистим поля
      onClose();
      setEmail("");
      setPassword("");

      // 🚀 Переход в нужный раздел (поставь свой маршрут)
      // пример: админов ведём в /admin, остальных — в /account
      const target = user?.role === "admin" ? "/admin" : "/account";
      setLocation(target);

      // На случай, если состояние приложения инициализируется из /api/auth/me только при загрузке —
      // принудительно перерисуем страницу (можно удалить, если не нужно):
      // window.location.href = target;

    } catch (error) {
      toast({
        title: "Ошибка входа",
        description: error instanceof Error ? error.message : "Проверьте email и пароль",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="login-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-text-custom">
            Вход в систему
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              data-testid="input-email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                required
                data-testid="input-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="toggle-password"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-primary-custom text-white hover:bg-primary-custom/90"
            disabled={isLoading}
            data-testid="button-submit-login"
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">Еще нет аккаунта?</p>
          <Button
            variant="ghost"
            onClick={onShowRegister}
            className="text-primary-custom hover:text-primary-custom/90"
            data-testid="link-show-register"
          >
            Создать аккаунт
          </Button>
        </div>

        <div className="bg-muted-custom p-4 rounded-lg text-sm">
          <p className="font-medium mb-2">Демо-аккаунты:</p>
          <p>Клиент: maria.ivanova@example.com / client123</p>
          <p>Психолог: anna.petrova@psychplatform.com / psychologist123</p>
          <p>Админ: admin@psychplatform.com / admin123</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
