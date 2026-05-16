# Changelog

All notable changes to the StacksDuel SDK will be documented in this file.

## [1.1.0] - 2026-05-16

### Added
- `utils/format.ts`: Added `formatSTX`, `toMicroSTX`, and `formatPercentage`.
- `utils/math.ts`: Added `calculateOdds`, `getDuelPoolTotal`, `calculateROI`, and `calculateWinningShare`.
- `utils/duel.ts`: Added `isDuelExpired`, `canVoteOnDuel`, `getDuelStatusLabel`, and `isDuelWinner`.
- `utils/validation.ts`: Added `validateDuelTitle`, `validateDuelOptions`, and `validatePrediction`.
- `tests/validation.test.ts`: Added unit tests for validation helpers.

### Changed
- Refactored `index.ts` to be a modular entry point.
- Centralized configuration in `config.ts` and types in `types.ts`.
- Integrated `SDK_CONFIG` across all transaction builders.
