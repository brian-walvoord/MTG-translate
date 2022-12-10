from django.shortcuts import render
from django.urls import path
from django.http import HttpResponse
import pip._vendor.requests as requests

# # Create your views here.


def index(request):
    return render(request, 'index.html')

#     # use response.json()["key"] to access specific content
#     return HttpResponse(response)


def randomness(request):
    response = requests.get('https://api.scryfall.com/cards/random')
    return HttpResponse(response, status=200)


def search(request):
    query = request.GET.get("query")
    response = requests.get(f"https://api.scryfall.com/cards/search?q={query}")
    return HttpResponse(response, status=200)


def translate(request):
    set = request.GET.get("set")
    collector = request.GET.get("collector")
    response = requests.get(
        f"https://api.scryfall.com/cards/{set}/{collector}/ja")
    if response.status_code == 200:
        return HttpResponse(response, status=200)
    else:
        return HttpResponse(status=404)
