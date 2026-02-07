# Changelog

All notable changes to the AeonSage project will be documented in this file.

## [Unreleased]

## [2026-02-04]

### Added
- **Heuristic Sentinel (L3 Security Layer)**: implemented content inspection engine to detect malicious patterns in commands and file operations.
  - Detects `rm -rf /`, fork bombs, reverse shells, and other critical threats.
  - Auto-escalates threats to "Critical" risk, overriding standard Safety Gate approvals.
- **Threat Alert UI**: New `<threat-alert>` component in approval dialogs to display detected threats with code snippets and high-visibility warnings.
- **User Manual i18n**: Added support for English and Chinese language switching in the User Manual view.

### Changed
- **Skill Marketplace UI**: Refactored to match the official "Glassmorphism" theme with improved card designs and responsive grid layout.
- **Safety Gate Integration**: `checkOperation` now runs Sentinel scans before consulting gate policies.
- **UI Icons**: Global update to SVG icon styles for consistent outline rendering (`base.css`).

### Fixed
- **Text Corrections**: Changed "Initialize ID" to "Initialize DID" to align with Verifiable Digital Identity terminology.
