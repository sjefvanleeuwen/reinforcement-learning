# Little Worlds — Evolution Garden

A small, cheerful evolution sandbox. Set the plant supply, climate, predator pressure and mutation rate. Start the garden and watch cartoon creatures search for food, grow tired, raise young and pass inherited traits to the next generation.

Run `npm test` and `npm start`, then open http://localhost:8080. Requires Node 24 and Python 3. There are no runtime npm dependencies. GitHub Actions tests the ecology and browser, saves mobile/desktop screenshots and publishes GitHub Pages.

Live game: https://sjefvanleeuwen.github.io/reinforcement-learning/

## Inheritance, selection and limits

Every organism has eight inherited traits: body size, leg count, leg length, walking speed, food senses, energy efficiency, colour and lifespan. When two nearby adults with enough energy mate, a child inherits randomly recombined values from both parents. Each trait has a configurable chance of a small random mutation, bounded to its playable range. The child's generation is one beyond the more recent parent.

Individuals seek food within their inherited sensing distance and otherwise wander. Movement and body traits use energy; plants regrow; the slider changes warmth costs; optional fox pressure adds survival risk. Well-fed adults can reproduce. Those who survive leave more offspring, shifting the trait distribution through the family tree. This is actual individual selection across overlapping generations, not a scripted trend.

The simulation uses a simplified 2D agent model, not a neural network, full animal biomechanics, or a biological forecast. Leg count, leg length, speed, senses, colour, size, efficiency and lifespan influence the rendered phenotype or life history. Save a selected creature’s genome JSON to keep its inherited traits. The population and world currently live in the open browser session; refreshing starts a new seed population. If the species goes extinct, invite eight new pioneers and adjust the habitat.
