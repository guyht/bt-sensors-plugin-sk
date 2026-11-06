# Review: recover BLE scanning without the stop/start race

**Owner review only. No pull request or upstream issue has been submitted.**

Upstream: https://github.com/naugehyde/bt-sensors-plugin-sk
Base: `b8954404d941e71cb7f5b88327968e1f96caaf12`

## Problem and proposed behavior

Immediately stopping and starting discovery after a GATT connection can hit a BlueZ transition race and leave advertisement sensors silent. Check discovery, start only when necessary, retry a bounded number of times and reassert discovery during periodic sweeps.

## Scope and decisions

Keep this separate from unconfigured-device performance work. No adapter reset, watchdog, retired sensor or boat configuration is included.

## Validation status

The branch was prepared from current upstream source. Patch applicability and
diff whitespace checks are verified during preparation. These are review drafts,
not a claim of passing CI, deployment readiness or completed hardware validation.

## Before upstream submission

- [ ] Add mocked BlueZ transition tests for already scanning, stopped, InProgress, retry exhaustion and shutdown during recovery.
- [ ] Verify DuplicateData and discovery filters survive recovery.
- [ ] Confirm scanner ownership and coexistence with other clients; collect representative hardware evidence.

Keep boat identity, credentials, live data, custom release suffixes and deployment
scripts out of an upstream submission. Publish nothing to the parent until approved.
