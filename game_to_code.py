# yummy , energy, goat, got, health, king, devotional, hyperlink, winkle, Notebook, Rough, rosewater, elephant, touch, growth, Thanks, tough, earthquake, yesterday, tangle, youth, youtube,python, your, rollercoster, running, kingdom, guns, tap, entertainment, legal, network, duckout, third emphire, hexagonal, yelling, torture, cowboy, enter, engagement, elbow, silence, taperecorder, elemenate, tapping, toss, kill, element, tale, hands, train, goal, knight, Taste .....
# tackle, hygenic, empowerment, 

a = "yummy, energy, goat, got, health, king, devotional, hyperlink, winkle, Notebook, Rough, rosewater, elephant, touch, growth, Thanks, tough, earthquake, yesterday, tangle, youth, youtube,python, your, rollercoster, running, kingdom, guns, tap, entertainment, legal, network, duckout, third emphire, hexagonal, yelling, torture, cowboy, enter, engagement, elbow, silence, taperecorder, elemenate, tapping, toss, kill, element, tale, hands, train, goal, knight, Taste"
r = a.split(",")
d = {}
for x in r:
	x = x.strip()
	d.setdefault(x[0],[]).append(x)
	# if x[0] in d:
	# 	d[x[0]].append(x)
	# else:
	# 	d[x[0]] = []
	# 	d[x[0]].append(x)

print d,"-------------"

for k, v in d.items():
	print k,"  ", len(v),"  ", v
