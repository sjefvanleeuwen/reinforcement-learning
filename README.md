# Stride — Spider Learning Lab

An interactive eight-legged spider learning coordinated movement. Shaded body segments, connected tapered legs, eight eyes, pedipalps, ground shadows and joint-activation indicators replace the original humanoid overlay.

## Run

```sh
npm test
npm start
```

Requires Node 24 and Python 3. Open http://localhost:8080. Modules and Web Workers require HTTP. There are no runtime npm dependencies; optional Google Fonts fall back to system fonts.

## Physics and training

Eighteen physical nodes form a horizontal two-node body and eight two-link articulated legs. The simplified planar simulation includes gravity, link constraints, bounded motor forces and foot friction. The renderer separates the legs laterally and adds biological visual detail. Lateral balance and full 3D collisions are not simulated; this is an educational model, not validated arachnid biomechanics.

A 12-parameter rhythmic feedback controller sets eight leg-joint targets and body pitch. Alternating groups of four legs share phase coordination. Cross-entropy method (CEM) samples a population, evaluates six-second physical rollouts, ranks accumulated rewards, fits an elite distribution and retains the champion. This is reward-based evolutionary policy optimization, not PPO or a neural network. No prerecorded locomotion is used.

Reward combines target-speed tracking, capped forward velocity, level body posture, an effort penalty and a collapse penalty. Vertical support at the body is adjustable. The displayed percentage is a support gain, not a calibrated percentage of body weight; it supplies no external forward propulsion. Assisted results do not establish unassisted locomotion or generalization.

Load the trained example to replay an actual measured 50-generation checkpoint (population 40, seed 42, target 1.4 m/s, support gain .8). Reproduce it with `node generate-example.js`. Changing settings resets the search. Export/import preserves a policy, its settings and learning curve for evaluation, not the optimizer's sampling/RNG state. Starting learning after import begins a fresh experiment. Spider checkpoints use format version 2 and environment `spider-v1`; obsolete humanoid policies are rejected.

## GitHub Actions and Pages

The workflow runs physics/policy tests, installs Playwright for browser checks, uploads desktop/mobile screenshots, then deploys the static site from main. Pages source must be GitHub Actions.

Live site: https://sjefvanleeuwen.github.io/reinforcement-learning/

Browser checks cover checkpoint playback, training, pause, export/import, reset, mobile overflow and page errors. Physics checks cover deterministic rollouts, finite state, link lengths, eight contacts, reward improvement, forward displacement, support differences and checkpoint validation.
