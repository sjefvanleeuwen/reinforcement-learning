# Peep! — Robot Rescue

A pastel cartoon game about Pip, a little robot with a big heart. Carry fluffy friends home across three progressively bumpier trails. Practice uses reward-based learning to adapt a controller to the selected trail. Real pickup adds passenger mass; reaching camp earns stars and unlocks another mission. Progress is saved locally, sound is optional and skills can be exported/imported.

Run `npm test` and `npm start`, then open http://localhost:8080. Node 24 and Python 3 are needed locally. No runtime npm dependencies. GitHub Actions runs physics and Playwright game tests, uploads screenshots and deploys Pages.

Live game: https://sjefvanleeuwen.github.io/reinforcement-learning/

## Mechanics and learning

Four articulated legs and a horizontal body use ten physical nodes, gravity, torque-like motors, link constraints and foot contact. Smooth raised rubble changes the contact height. At x=.65, pickup increases body mass. Reach the mission goal within six simulated seconds without collapsing to rescue the passenger. Stars depend on arrival time (three under three seconds, two under five, otherwise one). Repeating a mission only improves its stored best star count.

Cross-entropy method tests populations of 12-parameter rhythmic feedback controllers. Rewards combine speed tracking, forward progress, body stability, pickup and rescue bonuses, effort costs and collapse penalties. A disclosed fixed vertical support gain of .8 helps beginner movement. The cartoon projects a planar simulation: lateral stability and real biomechanics are outside scope. No neural network, remote training or prerecorded gait is used. A measured 50-generation starter checkpoint can complete the first mission; harder courses need adaptation.

`node generate-example.js` reproduces the checkpoint. `npm test` checks deterministic physics, four legs, actual mass change at pickup, first-mission completion, harder-course differences, reward improvement and skill validation. Browser checks cover gameplay, pause, scoring, unlocks, practice, export/import, persistent progress and mobile layout. Imports evaluate a controller on the selected mission; they do not restore the optimizer distribution/RNG. Format v3 rejects obsolete spider/humanoid skills.
