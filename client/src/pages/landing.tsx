import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Shield, Video, Calendar, CreditCard, Users } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-text-custom mb-6">
                Найдите своего <span className="text-primary-custom">психолога</span> онлайн прямо сейчас
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Профессиональная психологическая помощь от квалифицированных специалистов. 
                Безопасно, удобно, конфиденциально.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/search">
                  <Button 
                    className="bg-primary-custom text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-custom/90 transition text-lg"
                    data-testid="button-find-psychologist"
                  >
                    Найти специалиста
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  className="border-2 border-secondary-custom text-secondary-custom px-8 py-4 rounded-xl font-semibold hover:bg-secondary-custom hover:text-white transition text-lg"
                  data-testid="button-become-psychologist"
                >
                  Стать психологом
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://i.1.creatium.io/disk2/dc/03/df/f1fda60e7a23b81de2e128b79da76bc277/102349.jpg"
                alt="Professional therapy session"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-secondary-custom text-white p-3 rounded-full">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-custom">100% Конфиденциально</p>
                    <p className="text-sm text-gray-600">Защищенные сессии</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-custom mb-4">
              Почему выбирают нашу платформу
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы создали безопасную и удобную среду для получения психологической помощи
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-2xl text-center">
              <div className="bg-primary-custom text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Проверенные специалисты</h3>
              <p className="text-gray-600">
                Все психологи проходят тщательную верификацию документов и имеют подтвержденную квалификацию
              </p>
            </div>
            
            <div className="bg-green-50 p-8 rounded-2xl text-center">
              <div className="bg-secondary-custom text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Video className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Онлайн консультации</h3>
              <p className="text-gray-600">
                Видео, аудио или чат - выберите удобный формат для проведения сессий
              </p>
            </div>
            
            <div className="bg-purple-50 p-8 rounded-2xl text-center">
              <div className="bg-accent-custom text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Полная конфиденциальность</h3>
              <p className="text-gray-600">
                Надежная защита данных и соблюдение врачебной тайны
              </p>
            </div>
            
            <div className="bg-yellow-50 p-8 rounded-2xl text-center">
              <div className="bg-yellow-500 text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Гибкое расписание</h3>
              <p className="text-gray-600">
                Записывайтесь на удобное время, включая вечерние часы и выходные
              </p>
            </div>
            
            <div className="bg-pink-50 p-8 rounded-2xl text-center">
              <div className="bg-pink-500 text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Персональный подход</h3>
              <p className="text-gray-600">
                Найдите специалиста по вашим конкретным запросам и потребностям
              </p>
            </div>
            
            <div className="bg-indigo-50 p-8 rounded-2xl text-center">
              <div className="bg-indigo-500 text-white p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CreditCard className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Безопасные платежи</h3>
              <p className="text-gray-600">
                Защищенная система оплаты с возможностью возврата средств
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-custom mb-4">
              Как это работает
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Простой процесс получения психологической помощи
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-custom text-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Найдите специалиста</h3>
              <p className="text-gray-600">
                Используйте фильтры по специализации, цене, рейтингу и доступности для поиска подходящего психолога
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-secondary-custom text-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Запишитесь на сессию</h3>
              <p className="text-gray-600">
                Выберите удобное время в календаре специалиста и оплатите консультацию
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-accent-custom text-white rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-text-custom mb-4">Проведите консультацию</h3>
              <p className="text-gray-600">
                Получите профессиональную помощь через видео, аудио или чат в удобное время
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-custom">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Начните заботиться о своем ментальном здоровье уже сегодня
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединитесь к тысячам людей, которые уже получили помощь через нашу платформу
          </p>
          <Link href="/search">
            <Button 
              className="bg-white text-primary-custom px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition text-lg"
              data-testid="button-get-started"
            >
              Начать сейчас
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-custom text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PsychPlatform</h3>
              <p className="text-gray-300 mb-4">
                Профессиональная психологическая помощь онлайн
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Для клиентов</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition">Найти психолога</a></li>
                <li><a href="#" className="hover:text-white transition">Как это работает</a></li>
                <li><a href="#" className="hover:text-white transition">Цены</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Для психологов</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition">Стать специалистом</a></li>
                <li><a href="#" className="hover:text-white transition">Требования</a></li>
                <li><a href="#" className="hover:text-white transition">Условия работы</a></li>
                <li><a href="#" className="hover:text-white transition">Поддержка</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition">О нас</a></li>
                <li><a href="#" className="hover:text-white transition">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition">Политика конфиденциальности</a></li>
                <li><a href="#" className="hover:text-white transition">Условия использования</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 PsychPlatform. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
