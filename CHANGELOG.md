# Change Log

All notable changes to the "phobo-vscode" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release

## [0.1.0] - 2021-04-12

### Added

- Debugging support for Phobo.
- Set breakpoints in feature files.
- Inspect variables during debugging of feature files

## [0.2.0] - 2021-04-21

### Added

- Display global variables in debugger
- Support auto completion and hover documentation for actions:
    - HTTP requests
    - Repeat until
    - Match results


## [0.3.0] - 2021-04-28

### Added

- Support auto completion and hover documentation for actions:
    - Repeat for each
    - Cognito GetId
    - Cognito GetOpenIdToken
    - STS AssumeRoleWithWebIdentity
    - Var

## [0.3.1] - 2021-05-03

### Fixed

- View translator command not working
- Display tooltip for actions when hovering for feature files in all subdirectories.

## [0.3.2] - 2021-05-05

### Fixed

- Error hover info not shown for feature files in subdirectories
- Action completion suggestion not shown for feature files in subdirectories