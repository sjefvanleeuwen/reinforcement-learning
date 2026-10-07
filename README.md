# Stride — Reinforcement Learning Lab

An interactive locomotion experiment inspired by a skeleton learning to run. A procedural anatomical overlay shows a physical torso and two legs in a projected scene. Train, watch measured reward curves, replay controllers, change speed/body-weight support, and import/export JSON policies. Training runs in a browser Web Worker without a service or ML library.

## Run

Requires Node 24 for tests and Python 3 for a local server.

```sh
npm test
npm start
```

Open http://localhost:8080. ES modules and workers require HTTP, so opening index.html as a file will not work. No npm dependencies are needed. Optional Google Fonts fall back to system fonts.

## Physics and learning

The environment is a simplified planar position-based articulated model: gravity, link lengths, ground contact/friction, and bounded torque-like motor forces. Six physical nodes form the pelvis, torso, knees and feet. Anatomical ribs, skull, arms and muscle shapes are visual overlays. It is not Hyfydy, depRL, an anatomical biomechanics model, or a 3D rigid-body engine.

A 12-parameter rhythmic feedback controller sets hip, knee and torso motor targets. Cross-entropy method (CEM) performs reward-based policy search: sample controllers, evaluate six-second physical rollouts, rank by accumulated reward, fit the elite distribution, retain the champion. This is an evolutionary policy optimizer, not PPO, a neural network, or gradient-based RL. The controller observes filtered forward speed and torso tilt; phase coordinates alternating leg motor targets. An untrained controller may fall quickly.

Reward per second is `1.5 * exp(-((speed-target)/max(.6,target))²) + 2 * clamp(speed,-2,target) + .2 * upright + .1 - .002 * accumulated_effort/time`. A fall subtracts 2 and ends the rollout. Effort approximates accumulated absolute motor torque × angular velocity. At 80% support, an explicit vertical pelvis force helps learn movement; no external forward propulsion is added. Support includes vertical height stabilization and weight compensation, so the percentage is a support gain, not a calibrated percentage of body mass. Assisted performance cannot be claimed as unassisted running.

`trained-example.json` is produced by 50 generations with population 40, seed 42, target 1.4 m/s, support gain .8 and 720 steps. Load it for an immediate physical replay. Import is for evaluation; it does not restore the optimizer's distribution/RNG/history. Starting learning after import begins a fresh search. Changing controls resets the experiment. All training results use one deterministic flat-ground environment and do not establish generalization.

## GitHub Pages

The workflow tests on pull requests and main, assembles only public application files, and deploys on main. Repository Settings → Pages must use **GitHub Actions** as the source. Expected URL: https://sjefvanleeuwen.github.io/reinforcement-learning/ (available after successful deployment).

## Checks

Tests cover deterministic rollout, finite physical state, link constraints, reward improvement and forward displacement, assisted/unassisted differences, and import validation. Run the provided checkpoint generation script to reproduce the example.
