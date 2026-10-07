# Life, in Deep Time — Cell to Creature

An educational evolutionary model that starts with a population of simple prokaryote-like cells near an ancient hydrothermal seep. Adjust mineral nutrients, sunlight, temperature, and ultraviolet radiation; then follow cell division, inherited variation, lineage branching, and differential survival over compressed deep time.

Run `npm test` and `npm start`, then open http://localhost:8080. Deep-time controls include 1×, 100×, 10,000×, and 100,000×. The timeline slider seeks anywhere in the first 10 million years and replays recorded environmental changes when you rewind. The simulation processes actual model generations in bounded frame batches; achievable throughput depends on the device. The static site has no runtime npm dependencies. GitHub Actions runs ecology and browser checks, then publishes GitHub Pages.

Live experiment: https://sjefvanleeuwen.github.io/reinforcement-learning/

## What the model represents

- Cells reproduce asexually through binary fission. A daughter copies the genome of one parent; there is no mating or sexual recombination.
- Replication can introduce small mutations in mineral enzymes, motility, light harvesting, adhesion, heat tolerance, UV protection, DNA repair, and cell size.
- Planetary conditions affect cell fitness, survival, and reproductive success. Heritable lineages that reproduce more often can become more common.
- Cell adhesion can keep daughter cells together, allowing colonies to appear; established colonies can gain a simple UV-protection benefit. Milestones are observed when traits emerge; no complex creature or multicellularity outcome is guaranteed.

This is a simplified population model, not a reconstruction of abiogenesis or Earth's actual history. The simulation starts with existing cells and does not model individual molecules, complete biochemistry, eukaryogenesis, or animal development. Each model generation is one simplified division-and-selection cycle. The timeline assigns 250 years to each model generation for playability; this is a display scale, not a literal microbial generation time or a reconstruction of Earth history. Outcomes are illustrative rather than predictions. It does not force evolution toward a goal.
