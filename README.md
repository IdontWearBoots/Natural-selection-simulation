# Natural-selection-simulation
Un petit projet simulant (approximativement) la séléction naturelle darwinienne pour mon cours d'SVT.

## Comment ça marche ?
Vous selectionnez d'abord le nombre de "Boules" qui representera la population de départ (n).
La selection se fait sur l'aptitude des "Boules" d'arriver a l'autre coté du terrain. A la fin de chaque génération les n/2 boules qui sont arrivés les plus près de l'autre coté du terrain sont séléctionnés pour se reproduire, produisant une nouvelle population de n boules.

Chaque boule possede 3 gènes qui agissent sur le mouvement des boules: 
- geneX => leur mouvement horizontal
- geneY => leur mouvement vertical
- geneIntensite => l'intensité de leur mouvement

Plus le geneX est grand, plus leur mouvement horizontal est important, plus la valeur de geneY est grand, plus leur mouvement vertical est important et plus la valeur geneIntensite est grande, plus les mouvements sont marqués. 

Il est possible de spécifier (en pourcentage) la probabilité de mutation d'un géne qui traduit la probabilité qu'un gène mute et change le mouvement de la boule en question. Les mutations peuvent se faire sur n'importe quel gène et peuvent être bénéfique (gèneIntensité qui croit) ou nocif (gèneX négatif) pour la transmission des genes d'un individu. 

## Ce projet n'est pas fini et sera sans doute ajusté
