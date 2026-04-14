
## Предлагаемая структура MVP

### Экран 1: Dashboard месяца

Это главный и первый экран.

Он должен отвечать на вопросы:

* сколько я потратила за месяц
* сколько получила
* куда ушли деньги
* попала ли я в лимиты
* есть ли комментарий/контекст по месяцу

---

## Приоритеты разработки

Я разделю на P0, P1, P2.

---

# P0 — обязательный минимум, без которого dashboard не работает

## 1. Спроектировать модель данных для dashboard

Нужно зафиксировать, откуда фронт берёт данные и в каком виде.

### Сущности:

* `transactions`
* `monthly_budgets`
* `monthly_notes`

### Минимальные поля:

#### transactions

* id
* date
* amount
* type (`income` | `expense`)
* category
* optional subcategory
* optional tags
* comment / description

#### monthly_budgets

* month
* category
* planned_amount

#### monthly_notes

* month
* note_text

---

## 2. Реализовать выбор месяца

На dashboard должна быть навигация по месяцам.

### Требования:

* по умолчанию открывается текущий или последний доступный месяц
* есть кнопка «предыдущий месяц»
* есть кнопка «следующий месяц»
* нельзя перейти вперёд, если данных за следующий месяц нет
* на экране явно отображается выбранный месяц

---

## 3. Реализовать summary блока месяца

Это верхний уровень экрана.

### Показатели:

* total expenses for selected month
* total income for selected month
* difference / net result

Это нужно сделать до графиков, потому что это базовая аналитика месяца.

---

## 4. Реализовать график расходов по категориям

Это главный график экрана.

### Требования:

* только для расходных транзакций выбранного месяца
* категории по вертикали
* значения по горизонтали
* сортировка от большей суммы к меньшей
* одна строка = одна категория
* при hover показывается popup

### Popup должен содержать:

* название категории
* сумма расходов за выбранный месяц по категории
* доля от всех расходов месяца
* желательно: количество транзакций

---

## 5. Реализовать график доходов

Отдельный график справа или отдельным блоком.

### Требования:

* total income за месяц
* breakdown по источникам/категориям доходов
* сортировка от большего к меньшему
* аналогичный hover popup:

  * категория дохода
  * сумма
  * доля от общего дохода

---

## 6. Реализовать таблицу budget vs actual

Это нижний аналитический блок.

### Требования:

* для выбранного месяца подтягивать план по категориям из таблицы budget
* считать фактические траты по тем же категориям
* показывать:

  * category
  * planned
  * actual
  * delta
  * status

### Статусы:

* within budget
* over budget
* optional: close to limit

### Отображение:

* желательно с цветовой индикацией
* сортировка либо по planned, либо по actual, либо по delta — это можно выбрать позже

---

## 7. Реализовать блок заметки месяца

Внизу страницы.

### Требования:

* отображать текст заметки для выбранного месяца
* если заметки нет — показывать пустое состояние

Пока только read-only.

---

# P1 — важные улучшения для usability

## 8. Добавить фильтры на dashboard

Ты уже сказала, что фильтры нужны — я согласен.

Но на MVP их лучше делать ограниченно.

### Рекомендованные фильтры:

* по типу: all / expenses / income
* по категории
* по тегу
* optional: exclude large purchases / include all

Сразу все фильтры не нужны. Самый полезный старт:

* category filter
* tag filter

---

## 9. Продумать empty states и edge cases

Это не декоративная штука, а часть UX.

### Сценарии:

* в месяце нет доходов
* в месяце нет расходов
* нет бюджета на месяц
* нет заметки
* есть категории в факте, но нет в плане
* есть категории в плане, но нет факта

---

## 10. Нормализовать категории для графиков и budget table

Это критично, иначе dashboard будет врать.

Нужно заранее решить:

* расходы агрегируются по category или subcategory?
* например `кафе: напитки` и `кафе: обеды` показывать отдельно или как один верхний раздел?

Для первого MVP я бы рекомендовал:

* dashboard строить по **основным категориям**
* более детальную аналитику оставить на потом

Иначе график быстро станет шумным.

---

# P2 — можно после первого рабочего dashboard

## 11. Добавить drill-down поведение

Например:

* клик по категории на графике
* переход к деталям категории за месяц
* или открытие списка транзакций по этой категории

Пока это необязательно, особенно раз ты смотришь транзакции в таблице.

---

## 12. Добавить сравнительный режим

Например:

* сравнение с прошлым месяцем
* рост/падение по категориям

Это очень полезно, но не для первого релиза.

---

## 13. Добавить дополнительный график временной динамики

Например:

* cumulative expenses by month day
* daily spending trend

Это уже nice-to-have.

---

# Предлагаемый порядок задач для передачи в разработку

Ниже уже в более прикладном виде.

## Этап 1. Data contract

1. Описать источники данных:

   * transactions
   * monthly_budgets
   * monthly_notes
2. Зафиксировать формат месяца
3. Зафиксировать, как агрегируются категории
4. Зафиксировать, как отличать income и expense

## Этап 2. Dashboard skeleton

5. Создать layout dashboard page
6. Добавить month selector with prev/next navigation
7. Вывести summary cards:

   * total expenses
   * total income
   * net

## Этап 3. Charts

8. Реализовать expenses chart:

   * horizontal bar chart
   * sorted descending
   * category labels on Y-axis
   * hover popup
9. Реализовать income chart:

   * same logic for income categories
   * hover popup

## Этап 4. Budget block

10. Реализовать budget vs actual table
11. Добавить status coloring
12. Обработать missing budget / missing actual cases

## Этап 5. Notes block

13. Реализовать monthly note display
14. Добавить empty state for missing note

## Этап 6. Filters

15. Добавить category filter
16. Добавить tag filter
17. Обновить все dashboard widgets с учётом фильтров

## Этап 7. Polish

18. Empty states
19. Loading states
20. Error states
21. Responsive layout
22. Formatting amounts / dates

---

# Готовый список требований в более чистом виде

Вот так это уже можно отдавать в разработку.

## Dashboard page requirements

### Purpose

The dashboard page should show a monthly overview of personal finances.

### Month navigation

* The page displays data for one selected month.
* The user can switch between months using previous/next controls.
* The selected month is clearly visible in the UI.

### Summary section

The dashboard should display:

* total expenses for the selected month
* total income for the selected month
* net result for the selected month

### Expenses chart

* Show expenses aggregated by category for the selected month.
* Use a horizontal bar chart.
* Categories must be placed on the vertical axis.
* Bars must be sorted from largest total amount to smallest.
* On hover over a category bar, show a popup with:

  * category name
  * total expense amount for this month and category
  * percentage of total monthly expenses
  * optional: number of transactions in this category

### Income chart

* Show income aggregated by income category/source for the selected month.
* Use sorting from largest to smallest.
* On hover, show:

  * income category/source
  * total amount
  * percentage of total monthly income

### Budget vs actual block

* Display a table comparing planned monthly budget and actual spending by category.
* Data comes from a separate monthly budget table.
* The table should include:

  * category
  * planned amount
  * actual amount
  * difference
  * status
* Status should visually indicate whether the actual spending is within the planned amount.

### Monthly note block

* Display a text note for the selected month.
* Data comes from a separate monthly notes table.
* If no note exists, show an empty state.

### Filters

The dashboard should support filtering by:

* category
* tag

Filters should update all visualizations and summary values on the page.

### Scope exclusions for current MVP

* No transaction editing
* No transaction creation
* No dedicated transactions page required for the first version
