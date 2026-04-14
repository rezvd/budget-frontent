# Budget Frontend

Минималистичный pet project на React для ведения личного бюджета.

## Что осталось в проекте

- Один экран: добавление доходов/расходов
- Локальное хранение в `localStorage`
- Синхронизация с Google Sheets (чтение и попытка записи через Sheets API)

## Что удалено

- Docker и сопутствующая инфраструктура
- Аналитика (Sentry, метрика)
- Автотесты, mock-серверы, e2e
- Авторизация, пользователи, роли
- Проектно-специфичные страницы, виджеты и доменные сущности исходного шаблона

## Запуск

```bash
pnpm install
pnpm dev
```

## Переменные окружения

Создай `.env` по примеру `.env.example`:

```env
VITE_GOOGLE_SHEET_ID=
VITE_GOOGLE_SHEET_RANGE=Sheet1!A:F
VITE_GOOGLE_SHEETS_API_KEY=
```

Колонки в таблице должны быть в таком порядке:

`id, date, type, category, amount, note`

## Важно про запись в Google Sheets

Чтение таблицы через API key обычно работает для доступной таблицы.
Запись (`append`) в Google Sheets API чаще всего требует OAuth-токен пользователя.
Если запись с API key не проходит, это ожидаемо: в таком случае лучше сделать Google Apps Script endpoint и писать через него.
