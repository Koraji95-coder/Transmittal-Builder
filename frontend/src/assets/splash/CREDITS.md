# Splash Screen Asset Credits

## Artwork

### forge-anvil.svg
- **Description**: Hand-written SVG depicting a blacksmith anvil with a hammer mid-swing,
  forging a Zeus-style lightning bolt. All paths are native vector (no embedded rasters).
- **Author**: Original work © R3P / ROOT3POWER ENGINEERING
- **License**: Proprietary — all rights reserved.
- **Elements**: `#anvil`, `#hammer`, `#bolt-core`, `#bolt-glow`, `#electric-arc`,
  `.spark-1` – `.spark-10`, `#impact-flash`. Animated entirely via `splash.css` keyframes.

## Sound Effects

### weld-loop.ogg
- **Status**: Not included — add a royalty-free ambient electric weld / crackle loop here.
- **Suggested source**: Freesound.org (search "electric arc loop") — filter by CC0 or CC BY.
- **Target duration**: 2–4 seconds, loopable
- **Volume**: The app plays it at 30% volume.
- When a sound is added, record the source URL, author, and license in this file.

### clank.ogg
- **Status**: Not included — add a royalty-free metallic clank / impact sound here.
- **Suggested source**: Freesound.org (search "metal clank impact") — filter by CC0 or CC BY.
- **Target duration**: < 1 second, single-shot
- **Volume**: The app plays it at 70% volume.
- When a sound is added, record the source URL, author, and license in this file.

## Graceful Degradation

The splash screen works correctly even when sound files are absent or fail to load.
All `audio.play()` calls are wrapped in `try/catch` and errors are silently ignored.
