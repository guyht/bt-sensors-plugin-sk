# Review: add Govee H5179 advertisement sensor support

**Owner review only. No pull request or upstream issue has been submitted.**

Upstream: https://github.com/naugehyde/bt-sensors-plugin-sk
Base: `b8954404d941e71cb7f5b88327968e1f96caaf12`

## Problem and proposed behavior

Add a driver for the Govee H5179 advertisement format: temperature, humidity and battery strength. Identification must tolerate Device Information preceding the Govee service UUID.

## Scope and decisions

The owner-specific normal-only battery-alert override has been removed from this candidate. Standard battery policy is inherited from the shared base; notification preferences belong in configuration.

## Validation status

The branch was prepared from current upstream source. Patch applicability and
diff whitespace checks are verified during preparation. These are review drafts,
not a claim of passing CI, deployment readiness or completed hardware validation.

## Before upstream submission

- [ ] Add frame/identification tests covering positive/negative temperature, units, missing/short data and nonmatching devices.
- [ ] Verify other Govee models and the shared battery-alert behavior remain intact.
- [ ] Verify on actual H5179 hardware and check supported names/variants before submission.

Keep boat identity, credentials, live data, custom release suffixes and deployment
scripts out of an upstream submission. Publish nothing to the parent until approved.

## Preparation results — 6 November 2026

JavaScript syntax checks passed. Upstream has no package-lock.json, so npm ci cannot run. Decoder/identification tests and hardware validation remain pending. The owner-specific battery-alert override is absent.
