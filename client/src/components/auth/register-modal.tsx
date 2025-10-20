import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth";
import { User, UserCog, Eye, EyeOff } from "lucide-react";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  onShowLogin: () => void;
}

export default function RegisterModal({ open, onClose, onShowLogin }: RegisterModalProps) {
  const [step, setStep] = useState<"role" | "form">("role");
  const [role, setRole] = useState<"client" | "psychologist">("client");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setStep("role");
    setRole("client");
    setFormData({ email: "", password: "", firstName: "", lastName: "" });
    setShowPassword(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleRoleSelect = (selectedRole: "client" | "psychologist") => {
    setRole(selectedRole);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    try {
      // 1) Регистрируем на бэке (создаётся сессия + cookie)
      const res = await authService.register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role,
      });

      if (!res?.ok) {
        throw new Error(res?.error || "Не удалось зарегистрироваться");
      }

      // 2) На всякий случай подтягиваем /api/auth/me, чтобы фронт знал о пользователе
      try {
        await authService.fetchMe?.(); // безопасно, если в сервисе есть такой метод
      } catch {
        /* no-op: просто продолжаем редирект */
      }

      toast({
        title: "Регистрация успешна",
        description:
          role === "psychologist"
            ? "Аккаунт создан. После проверки документов вы сможете принимать клиентов."
            : "Добро пожаловать в PsychPlatform!",
      });

      // 3) Закрываем модалку и делаем явный редирект.
      // На статике это гарантированно “пересоберёт” состояние приложения.
      handleClose();
      window.location.href = "/?welcome=1";
    } catch (error) {
      toast({
        title: "Ошибка регистрации",
        description:
          error instanceof Error ? error.message : "Попробуйте ещё раз",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? handleClose() : undefined)}>
      <DialogContent className="sm:max-w-md" data-testid="register-modal">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-text-custom">
            Создать аккаунт
          </DialogTitle>
          {/* добавили описание — уберёт предупреждение про describedby */}
          <DialogDescription className="sr-only">
            Регистрация нового пользователя PsychPlatform
          </DialogDescription>
        </DialogHeader>

        {step === "role" ? (
          <div className="space-y-4">
            <p className="text-center text-gray-600 mb-6">
              Выберите тип аккаунта
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect("client")}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-primary-custom hover:bg-blue-50 transition text-left"
                data-testid="role-client"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-custom text-white p-3 rounded-lg">
                    <User className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-custom">Я клиент</p>
                    <p className="text-sm text-gray-600">
                      Ищу психологическую помощь
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleRoleSelect("psychologist")}
                className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-secondary-custom hover:bg-green-50 transition text-left"
                data-testid="role-psychologist"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary-custom text-white p-3 rounded-lg">
                    <UserCog className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-custom">Я психолог</p>
                    <p className="text-sm text-gray-600">
                      Хочу оказывать помощь клиентам
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">Уже есть аккаунт?</p>
              <Button
                variant="ghost"
                onClick={onShowLogin}
                className="text-primary-custom hover:text-primary-custom/90"
                data-testid="link-show-login"
              >
                Войти в систему
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <div
                className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  role === "client"
                    ? "bg-blue-100 text-primary-custom"
                    : "bg-green-100 text-secondary-custom"
                }`}
              >
                {role === "client" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <UserCog className="h-4 w-4" />
                )}
                <span>
                  {role === "client"
                    ? "Регистрация клиента"
                    : "Регистрация психолога"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                  placeholder="Ваше имя"
                  required
                  data-testid="input-firstName"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                  placeholder="Ваша фамилия"
                  required
                  data-testid="input-lastName"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
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
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                  }
                  placeholder="Минимум 6 символов"
                  minLength={6}
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
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("role")}
                className="flex-1"
                disabled={isLoading}
                data-testid="button-back"
              >
                Назад
              </Button>
              <Button
                type="submit"
                className={`flex-1 text-white ${
                  role === "client"
                    ? "bg-primary-custom hover:bg-primary-custom/90"
                    : "bg-secondary-custom hover:bg-secondary-custom/90"
                }`}
                disabled={isLoading}
                data-testid="button-submit-register"
              >
                {isLoading ? "Регистрация..." : "Создать аккаунт"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
