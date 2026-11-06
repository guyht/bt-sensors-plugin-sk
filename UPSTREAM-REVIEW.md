# Review proposal: bound work for unconfigured Bluetooth devices

**Owner review only. No pull request or upstream issue has been submitted.**

Upstream: https://github.com/naugehyde/bt-sensors-plugin-sk
Base: `b8954404d941e71cb7f5b88327968e1f96caaf12`

## Problem and proposed behavior

Every unknown address in a busy marina can create repeated D-Bus probing/subscriptions and an ever-growing workload. Compare the local explicit-probing alternative with existing upstream PR #199 before selecting an approach.

## Scope and decisions

The attached local alternative disables automatic probing unless explicitly enabled and slows waitDevice polling. It deliberately omits the scanner-recovery hunk. It is not selected as the final upstream design and should not be submitted as a competing fix without coordination.

## Validation status

The branch was prepared from current upstream source. Patch applicability and
diff whitespace checks are verified during preparation. These are review drafts,
not a claim of passing CI, deployment readiness or completed hardware validation.

## Before upstream submission

- [ ] Review PR #199 delayed discovery, expiry and bounded sensor list against the reported failure.
- [ ] Agree how users discover new sensors without losing the normal setup experience.
- [ ] Test configured-sensor reconnection and bounded D-Bus work with many changing addresses.

## Related upstream work

- https://github.com/naugehyde/bt-sensors-plugin-sk/pull/199

Keep boat identity, credentials, live data, custom release suffixes and deployment
scripts out of an upstream submission. Publish nothing to the parent until approved.
