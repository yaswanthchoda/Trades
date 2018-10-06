from django.shortcuts import render
from django.views import View

# Create your views here.
class Home(View):
	template_name = 'home.html'
	
	def get(self, request):
		return render(request, self.template_name,{})

	def post(self, request):
		pass           
		# yummy , energy, goat, got, health, king, devotional, hyperlink, winkle, Notebook, Rough, rosewater, elephant, touch, growth, Thanks, tough, earthquake, yesterday, tangle, youth, youtube,python, your, rollercoster, running, kingdom, guns, tap, entertainment, legal, network, duckout, third emphire, hexagonal, yelling, torture, cowboy, enter, engagement, elbow, silence, taperecorder, elemenate, tapping, toss, kill, element, tale, hands, train, goal, knight, Taste .....

	 


		# tackle, hygenic, empowerment, 

		# "yummy , energy, goat, got, health, king, devotional, hyperlink, winkle, Notebook, Rough, rosewater, elephant, touch, growth, Thanks, tough, earthquake, yesterday, tangle, youth, youtube,python, your, rollercoster, running, kingdom, guns, tap, entertainment, legal, network, duckout, third emphire, hexagonal, yelling, torture, cowboy, enter, engagement, elbow, silence, taperecorder, elemenate, tapping, toss, kill, element, tale, hands, train, goal, knight, Taste"