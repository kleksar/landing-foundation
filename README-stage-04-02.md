# Landing Foundation — контрольная точка 4.2

Commit: 087cf4d811dba0353c6c59099a40ee065c6c6cc2

Конфигурация браузеров и TDD выполнены. Браузерная приёмка НЕ завершена: verify и compatibility завершились exit 1 из-за ограничений среды. Прошли lint, TypeScript, build и 51 тест нижних слоёв; успешных новых проверок страницы нет.

- landing-foundation/ — актуальные исходники. Начните с AGENTS.md и PROJECT.md.
- evidence/browsers/ — фактические логи и диагностическая конфигурация этой сессии.

Исторические абсолютные пути в evidence относятся к прежнему workspace. Временный Chrome override не входит в конфигурацию проекта и не нужен при обычной установленной версии Chrome.

Следующий шаг: установить браузеры в поддерживаемом окружении по docs/testing.md и выполнить обычные bun run verify и bun run test:compat. Подробности блокеров: docs/evaluations/browsers.md.

Это не release template. Клиентские загрузки, зависимости, browser binaries и git history в архив не включены. Отдельный учебный сайт этапа 4.1 находится в архиве предыдущего этапа.
