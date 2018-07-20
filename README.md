# risk-like

#### work in progress

Game inspired by warlight (warzone) / risk board game.

Backend by Django + DRF, React on frontend.

##### updates:

21.07 - regions centroids must be set manually since some regions
are concave polygons causing the centroid to be out of boundaries.
This led me to stop using d3.js in client and use precalculated both svg
paths and centroids in map.json