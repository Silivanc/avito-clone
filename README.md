# Тестовое задание для стажёра Frontend-направления (зимняя волна 2025)
Клон Авито с базовыми возможностями по работе с объявлениями. Приложение поддерживает размещение, редактирование и отображение объявлений в трёх различных категориях: недвижимость, авто и услуги.

## Запуск
1. Склонировать репозиторий командой `git clone <ссылка_на_проект>`
#### Запуск сервера
2. Перейти в папку server
3. Установить библиотеки командой `npm install` и запустить сервер командой `npm run start:with-seed` для запуска с готовыми объявлениями или `npm start` для запуска пустого сервера
Сервер будет доступен на http://localhost:3000
#### Запуск frontend-приложения
4. Перейти в папке frontend
5. Установить библиотеки командой `npm install` и запустить приложение командой `npm run dev`
Приложение будет доступно http://localhost:5173

## Технологии
`React`, `TypeScript`, `Redux Toolkit` (хранения общего состояния), `RTK Query` (работа с запросами), `Ant Design`, `Vite`, `CSS Modules`, `React Hook Form` (удобен для работы с формами), `React Router`.

## Описание функционала:
- ✅ Размещение объявлений: форма с несколькими шагами для размещения объявлений  
- ✅ Список объявлений: отображение всех размещённых объявлений  
- ✅ Просмотр объявлений: детальная карточка объявления с возможностью редактирования  
- ✅ Редактирование объявлений: изменение существующих объявлений с предзаполненными данными  
- ✅ Максимальное количество объявлений на странице — 5  
- ✅ После размещения объявление отображается в списке на маршруте `/list`  
- ✅ На странице есть кнопка «Разместить объявление», которая будет вести на форму  
- ✅ Превью объявления в списке показывает фото (или заглушку, если фото нет), название, локацию и категорию объявления (авто, недвижимость или услуга)  
- ✅ Есть кнопка «Открыть», которая ведёт на страницу объявления `/item/:id`  
- ✅ Реализован поиск объявления по названию  
- ✅ Реализована пагинация (допускается как на клиенте, так и на сервере)  
- ✅ Реализована фильтрация по категории объявления
- ✅ При клике на объявление в списке открывается подробная карточка со всем полями
- ✅ Возможность редактирования объявления: переход на `/form` с предзаполненными данными
- ✅ При перезагрузке страницы данные формы должны сохраняться в черновик (Дополнительно)

- ❌ Авторизация: (Дополнительно) авторизация пользователей для размещения и редактирования объявлений
- ❌ Дополнительно: при выборе значения для фильтра по категории появляются дополнительные фильтры по обязательным полям выбранной категории
- ❌ Написание тестов
## Маршрутизация
- `/form` — для размещение и редактирования объявлений  
- `/list` — для отображения списка объявлений  
- `/item/:id` — для просмотра конкретного объявления

Хотел совместить полезное с полезным, использовал некоторые вещи в первый раз для тренировки, поэтому много что сделано без `best practices`
