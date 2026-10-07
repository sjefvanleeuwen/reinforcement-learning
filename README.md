# Life, in Deep Time — Cell to Creature

An educational evolutionary model that starts with a population of simple prokaryote-like cells near an ancient hydrothermal seep. Adjust mineral nutrients, sunlight, temperature, and ultraviolet radiation; then follow cell division, inherited variation, lineage branching, and differential survival over compressed deep time.

Run `npm test` and `npm start`, then open http://localhost:8080. The static site has no runtime npm dependencies. GitHub Actions runs ecology and browser checks, then publishes GitHub Pages.

Live experiment: https://sjefvanleeuwen.github.io/reinforcement-learning/

## What the model represents

- Cells reproduce asexually through binary fission. A daughter copies the genome of one parent; there is no mating or sexual recombination.
- Replication can introduce small mutations in mineral enzymes, motility, light harvesting, adhesion, heat tolerance, UV protection, DNA repair, and cell size.
- Planetary conditions affect cell fitness, survival, and reproductive success. Heritable lineages that reproduce more often can become more common.
- Cell adhesion can keep daughter cells together, allowing colonies to appear. Milestones are observed when traits emerge; no complex creature or multicellularity outcome is guaranteed.

This is a simplified population model, not a reconstruction of abiogenesis or Earth's actual history. The simulation starts with existing cells, does not model individual molecules or complete biochemistry, and compresses generations and geological time for playability. Its timeline and outcomes are illustrative rather than predictions. It does not force evolution toward a goal.
